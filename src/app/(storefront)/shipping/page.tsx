import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <div className="py-16 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-3xl font-extrabold border-b border-zinc-200 pb-4 text-zinc-900">Shipping & Delivery Policy</h1>
        <div className="text-zinc-700 text-sm space-y-4 leading-relaxed">
          <p>
            At Fittrock Ergonomics, we strive to deliver your motorized standing desks and accessories swiftly and safely across India.
          </p>
          <h3 className="text-lg font-bold text-zinc-900">1. Delivery Timelines</h3>
          <p>
            All standard orders above ₹5,000 qualify for FREE Express Shipping. Orders are processed within 24 hours and delivered in 3 to 5 business days for major metro cities.
          </p>
          <h3 className="text-lg font-bold text-zinc-900">2. Packaging Safety</h3>
          <p>
            Desks are packed in heavy-duty double-wall honeycomb cardboard containers with corner corner protectors to prevent transit damage to desktop surfaces.
          </p>
        </div>
      </div>
    </div>
  );
}
