import React from 'react';

export default function RefundPolicyPage() {
  return (
    <div className="py-16 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-extrabold border-b border-zinc-200 pb-4 text-zinc-900">30-Day Refund & Return Policy</h1>
        <div className="text-zinc-700 text-sm space-y-4 leading-relaxed">
          <p>
            We are confident you will love your Fittrock ergonomic setup. If you are not satisfied within 30 days of delivery, you are eligible for a return or replacement.
          </p>
          <h3 className="text-lg font-bold text-zinc-900">Return Eligibility</h3>
          <p>
            Items must be in original condition with all included assembly hardware and original box packaging. Refunds are processed back to the original Razorpay payment method within 5-7 business days.
          </p>
        </div>
      </div>
    </div>
  );
}
