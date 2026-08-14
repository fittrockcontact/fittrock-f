'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, X, Trash2, Plus, Minus, Tag, ArrowRight, Truck } from 'lucide-react';
import { useCartStore } from '@/store/use-cart-store';
import { formatPrice } from '@/lib/utils';

export function CartDrawer() {
  const {
    items,
    isCartOpen,
    setCartOpen,
    removeItem,
    updateQuantity,
    appliedDiscount,
    applyDiscount,
    removeDiscount,
    getSubtotal,
    getDiscountAmount,
    getShippingAmount,
    getTotal,
  } = useCartStore();

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartOpen) return null;

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const shipping = getShippingAmount();
  const total = getTotal();
  const freeShippingThreshold = 5000;
  const progressToFreeShipping = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');

    if (!couponCode.trim()) return;

    // Standard static fallback or DB coupon verification
    if (couponCode.toUpperCase() === 'WELCOME10') {
      applyDiscount({
        code: 'WELCOME10',
        type: 'percentage',
        value: 10,
        minOrderAmount: 2000,
      });
      setCouponCode('');
    } else if (couponCode.toUpperCase() === 'FITTROCK500') {
      applyDiscount({
        code: 'FITTROCK500',
        type: 'fixed',
        value: 500,
        minOrderAmount: 5000,
      });
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code. Try WELCOME10 or FITTROCK500');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
        <div className="w-screen max-w-full sm:max-w-md bg-white border-l border-zinc-200 text-zinc-900 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-4 sm:p-6 border-b border-zinc-200 flex items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-base sm:text-lg text-zinc-900">
              <ShoppingBag className="w-5 h-5 text-amber-600" />
              <span>Your Cart ({items.reduce((acc, item) => acc + item.quantity, 0)})</span>
            </div>
            <button
              onClick={() => setCartOpen(false)}
              className="p-2 text-zinc-500 hover:text-zinc-900 rounded-lg active:scale-95 transition-transform"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="bg-zinc-50 px-4 sm:px-6 py-3 border-b border-zinc-200 space-y-1.5">
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="flex items-center gap-1.5 text-zinc-700">
                <Truck className="w-4 h-4 text-amber-600" />
                {subtotal >= freeShippingThreshold ? (
                  <span className="text-amber-700 font-bold">🎉 You unlocked FREE Shipping!</span>
                ) : (
                  <span>Add {formatPrice(freeShippingThreshold - subtotal)} more for FREE shipping</span>
                )}
              </span>
            </div>
            <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full transition-all duration-500"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Line Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900">Your cart is empty</h3>
                <p className="text-sm text-zinc-500">Explore our standing desks and ergonomic accessories.</p>
                <button
                  onClick={() => setCartOpen(false)}
                  className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-6 py-3 rounded-xl text-sm inline-block min-h-[44px]"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.variantId}
                  className="bg-zinc-50 border border-zinc-200 rounded-xl p-3.5 sm:p-4 flex gap-3.5 sm:gap-4 items-center"
                >
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg bg-white border border-zinc-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0 space-y-1">
                    <h4 className="font-bold text-xs sm:text-sm text-zinc-900 truncate">{item.productName}</h4>
                    {(item.color || item.size) && (
                      <p className="text-[11px] sm:text-xs text-zinc-500">
                        {item.color} {item.size ? `• ${item.size}` : ''}
                      </p>
                    )}
                    <div className="text-xs sm:text-sm font-bold text-amber-700">{formatPrice(item.price)}</div>

                    {/* Quantity Stepper */}
                    <div className="flex items-center gap-3 pt-1">
                      <div className="flex items-center border border-zinc-200 bg-white rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                          className="p-2 text-zinc-600 hover:text-zinc-900 active:scale-90"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2.5 text-xs font-bold font-mono text-zinc-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                          className="p-2 text-zinc-600 hover:text-zinc-900 active:scale-90"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.variantId)}
                        className="text-zinc-400 hover:text-red-600 p-2 active:scale-90"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Order Calculations */}
          {items.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-zinc-200 bg-white space-y-3.5 sm:space-y-4">
              {/* Promo Code Form */}
              {appliedDiscount ? (
                <div className="bg-amber-50 border border-amber-200 text-amber-800 p-3 rounded-xl flex items-center justify-between text-xs font-semibold">
                  <span className="flex items-center gap-1.5">
                    <Tag className="w-4 h-4" /> Code {appliedDiscount.code} applied!
                  </span>
                  <button onClick={removeDiscount} className="underline hover:text-amber-900">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Discount code (e.g. WELCOME10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="flex-1 bg-zinc-50 border border-zinc-300 rounded-xl px-3 py-2.5 text-xs text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-amber-500 uppercase min-h-[44px]"
                  />
                  <button
                    type="submit"
                    className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold px-4 py-2.5 rounded-xl text-xs min-h-[44px] border border-zinc-200"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && <p className="text-xs text-red-600 font-medium">{couponError}</p>}

              {/* Subtotal, Discount, Shipping, Total */}
              <div className="space-y-2 text-xs text-zinc-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-zinc-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-700">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-zinc-900 border-t border-zinc-200 pt-2">
                  <span>Total</span>
                  <span className="text-amber-700 text-base">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <Link
                href="/checkout"
                onClick={() => setCartOpen(false)}
                className="w-full min-h-[48px] bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold py-3.5 rounded-xl text-sm sm:text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
