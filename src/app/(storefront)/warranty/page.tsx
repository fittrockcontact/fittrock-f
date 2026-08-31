import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, Cpu, Hammer, FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Warranty Policy & Claim Process | Fittrock Ergonomics LLP',
  description: '10-Year Structural Frame Warranty and 3-Year Motor & Electrical Warranty terms, coverage breakdown, and claim submission process.',
};

export default function WarrantyPolicyPage() {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Comprehensive Product Warranty Coverage</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Warranty Policy
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: <span className="text-zinc-200 font-medium">{lastUpdated}</span> • Backed by Fittrock Ergonomics LLP
          </p>
        </div>

        {/* Coverage Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="inline-flex p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <Hammer className="w-5 h-5" />
            </div>
            <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Structural Strength</p>
            <h3 className="text-2xl font-black text-white">10 Years</h3>
            <p className="text-xs text-zinc-400">Steel columns, telescoping crossbars, base feet, and weld joints.</p>
          </div>

          <div className="p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="inline-flex p-2 rounded-xl bg-blue-500/10 text-blue-400">
              <Cpu className="w-5 h-5" />
            </div>
            <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Motors &amp; Electronics</p>
            <h3 className="text-2xl font-black text-white">3 Years</h3>
            <p className="text-xs text-zinc-400">German-spec lifting motors, control boxes, memory keypads &amp; wiring.</p>
          </div>

          <div className="p-5 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-2">
            <div className="inline-flex p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-xs text-zinc-400 uppercase font-bold tracking-wider">Chairs &amp; Accessories</p>
            <h3 className="text-2xl font-black text-white">1–2 Years</h3>
            <p className="text-xs text-zinc-400">Gas-lift hydraulic cylinders, chair mechanisms, monitor arms &amp; trays.</p>
          </div>
        </div>

        {/* Warranty Content */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">01.</span> Scope of Warranty Coverage
            </h2>
            <p>
              FITTROCK ERGONOMICS LLP guarantees that all motorized standing desks, frames, and ergonomic furniture purchased directly from <Link href="/" className="text-emerald-400 hover:underline">fittrock.com</Link> or authorized official marketplace brand stores are free from manufacturing defects in materials and workmanship during the specified warranty term.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li><strong className="text-zinc-200">10-Year Frame Warranty:</strong> Covers cracking, structural weld failure, mechanical joint shearing, or failure of the telescoping steel rail under normal indoor home/office operation.</li>
              <li><strong className="text-zinc-200">3-Year Motor &amp; Electrical Warranty:</strong> Covers motor drive failures, control board circuit malfunctions, electronic error codes (e.g. E01/E08/RST issues), memory handset buttons, and power transformers.</li>
              <li><strong className="text-zinc-200">2-Year Tabletop Warranty:</strong> Covers delamination or warping of engineered wood and solid wood tabletops under normal indoor conditions.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">02.</span> Step-by-Step Claim Process
            </h2>
            <p>We believe warranty claims should be frictionless and fast:</p>
            <ol className="list-decimal pl-5 space-y-2 text-zinc-400">
              <li>Record a short 10-second video of the issue (e.g. error code on the digital display or motor sound).</li>
              <li>Send the video along with your Order ID or registered phone number to our WhatsApp Support at <a href="https://wa.me/918605591550" className="text-emerald-400 hover:underline">+91 86055 91550</a> or email <a href="mailto:support@fittrock.com" className="text-emerald-400 hover:underline">support@fittrock.com</a>.</li>
              <li>Our technical engineer in Pune will diagnose the issue within 2 to 4 business hours.</li>
              <li>We will air-ship the brand new replacement part (motor, control box, or handset) directly to your doorstep with zero shipping charges, accompanied by a quick video guide for 5-minute plug-and-play installation.</li>
            </ol>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">03.</span> Warranty Exclusions
            </h2>
            <p>The warranty does not cover:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>Normal cosmetic wear and tear (surface paint scuffs, minor scratches from sharp metallic tools).</li>
              <li>Damage resulting from operating the desk outdoors or exposure to water / heavy humidity.</li>
              <li>Voltage surges or lightning strikes without basic surge protection.</li>
              <li>Exceeding rated weight capacities (125 kg for Dual Motor, 80 kg for Single Motor).</li>
              <li>Unauthorized modification or third-party electrical repairs.</li>
            </ul>
          </section>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span>Related Policies:</span>
          <Link href="/terms" className="text-zinc-200 hover:text-white underline">Terms &amp; Conditions</Link>
          <Link href="/returns" className="text-zinc-200 hover:text-white underline">Return Policy</Link>
          <Link href="/refund" className="text-zinc-200 hover:text-white underline">Refund Policy</Link>
          <Link href="/contact" className="text-zinc-200 hover:text-white underline">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
