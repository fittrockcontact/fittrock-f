import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { apiFetch } from '@/lib/api-client';

export interface CartItem {
  variantId: string;
  productId: string;
  productName: string;
  productSlug: string;
  sku: string;
  color?: string | null;
  size?: string | null;
  price: number;
  imageUrl: string;
  quantity: number;
  stockQuantity: number;
}

export interface AppliedDiscount {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  minOrderAmount: number;
}

interface CartStore {
  items: CartItem[];
  appliedDiscount: AppliedDiscount | null;
  isCartOpen: boolean;
  userEmail: string | null;
  setUserEmail: (email: string | null) => void;
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (discount: AppliedDiscount) => { success: boolean; message: string };
  removeDiscount: () => void;
  setCartOpen: (open: boolean) => void;
  syncWithCloud: (email: string) => Promise<void>;
  pushToCloud: () => Promise<void>;
  clearCloudCart: () => Promise<void>;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingAmount: () => number;
  getTotal: () => number;
}

let syncTimeout: NodeJS.Timeout | null = null;

const debouncedCloudPush = (email: string, items: CartItem[], appliedDiscount: AppliedDiscount | null) => {
  if (!email) return;
  if (syncTimeout) clearTimeout(syncTimeout);
  syncTimeout = setTimeout(async () => {
    try {
      await apiFetch('/api/cart/sync', {
        method: 'POST',
        body: JSON.stringify({
          email,
          items,
          appliedDiscount,
        }),
      });
    } catch (err) {
      console.warn('Background cloud cart sync notice:', err);
    }
  }, 600);
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      appliedDiscount: null,
      isCartOpen: false,
      userEmail: null,

      setUserEmail: (email) => {
        set({ userEmail: email });
        if (email) {
          get().syncWithCloud(email);
        }
      },

      addItem: (newItem) => {
        const qtyToAdd = newItem.quantity || 1;
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.variantId === newItem.variantId
          );

          let updatedItems: CartItem[];
          if (existingIndex > -1) {
            updatedItems = [...state.items];
            const currentItem = updatedItems[existingIndex];
            const newQty = Math.min(
              currentItem.quantity + qtyToAdd,
              currentItem.stockQuantity
            );
            updatedItems[existingIndex] = { ...currentItem, quantity: newQty };
          } else {
            updatedItems = [
              ...state.items,
              { ...newItem, quantity: Math.min(qtyToAdd, newItem.stockQuantity) },
            ];
          }

          if (state.userEmail) {
            debouncedCloudPush(state.userEmail, updatedItems, state.appliedDiscount);
          }

          return { items: updatedItems, isCartOpen: true };
        });
      },

      removeItem: (variantId) => {
        set((state) => {
          const updatedItems = state.items.filter((i) => i.variantId !== variantId);
          if (state.userEmail) {
            debouncedCloudPush(state.userEmail, updatedItems, state.appliedDiscount);
          }
          return { items: updatedItems };
        });
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set((state) => {
          const updatedItems = state.items.map((item) =>
            item.variantId === variantId
              ? {
                  ...item,
                  quantity: Math.min(quantity, item.stockQuantity),
                }
              : item
          );
          if (state.userEmail) {
            debouncedCloudPush(state.userEmail, updatedItems, state.appliedDiscount);
          }
          return { items: updatedItems };
        });
      },

      clearCart: () => {
        const state = get();
        if (state.userEmail) {
          get().clearCloudCart();
        }
        set({ items: [], appliedDiscount: null });
      },

      applyDiscount: (discount) => {
        const subtotal = get().getSubtotal();
        if (subtotal < discount.minOrderAmount) {
          return {
            success: false,
            message: `Minimum order amount for code ${discount.code} is ₹${discount.minOrderAmount}`,
          };
        }
        set((state) => {
          if (state.userEmail) {
            debouncedCloudPush(state.userEmail, state.items, discount);
          }
          return { appliedDiscount: discount };
        });
        return { success: true, message: `Coupon code ${discount.code} applied!` };
      },

      removeDiscount: () => {
        set((state) => {
          if (state.userEmail) {
            debouncedCloudPush(state.userEmail, state.items, null);
          }
          return { appliedDiscount: null };
        });
      },

      setCartOpen: (open) => {
        set({ isCartOpen: open });
      },

      syncWithCloud: async (email: string) => {
        if (!email) return;
        try {
          const res = await apiFetch<{ items: CartItem[]; appliedDiscount: AppliedDiscount | null }>(
            `/api/cart?email=${encodeURIComponent(email)}`
          );

          const localItems = get().items;
          const cloudItems = res?.items || [];
          const cloudDiscount = res?.appliedDiscount || null;

          // Merge local items with cloud items
          const mergedMap = new Map<string, CartItem>();

          // Add cloud items first
          for (const item of cloudItems) {
            mergedMap.set(item.variantId, item);
          }

          // Merge or append local items
          for (const localItem of localItems) {
            if (mergedMap.has(localItem.variantId)) {
              const existing = mergedMap.get(localItem.variantId)!;
              mergedMap.set(localItem.variantId, {
                ...existing,
                quantity: Math.max(existing.quantity, localItem.quantity),
              });
            } else {
              mergedMap.set(localItem.variantId, localItem);
            }
          }

          const mergedItems = Array.from(mergedMap.values());
          const finalDiscount = get().appliedDiscount || cloudDiscount;

          set({
            items: mergedItems,
            appliedDiscount: finalDiscount,
            userEmail: email,
          });

          // Sync back the merged cart to the database
          if (mergedItems.length > 0) {
            await apiFetch('/api/cart/sync', {
              method: 'POST',
              body: JSON.stringify({
                email,
                items: mergedItems,
                appliedDiscount: finalDiscount,
              }),
            });
          }
        } catch (err) {
          console.warn('Failed to sync cloud cart:', err);
        }
      },

      pushToCloud: async () => {
        const state = get();
        if (!state.userEmail) return;
        try {
          await apiFetch('/api/cart/sync', {
            method: 'POST',
            body: JSON.stringify({
              email: state.userEmail,
              items: state.items,
              appliedDiscount: state.appliedDiscount,
            }),
          });
        } catch (err) {
          console.warn('Manual push to cloud cart failed:', err);
        }
      },

      clearCloudCart: async () => {
        const state = get();
        if (!state.userEmail) return;
        try {
          await apiFetch(`/api/cart?email=${encodeURIComponent(state.userEmail)}`, {
            method: 'DELETE',
          });
        } catch (err) {
          console.warn('Clear cloud cart failed:', err);
        }
      },

      getSubtotal: () => {
        return get().items.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },

      getDiscountAmount: () => {
        const { appliedDiscount } = get();
        const subtotal = get().getSubtotal();

        if (!appliedDiscount || subtotal < appliedDiscount.minOrderAmount) {
          return 0;
        }

        if (appliedDiscount.type === 'percentage') {
          return (subtotal * appliedDiscount.value) / 100;
        }
        return Math.min(appliedDiscount.value, subtotal);
      },

      getShippingAmount: () => {
        const subtotal = get().getSubtotal();
        if (subtotal === 0 || subtotal >= 5000) {
          return 0; // Free shipping over ₹5,000
        }
        return 299; // Flat rate shipping ₹299
      },

      getTotal: () => {
        const subtotal = get().getSubtotal();
        const discount = get().getDiscountAmount();
        const shipping = get().getShippingAmount();
        return Math.max(0, subtotal - discount + shipping);
      },
    }),
    {
      name: 'fittrock-cart-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        appliedDiscount: state.appliedDiscount,
      }),
    }
  )
);
