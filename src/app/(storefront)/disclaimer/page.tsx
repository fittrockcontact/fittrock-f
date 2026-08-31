import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { AlertCircle, ShieldAlert, HeartPulse, Scale, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disclaimer & Health Notice | Fittrock Ergonomics LLP',
  description: 'Legal disclaimer regarding ergonomic health claims, weight load ratings, posture advice, and external link representations on Fittrock.',
};

export default function DisclaimerPage() {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            <span>Product Claims &amp; Health Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Disclaimer &amp; Usage Notice
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: <span className="text-zinc-200 font-medium">{lastUpdated}</span> • FITTROCK ERGONOMICS LLP
          </p>
        </div>

        {/* Highlight Callout */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-sm leading-relaxed text-zinc-300">
          <p>
            The information and products provided by <strong className="text-white">FITTROCK ERGONOMICS LLP</strong> on <Link href="/" className="text-amber-400 hover:underline">fittrock.com</Link> are intended for general ergonomic workplace wellness and active posture management. Please review the specific disclaimers below prior to purchase and daily operation.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono text-sm">01.</span> Ergonomics &amp; Medical Disclaimer
            </h2>
            <p>
              While research demonstrates that alternating between sitting and standing reduces spinal disc pressure and improves daily circulation, Fittrock standing desks and ergonomic chairs are <strong>not medical devices</strong> and are not intended to diagnose, treat, cure, or prevent any acute orthopedic disease or spinal trauma.
            </p>
            <p>
              Users with pre-existing spinal injuries, herniated discs, or post-surgical conditions should consult their licensed physical therapist or orthopedic physician before adopting prolonged standing routines.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono text-sm">02.</span> Weight Capacity &amp; Structural Safety
            </h2>
            <p>
              All motorized desk models have strictly tested maximum weight ratings:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li><strong className="text-zinc-200">KUBER Dual Motor:</strong> 125 kg (inclusive of tabletop weight, monitors, and gear).</li>
              <li><strong className="text-zinc-200">RATI Single Motor:</strong> 80 kg (inclusive of tabletop weight and gear).</li>
              <li><strong className="text-zinc-200">YOGEEK Sit-to-Floor Series:</strong> 125 kg rated load.</li>
            </ul>
            <p>
              Never sit, stand, or climb on the desk surface. Operating the motorized lift system beyond rated load limits voids the motor warranty and can cause structural instability.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono text-sm">03.</span> Product Images &amp; Wood Finish Representation
            </h2>
            <p>
              Product photographs on the website are captured under studio lighting conditions. Natural wood textures, melamine laminate grains, and frame coatings may show slight color variance across individual monitor calibrations or natural ambient room lighting.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono text-sm">04.</span> External Links &amp; Third-Party Video Embeds
            </h2>
            <p>
              Our website may feature links or embedded players referencing YouTube videos, marketplace reviews (Amazon, Flipkart), or third-party ergonomic guides. Fittrock does not endorse and is not responsible for the privacy practices or content of external third-party domains.
            </p>
          </section>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span>Related Links:</span>
          <Link href="/terms" className="text-zinc-200 hover:text-white underline">Terms of Service</Link>
          <Link href="/warranty" className="text-zinc-200 hover:text-white underline">Warranty Policy</Link>
          <Link href="/privacy" className="text-zinc-200 hover:text-white underline">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
}
