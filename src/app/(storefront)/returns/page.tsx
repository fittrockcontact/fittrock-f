import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeftRight, PackageCheck, Truck, ShieldAlert, CheckCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Return & Exchange Policy | Fittrock Ergonomics LLP',
  description: 'Understand the return, replacement, and exchange process for Fittrock motorized standing desks, frames, and ergonomic accessories.',
};

export default function ReturnsPage() {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <ArrowLeftRight className="w-3.5 h-3.5 text-indigo-400" />
            <span>Hassle-Free Returns &amp; Instant Replacements</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Return &amp; Exchange Policy
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: <span className="text-zinc-200 font-medium">{lastUpdated}</span> • Consumer Protection (E-Commerce) Rules, 2020
          </p>
        </div>

        {/* Highlight Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center text-xs">1</div>
            <h3 className="font-bold text-white text-sm">Initiate Request</h3>
            <p className="text-xs text-zinc-400">WhatsApp our Pune support team with photos or videos of the issue.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center text-xs">2</div>
            <h3 className="font-bold text-white text-sm">Doorstep Reverse Pickup</h3>
            <p className="text-xs text-zinc-400">Our logistics partner collects the packaged product from your address.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-2">
            <div className="w-7 h-7 rounded-lg bg-indigo-950 text-indigo-400 font-bold flex items-center justify-center text-xs">3</div>
            <h3 className="font-bold text-white text-sm">Fast Exchange / Refund</h3>
            <p className="text-xs text-zinc-400">Replacement dispatched within 48 hours or refund processed to bank.</p>
          </div>
        </div>

        {/* Policy Content */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-sm">01.</span> Transit Damage &amp; Defective Items Exchange
            </h2>
            <p>
              We pack all standing desks with reinforced honeycomb cardboard and corner guards. However, in the rare event that your shipment arrives with outer box damage or internal surface scratches:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li><strong className="text-zinc-200">7-Day Transit Damage Reporting:</strong> Please take a photo/unboxing video of the affected part (e.g., tabletop corner or motor casing) and send it to <a href="https://wa.me/918605591550" className="text-indigo-400 hover:underline">+91 86055 91550</a> within 7 days of delivery.</li>
              <li><strong className="text-zinc-200">Zero-Cost Express Part Replacement:</strong> You do not need to pack up the entire 35kg desk! We will instantly air-ship the specific replacement component (e.g. a brand new tabletop, keypad, or leg motor) free of charge within 24–48 hours.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-sm">02.</span> Size, Finish, or Model Exchanges
            </h2>
            <p>
              Ordered a 1200x600mm tabletop but realized your room fits a 1600x750mm? Wanted Frosty White instead of Dark Maple?
            </p>
            <p>
              We offer size and color exchanges within <strong>14 days of delivery</strong>. The customer pays only the price differential between the models, plus a subsidized courier exchange fee (₹500–₹1,200 depending on tabletop size).
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-sm">03.</span> Condition Requirements for Returns
            </h2>
            <p>To ensure eligibility for a full return under our 30-Day Trial Guarantee:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>Product must be in good working condition without severe gouges, intentional wood breakage, or customer drill damage.</li>
              <li>All original accessories (Allen keys, cable clips, power adapter, controller keypad) must be packed into the box.</li>
              <li>Please retain the original packaging boxes for the duration of the 30-day trial period.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-indigo-400 font-mono text-sm">04.</span> Reverse Pickup Process
            </h2>
            <p>
              Once your exchange or return is logged, our logistics partners (Delhivery / BlueDart Surface) will attempt pickup within <strong>2 to 4 business days</strong>. Please keep the packaged boxes ready near your entrance. The pickup agent will scan and issue a physical or digital consignment receipt.
            </p>
          </section>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span>Related Policies:</span>
          <Link href="/refund" className="text-zinc-200 hover:text-white underline">Refund Policy</Link>
          <Link href="/shipping" className="text-zinc-200 hover:text-white underline">Shipping Policy</Link>
          <Link href="/warranty" className="text-zinc-200 hover:text-white underline">Warranty Policy</Link>
          <Link href="/contact" className="text-zinc-200 hover:text-white underline">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
