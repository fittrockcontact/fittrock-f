import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="py-16 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-extrabold border-b border-zinc-200 pb-4 text-zinc-900">Privacy Policy</h1>
        <div className="text-zinc-700 text-sm space-y-4 leading-relaxed">
          <p>
            Your privacy is important to us. We collect customer information strictly for order fulfillment, shipment tracking, and customer service.
          </p>
          <p>
            We do not store complete credit card or banking numbers. All financial transactions are securely processed via Razorpay.
          </p>
        </div>
      </div>
    </div>
  );
}
