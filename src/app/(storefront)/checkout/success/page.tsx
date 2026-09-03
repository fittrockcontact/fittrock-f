import React from 'react';
import Link from 'next/link';
import {
  CheckCircle2,
  ArrowRight,
  Package,
  Truck,
  ShieldCheck,
  Download,
  FileText,
} from 'lucide-react';

interface Props {
  searchParams: Promise<{ order_id?: string; payment_id?: string }>;
}

export default async function CheckoutSuccessPage({ searchParams }: Props) {
  const { order_id, payment_id } = await searchParams;

  const invoiceDownloadUrl = order_id
    ? `/api/checkout/orders/${order_id}/invoice`
    : null;

  return (
    <div className="py-20 bg-white text-zinc-900 min-h-screen flex items-center justify-center px-4">
      <div className="max-w-lg w-full mx-auto bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-xl">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-9 h-9 sm:w-10 sm:h-10" />
        </div>

        <div className="space-y-1.5">
          <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 tracking-tight">
            Order Confirmed!
          </h1>
          <p className="text-zinc-600 text-xs sm:text-sm">
            Thank you for choosing Fittrock Ergonomics. Your payment has been verified and your desk is being prepped for dispatch.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white border border-zinc-200/80 rounded-2xl p-4 text-xs font-mono text-left space-y-2 text-zinc-600 shadow-sm">
          <div className="flex justify-between items-center border-b border-zinc-100 pb-1.5">
            <span>Order Reference:</span>
            <span className="text-zinc-950 font-bold font-mono">
              {order_id ? `#${order_id}` : 'FT-CONFIRMED'}
            </span>
          </div>
          {payment_id && (
            <div className="flex justify-between items-center border-b border-zinc-100 pb-1.5">
              <span>Razorpay Reference:</span>
              <span className="text-zinc-900 font-bold">{payment_id}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span>Payment Status:</span>
            <span className="text-emerald-700 font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span>Paid &amp; Captured</span>
            </span>
          </div>
        </div>

        {/* Invoice Download Action Banner */}
        {invoiceDownloadUrl && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 text-left space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center shrink-0 mt-0.5">
                <FileText className="w-4 h-4" />
              </div>
              <div className="space-y-0.5 flex-1">
                <h3 className="text-xs font-bold text-zinc-900">
                  Official GST Tax Invoice Generated
                </h3>
                <p className="text-[11px] text-zinc-500">
                  Includes full HSN breakdown, 18% GST tax computation, and 5-year warranty certificate.
                </p>
              </div>
            </div>

            <a
              href={invoiceDownloadUrl}
              download
              className="w-full bg-zinc-900 hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-xs inline-flex items-center justify-center gap-2 transition-all shadow-sm active:scale-98"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download Tax Invoice (PDF)</span>
            </a>
          </div>
        )}

        <div className="border-t border-zinc-200 pt-4 text-xs text-zinc-600 space-y-2">
          <div className="flex items-center gap-2 justify-center text-zinc-700 font-medium">
            <Truck className="w-4 h-4 text-amber-600" />
            <span>Estimated Delivery: 3-5 Business Days (Pune Hub)</span>
          </div>
          <p className="text-[11px] text-zinc-500">
            A confirmation email with your tax invoice PDF attached has also been dispatched to your inbox.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row gap-3">
          <Link
            href="/account"
            className="flex-1 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 font-bold py-3 rounded-xl text-xs inline-flex items-center justify-center gap-2 transition-all"
          >
            <span>View in Account</span>
          </Link>

          <Link
            href="/"
            className="flex-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold py-3 rounded-xl text-xs inline-flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Return to Store</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
