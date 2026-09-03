'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/use-cart-store';
import { formatPrice } from '@/lib/utils';
import { ShieldCheck, Lock, CreditCard, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

declare global {
  interface Window {
    Razorpay: any;
  }
}

import { getApiUrl } from '@/lib/api-client';

export default function CheckoutPage() {

  const router = useRouter();
  const {
    items,
    appliedDiscount,
    getSubtotal,
    getDiscountAmount,
    getShippingAmount,
    getTotal,
    clearCart,
  } = useCartStore();

  const subtotal = getSubtotal();
  const discountAmount = getDiscountAmount();
  const shipping = getShippingAmount();
  const total = getTotal();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Load Razorpay Script dynamically
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRazorpayPayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone || !formData.line1 || !formData.city || !formData.state || !formData.pincode) {
      setErrorMessage('Please fill in all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Call backend API (api.fittrock.com) to create DB order & Razorpay order
      const res = await fetch(getApiUrl('/api/checkout/create-order'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map((i) => ({ variantId: i.variantId, quantity: i.quantity })),
          customer: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
          },
          shippingAddress: {
            line1: formData.line1,
            line2: formData.line2,
            city: formData.city,
            state: formData.state,
            pincode: formData.pincode,
            phone: formData.phone,
          },
          discountCode: appliedDiscount?.code,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create Razorpay order');
      }

      const { orderId, amount, currency, dbOrderId, orderNumber } = data;

      // 2. Open Razorpay Modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || 'rzp_test_placeholder',
        amount: amount,
        currency: currency,
        name: 'Fittrock Ergonomics',
        description: `Order ${orderNumber || dbOrderId.slice(0, 8)}`,
        image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=300&q=80',
        order_id: orderId,
        handler: async function (response: any) {
          setIsSubmitting(true);
          try {
            toast.loading('Verifying payment...', { id: 'payment-verify' });

            const verifyRes = await fetch(getApiUrl('/api/checkout/verify-payment'), {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                orderId: dbOrderId,
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyRes.json();

            if (!verifyRes.ok) {
              throw new Error(verifyData.error || 'Payment verification failed');
            }

            toast.success('Payment verified! Order confirmed.', { id: 'payment-verify' });
            clearCart();
            const confirmedOrderNumber = verifyData.orderNumber || orderNumber || dbOrderId;
            router.push(`/checkout/success?order_id=${confirmedOrderNumber}&payment_id=${response.razorpay_payment_id}`);
          } catch (verifyErr: any) {
            console.error('Payment verification failed:', verifyErr);
            toast.error(verifyErr.message || 'Payment verification failed', { id: 'payment-verify' });
            setErrorMessage(
              `Payment received (${response.razorpay_payment_id}), but verification was delayed. Please contact team@fittrock.com with your Payment ID.`
            );
          } finally {
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#f59e0b', // Amber theme
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        toast.error('Razorpay SDK failed to load. Please check your internet connection.');
      }
    } catch (err: unknown) {
      console.error('Payment checkout error:', err);
      const msg = err instanceof Error ? err.message : 'Checkout failed';
      setErrorMessage(msg);
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="py-24 bg-white text-zinc-900 min-h-screen flex items-center justify-center">
        <div className="max-w-md mx-auto text-center space-y-4 px-4">
          <h2 className="text-2xl font-bold text-zinc-900">No items to checkout</h2>
          <p className="text-zinc-600 text-sm">Please add products to your cart before proceeding to checkout.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-zinc-200">
          <h1 className="text-3xl font-black text-zinc-900">Express Checkout</h1>
          <div className="flex items-center gap-2 text-xs font-semibold text-zinc-600">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>256-Bit SSL Encrypted & Razorpay Verified</span>
          </div>
        </div>

        {errorMessage && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl mb-8 flex items-center gap-3 text-sm">
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleRazorpayPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Shipping Form */}
          <div className="lg:col-span-7 space-y-8">
            {/* Customer Info */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-200 pb-3">
                1. Customer Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                    Phone Number (for SMS Tracking) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-4 shadow-sm">
              <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-200 pb-3">
                2. Shipping Address
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                    Flat / House No. / Building / Street *
                  </label>
                  <input
                    type="text"
                    name="line1"
                    required
                    value={formData.line1}
                    onChange={handleChange}
                    placeholder="Flat 402, Highrise Heights, M.G. Road"
                    className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                    Landmark / Area (Optional)
                  </label>
                  <input
                    type="text"
                    name="line2"
                    value={formData.line2}
                    onChange={handleChange}
                    placeholder="Near Central Park"
                    className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      placeholder="Bengaluru"
                      className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleChange}
                      placeholder="Karnataka"
                      className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-600 block mb-1">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder="560001"
                      className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-amber-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary & Razorpay Trigger */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-6 space-y-6 sticky top-24 shadow-sm">
              <h2 className="text-lg font-bold text-zinc-900 border-b border-zinc-200 pb-3">
                Order Review ({items.length} items)
              </h2>

              {/* Items List */}
              <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                {items.map((item) => (
                  <div key={item.variantId} className="flex items-center gap-3 text-xs">
                    <img
                      src={item.imageUrl}
                      alt=""
                      className="w-12 h-12 rounded-lg object-cover bg-white border border-zinc-200 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-zinc-900 truncate">{item.productName}</div>
                      <div className="text-zinc-500">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-mono font-bold text-zinc-900">{formatPrice(item.price * item.quantity)}</div>
                  </div>
                ))}
              </div>

              {/* Breakdown */}
              <div className="space-y-2 text-xs text-zinc-600 border-t border-zinc-200 pt-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-zinc-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-amber-700">
                    <span>Discount ({appliedDiscount?.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Express Shipping</span>
                  <span className="font-bold text-zinc-900">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-zinc-900 border-t border-zinc-200 pt-3">
                  <span>Payable Total</span>
                  <span className="text-amber-700 text-xl font-mono">{formatPrice(total)}</span>
                </div>
              </div>

              {/* Razorpay Action Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-zinc-950 font-extrabold py-4 rounded-xl text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20"
              >
                <CreditCard className="w-5 h-5" />
                <span>{isSubmitting ? 'Securing Razorpay Order...' : `Pay ${formatPrice(total)} with Razorpay`}</span>
              </button>

              <div className="text-center text-xs text-zinc-500">
                Supports UPI, GPay, Credit/Debit Cards, NetBanking & EMI
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
