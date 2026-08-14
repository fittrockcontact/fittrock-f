'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingBag, Trash2, Plus, Minus, Tag, ArrowRight, Truck, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/use-cart-store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const {
    items,
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

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const shipping = getShippingAmount();
  const total = getTotal();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponCode.trim()) return;

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

  if (items.length === 0) {
    return (
      <div className="py-24 bg-white text-zinc-900 min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full mx-auto text-center space-y-6 px-4">
          <div className="w-20 h-20 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center mx-auto text-zinc-400">
            <ShoppingBag className="w-10 h-10 text-amber-600" />
          </div>
          <h1 className="text-2xl font-black text-zinc-900">Your Shopping Cart is Empty</h1>
          <p className="text-zinc-600 text-sm">
            It looks like you haven&apos;t added any ergonomic desks or accessories yet.
          </p>
          <Link
            href="/collections/standing-desks"
            className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md"
          >
            <span>Explore Standing Desks</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black mb-8 text-zinc-900">Shopping Cart ({items.length} items)</h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Cart Table / Items List */}
          <div className="lg:col-span-8 space-y-4">
            {items.map((item) => (
              <div
                key={item.variantId}
                className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 items-center justify-between shadow-sm"
              >
                <div className="flex gap-4 items-center min-w-0 w-full sm:w-auto">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="w-24 h-24 object-cover rounded-xl bg-white border border-zinc-200 shrink-0"
                  />
                  <div className="space-y-1">
                    <h3 className="font-bold text-base text-zinc-900">{item.productName}</h3>
                    {(item.color || item.size) && (
                      <p className="text-xs text-zinc-500">
                        {item.color} {item.size ? `• ${item.size}` : ''}
                      </p>
                    )}
                    <div className="text-xs text-zinc-400 font-mono">SKU: {item.sku}</div>
                    <div className="text-amber-700 font-extrabold text-base pt-1">
                      {formatPrice(item.price)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Stepper */}
                  <div className="flex items-center border border-zinc-200 bg-white rounded-xl px-2">
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity - 1)}
                      className="p-2 text-zinc-600 hover:text-zinc-900"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-mono font-bold text-sm text-zinc-900">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.variantId, item.quantity + 1)}
                      className="p-2 text-zinc-600 hover:text-zinc-900"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="font-mono font-black text-lg text-zinc-900 min-w-24 text-right">
                    {formatPrice(item.price * item.quantity)}
                  </div>

                  <button
                    onClick={() => removeItem(item.variantId)}
                    className="p-2 text-zinc-400 hover:text-red-600 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-6 sticky top-24 shadow-sm">
              <h2 className="text-xl font-bold border-b border-zinc-200 pb-4 text-zinc-900">Order Summary</h2>

              {/* Coupon Form */}
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
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (WELCOME10)"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-white border border-zinc-300 rounded-xl px-3 py-2.5 text-xs text-zinc-900 uppercase"
                    />
                    <button
                      type="submit"
                      className="bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold px-4 py-2.5 rounded-xl text-xs border border-zinc-200"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p className="text-xs text-red-600">{couponError}</p>}
                </form>
              )}

              {/* Price Breakdown */}
              <div className="space-y-3 text-sm text-zinc-600 border-b border-zinc-200 pb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-700">
                    <span>Discount Code</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-zinc-900">
                    {shipping === 0 ? 'FREE' : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-black text-zinc-900 pt-2 border-t border-zinc-200">
                  <span>Total Amount</span>
                  <span className="text-amber-700 text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold py-4 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
