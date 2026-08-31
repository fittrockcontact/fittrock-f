import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Scale, Mail, Phone, MapPin, Clock, CheckCircle2, ShieldAlert } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Grievance Redressal Mechanism | Fittrock Ergonomics LLP',
  description: 'Designated Grievance Officer and dispute escalation mechanism under the Consumer Protection (E-Commerce) Rules, 2020 and Information Technology Act, 2000.',
};

export default function GrievanceRedressalPage() {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <Scale className="w-3.5 h-3.5 text-rose-400" />
            <span>Consumer Protection Act, 2019 &amp; E-Commerce Rules, 2020 Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Grievance Redressal Mechanism
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: <span className="text-zinc-200 font-medium">{lastUpdated}</span> • Official Legal &amp; Escalation Channel
          </p>
        </div>

        {/* Highlight Card */}
        <div className="p-6 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            Statutory Grievance Officer Details
          </h3>
          <p className="text-sm text-zinc-300">
            In accordance with the <strong>Consumer Protection (E-Commerce) Rules, 2020</strong> and Rule 5(9) of the <strong>Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021</strong>, the name and contact details of our designated Grievance Officer are published below:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs sm:text-sm text-zinc-300">
            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
              <p className="text-xs text-zinc-500 uppercase font-semibold">Grievance &amp; Compliance Officer</p>
              <p className="font-bold text-white text-base">Mr. Nodal Officer (Compliance Head)</p>
              <p className="text-zinc-400">FITTROCK ERGONOMICS LLP</p>
              <p className="flex items-center gap-2 text-zinc-300 pt-1">
                <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                <a href="mailto:grievance@fittrock.com" className="text-rose-400 hover:underline">grievance@fittrock.com</a>
              </p>
              <p className="flex items-center gap-2 text-zinc-300">
                <Phone className="w-4 h-4 text-rose-400 shrink-0" />
                <span>+91 80878 27905 (Ext. Grievance Desk)</span>
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-2">
              <p className="text-xs text-zinc-500 uppercase font-semibold">Registered Entity &amp; Physical Office</p>
              <p className="font-bold text-white text-base">FITTROCK ERGONOMICS LLP</p>
              <p className="flex items-start gap-2 text-zinc-300">
                <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>Office no 610, 6th floor, Park Plaza, Porwal Rd, Lohegaon, Pune, Maharashtra 411047, India</span>
              </p>
              <p className="text-xs text-zinc-400 pt-1">
                <strong>Working Hours:</strong> Monday – Saturday, 10:00 AM to 6:30 PM IST (Excluding Gazetted Holidays)
              </p>
            </div>
          </div>
        </div>

        {/* Escalation Process */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white">Three-Tier Escalation Matrix</h2>
            <div className="space-y-4">
              {/* Level 1 */}
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">Level 1: Frontline Customer Support</h4>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800/40">TAT: 2–6 Hours</span>
                </div>
                <p className="text-xs text-zinc-400">
                  For regular queries regarding order tracking, assembly video guides, tabletop finish choices, or invoices, contact our WhatsApp desk at <a href="https://wa.me/918605591550" className="text-blue-400 underline">+91 86055 91550</a> or email <a href="mailto:contact@fittrock.com" className="text-blue-400 underline">contact@fittrock.com</a>.
                </p>
              </div>

              {/* Level 2 */}
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">Level 2: Grievance Officer Escalation</h4>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-rose-950 text-rose-400 border border-rose-800/40">Acknowledgment: &lt;48 Hours</span>
                </div>
                <p className="text-xs text-zinc-400">
                  If your issue is unresolved within 48 hours or you are dissatisfied with the Level 1 resolution, email <a href="mailto:grievance@fittrock.com" className="text-rose-400 underline">grievance@fittrock.com</a> with your Order ID and communication history.
                </p>
              </div>

              {/* Level 3 */}
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm">Level 3: Final Resolution</h4>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800/40">Max Resolution: &lt;30 Days</span>
                </div>
                <p className="text-xs text-zinc-400">
                  Under the Consumer Protection Rules, our Grievance Officer will issue an official acknowledgment ticket within <strong>48 hours</strong> and provide a final reasoned resolution within <strong>30 calendar days</strong>.
                </p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">National Consumer Helpline (NCH) Redressal</h2>
            <p>
              Customers can also file consumer complaints through the Government of India&apos;s National Consumer Helpline (NCH) portal at <a href="https://consumerhelpline.gov.in" target="_blank" rel="noopener noreferrer" className="text-rose-400 hover:underline">consumerhelpline.gov.in</a> or by dialing toll-free 1915.
            </p>
          </section>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span>Related Links:</span>
          <Link href="/terms" className="text-zinc-200 hover:text-white underline">Terms of Service</Link>
          <Link href="/privacy" className="text-zinc-200 hover:text-white underline">Privacy Policy</Link>
          <Link href="/refund" className="text-zinc-200 hover:text-white underline">Refund Policy</Link>
          <Link href="/about" className="text-zinc-200 hover:text-white underline">About Us / Seller Info</Link>
        </div>
      </div>
    </div>
  );
}
