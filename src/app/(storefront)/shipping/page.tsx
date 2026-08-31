import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Truck, Package, MapPin, ShieldCheck, Clock, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Shipping & Delivery Policy | Fittrock Ergonomics LLP',
  description: 'Pan-India free shipping on standing desks. Delivery timelines (3-7 days), courier partners, transit insurance, and packaging safety details.',
};

export default function ShippingPolicyPage() {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <Truck className="w-3.5 h-3.5 text-amber-400" />
            <span>Pan-India Delivery &amp; Transit Insurance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: <span className="text-zinc-200 font-medium">{lastUpdated}</span> • Dispatched from Pune, Maharashtra
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">100% Free Shipping</h3>
            <p className="text-xs text-zinc-400">On all motorized desks &amp; orders over ₹4,999 across India.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <Clock className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-sm">3–5 Days Metro SLA</h3>
            <p className="text-xs text-zinc-400">Express delivery to Mumbai, Pune, Delhi NCR, Bengaluru, Hyderabad, Chennai.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <Package className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-sm">Reinforced Honeycomb Box</h3>
            <p className="text-xs text-zinc-400">Heavy-duty corner protection and anti-scratch foam padding.</p>
          </div>
        </div>

        {/* Policy Content */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono text-sm">01.</span> Delivery Timelines &amp; Coverage
            </h2>
            <p>
              Fittrock delivers to over <strong>19,000+ pin codes</strong> across all states and union territories in India through premium surface express courier partners including <strong>BlueDart, Delhivery, Gati KWE, and Smartr Logistics</strong>.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                <thead className="bg-zinc-900 text-zinc-200">
                  <tr>
                    <th className="p-3 border-b border-zinc-800">Region / Destination</th>
                    <th className="p-3 border-b border-zinc-800">Dispatch Time</th>
                    <th className="p-3 border-b border-zinc-800">Estimated Delivery Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-400">
                  <tr>
                    <td className="p-3 font-medium text-white">Pune &amp; Mumbai Metropolitan (MMR)</td>
                    <td className="p-3">Within 24 Hours</td>
                    <td className="p-3 text-emerald-400 font-semibold">1 – 2 Business Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Tier 1 Metros (Bengaluru, Delhi NCR, Hyderabad, Chennai, Kolkata, Ahmedabad)</td>
                    <td className="p-3">Within 24 Hours</td>
                    <td className="p-3 text-emerald-400">3 – 5 Business Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Tier 2 &amp; Tier 3 Cities (Rest of India)</td>
                    <td className="p-3">Within 24–48 Hours</td>
                    <td className="p-3">5 – 7 Business Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">North-East &amp; Island Territories (J&amp;K, Assam, Andaman)</td>
                    <td className="p-3">Within 48 Hours</td>
                    <td className="p-3">7 – 10 Business Days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono text-sm">02.</span> Shipping Charges
            </h2>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li><strong className="text-zinc-200">Standing Desks &amp; Orders ₹4,999 and above:</strong> 100% FREE Pan-India Shipping. No hidden freight charges at checkout.</li>
              <li><strong className="text-zinc-200">Small Accessories below ₹4,999:</strong> A nominal flat shipping charge of ₹199 applies to cover individual courier dispatch.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono text-sm">03.</span> Live Shipment Tracking
            </h2>
            <p>
              As soon as your desk is scanned out of our Pune facility, you will receive an automated <strong>SMS, WhatsApp, and Email notification</strong> containing the logistics partner name and direct AWB tracking link. You can track real-time transit checkpoints anytime.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono text-sm">04.</span> Heavy Freight Packaging &amp; Unboxing Instructions
            </h2>
            <p>
              Because our dual-motor desk frames and solid engineered wood tabletops weigh between 28 kg and 45 kg, they are packed in two separate reinforced containers (Box 1: Steel Frame &amp; Dual Motors; Box 2: Tabletop &amp; Cable Tray).
            </p>
            <p>
              All shipments carry comprehensive transit insurance. In case you observe major external box puncturing upon delivery, please write <em>&quot;Damaged on Arrival&quot;</em> on the courier POD sheet and take a short photo before accepting.
            </p>
          </section>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span>Related Policies:</span>
          <Link href="/returns" className="text-zinc-200 hover:text-white underline">Return &amp; Exchange</Link>
          <Link href="/refund" className="text-zinc-200 hover:text-white underline">Refund Policy</Link>
          <Link href="/warranty" className="text-zinc-200 hover:text-white underline">Warranty Terms</Link>
          <Link href="/contact" className="text-zinc-200 hover:text-white underline">Contact Dispatch Team</Link>
        </div>
      </div>
    </div>
  );
}
