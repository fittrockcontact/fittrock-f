import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
  addItem: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  applyDiscount: (discount: AppliedDiscount) => { success: boolean; message: string };
  removeDiscount: () => void;
  setCartOpen: (open: boolean) => void;
  getSubtotal: () => number;
  getDiscountAmount: () => number;
  getShippingAmount: () => number;
  getTotal: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      appliedDiscount: null,
      isCartOpen: false,

      addItem: (newItem) => {
        const qtyToAdd = newItem.quantity || 1;
        set((state) => {
          const existingIndex = state.items.findIndex(
            (i) => i.variantId === newItem.variantId
          );

          if (existingIndex > -1) {
            const updatedItems = [...state.items];
            const currentItem = updatedItems[existingIndex];
            const newQty = Math.min(
              currentItem.quantity + qtyToAdd,
              currentItem.stockQuantity
            );
            updatedItems[existingIndex] = { ...currentItem, quantity: newQty };
            return { items: updatedItems, isCartOpen: true };
          }

          return {
            items: [
              ...state.items,
              { ...newItem, quantity: Math.min(qtyToAdd, newItem.stockQuantity) },
            ],
            isCartOpen: true,
          };
        });
      },

      removeItem: (variantId) => {
        set((state) => ({
          items: state.items.filter((i) => i.variantId !== variantId),
        }));
      },

      updateQuantity: (variantId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(variantId);
          return;
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.variantId === variantId
              ? {
                  ...item,
                  quantity: Math.min(quantity, item.stockQuantity),
                }
              : item
          ),
        }));
      },

      clearCart: () => {
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
        set({ appliedDiscount: discount });
        return { success: true, message: `Coupon code ${discount.code} applied!` };
      },

      removeDiscount: () => {
        set({ appliedDiscount: null });
      },

      setCartOpen: (open) => {
        set({ isCartOpen: open });
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
