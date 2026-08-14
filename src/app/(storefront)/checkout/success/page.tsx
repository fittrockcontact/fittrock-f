import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Package, Truck, ShieldCheck } from 'lucide-react';

interface Props {
  searchParams: Promise<{ order_id?: string; payment_id?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order_id, payment_id } = await searchParams;

  return (
    <div className="py-24 bg-white text-zinc-900 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-zinc-50 border border-zinc-200 rounded-3xl p-8 text-center space-y-6 shadow-xl">
        <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-black text-zinc-900">Order Confirmed!</h1>
          <p className="text-zinc-600 text-sm">
            Thank you for purchasing Fittrock ergonomics. Your payment has been authorized successfully.
          </p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-2xl p-4 text-xs font-mono text-left space-y-1.5 text-zinc-600">
          <div>Order ID: <span className="text-amber-700 font-bold">{order_id ? `#${order_id.slice(0, 8)}` : 'FT-CONFIRMED'}</span></div>
          {payment_id && <div>Payment Reference: <span className="text-zinc-900">{payment_id}</span></div>}
          <div>Status: <span className="text-emerald-700 font-bold">Payment Verified</span></div>
        </div>

        <div className="border-t border-zinc-200 pt-4 text-xs text-zinc-600 space-y-2">
          <div className="flex items-center gap-2 justify-center">
            <Truck className="w-4 h-4 text-amber-600" />
            <span>Estimated Delivery: 3-5 Business Days</span>
          </div>
          <p>An order confirmation email has been dispatched to your email address.</p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold py-3.5 rounded-xl text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Return to Storefront</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
