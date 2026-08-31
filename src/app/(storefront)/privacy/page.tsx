import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Shield, Lock, Eye, Database, Server, UserCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | Fittrock Ergonomics LLP',
  description: 'How Fittrock collects, uses, protects, and handles personal data under the IT Act 2000, SPDI Rules 2011, and the Digital Personal Data Protection Act, 2023.',
};

export default function PrivacyPage() {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Data Protection &amp; SPDI Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: <span className="text-zinc-200 font-medium">{lastUpdated}</span> • Compliant with IT Rules, 2011 &amp; DPDP Act, 2023
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-sm leading-relaxed text-zinc-300">
          <p>
            <strong className="text-white">FITTROCK ERGONOMICS LLP</strong> (&quot;Fittrock&quot;, &quot;we&quot;, &quot;our&quot;) values the trust you place in us. This Privacy Policy details how we collect, process, store, and safeguard your personal information when you visit <Link href="/" className="text-emerald-400 hover:underline">fittrock.com</Link> or order our ergonomic standing desks, chairs, and accessories.
          </p>
        </div>

        {/* Policy Content */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">01.</span> Information We Collect
            </h2>
            <p>
              Under Rule 3 of the Information Technology (Sensitive Personal Data or Information) Rules, 2011, we collect only data necessary to fulfill commercial transactions and enhance customer ergonomics consultation:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li><strong className="text-zinc-200">Contact &amp; Identity Data:</strong> Full Name, delivery shipping address, billing address, phone/WhatsApp number, and email address.</li>
              <li><strong className="text-zinc-200">Commercial &amp; Invoicing Data:</strong> Order history, desk customization preferences (motor type, tabletop finishes), and GSTIN (for B2B corporate tax invoices).</li>
              <li><strong className="text-zinc-200">Payment Information:</strong> Transaction tokens provided by licensed payment aggregators (Razorpay). <em>We never store raw debit/credit card numbers or CVVs on our servers.</em></li>
              <li><strong className="text-zinc-200">Technical &amp; Log Data:</strong> IP address, device browser type, operating system, and anonymous interaction metrics collected via secure cookies.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">02.</span> How We Use Your Data
            </h2>
            <p>We process your data strictly for legitimate operational purposes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>Processing, manufacturing, and delivering your custom motorized standing desk orders across India.</li>
              <li>Sending transactional SMS, WhatsApp dispatch notifications, tracking links, and digital GST invoices.</li>
              <li>Providing 3-year motor and 10-year frame warranty verification and after-sales support.</li>
              <li>Facilitating scheduled video installation assistance or technician visits in eligible metro areas.</li>
              <li>Complying with statutory accounting and tax regulations mandated by Indian authorities.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">03.</span> Sharing &amp; Third-Party Disclosures
            </h2>
            <p>
              We do not sell, rent, or trade your personal data to any third-party advertisers. Your information is shared only with verified service partners essential for fulfilling your purchase:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li><strong className="text-zinc-200">Logistics &amp; Courier Partners:</strong> Surface express logistics carriers (e.g., BlueDart, Delhivery, Gati) for doorstep delivery.</li>
              <li><strong className="text-zinc-200">Payment Gateways:</strong> RBI-authorized payment processors (Razorpay) for encrypted payment settlement.</li>
              <li><strong className="text-zinc-200">Government Authorities:</strong> When strictly required by law, subpoena, or statutory tax audit under the laws of India.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">04.</span> Data Security &amp; Retention
            </h2>
            <p>
              We implement industry-standard 256-bit SSL encryption, restricted role-based database access, and secure tokenization to protect your personal information against unauthorized access, alteration, or disclosure.
            </p>
            <p>
              Personal data is retained only for as long as necessary to fulfill the warranty lifecycle (up to 10 years for structural frame warranties) or as prescribed under applicable Indian tax and corporate laws.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">05.</span> Your Rights Under DPDP Act, 2023
            </h2>
            <p>You have the legal right to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>Request a summary of your personal information collected by us.</li>
              <li>Request correction or updating of inaccurate personal data.</li>
              <li>Request deletion of your data (subject to statutory warranty or tax retention limits).</li>
              <li>Withdraw consent for promotional marketing communications at any time.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">06.</span> Grievance Officer &amp; Contact
            </h2>
            <p>
              In accordance with the Information Technology Act, 2000 and rules made thereunder, any privacy queries or data requests can be directed to our designated Grievance Officer:
            </p>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1 text-xs sm:text-sm text-zinc-300">
              <p><strong className="text-white">Grievance Officer:</strong> Data Protection &amp; Compliance Team</p>
              <p><strong className="text-white">Entity:</strong> FITTROCK ERGONOMICS LLP</p>
              <p><strong className="text-white">Address:</strong> Office no 610, 6th floor, Park Plaza, Porwal Rd, Lohegaon, Pune, Maharashtra 411047</p>
              <p><strong className="text-white">Email:</strong> <a href="mailto:privacy@fittrock.com" className="text-emerald-400 hover:underline">privacy@fittrock.com</a> / <a href="mailto:contact@fittrock.com" className="text-emerald-400 hover:underline">contact@fittrock.com</a></p>
              <p><strong className="text-white">Phone:</strong> +91 80878 27905 (Mon-Sat, 10:00 AM – 6:30 PM IST)</p>
            </div>
          </section>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span>Related Links:</span>
          <Link href="/terms" className="text-zinc-200 hover:text-white underline">Terms of Service</Link>
          <Link href="/cookies" className="text-zinc-200 hover:text-white underline">Cookie Policy</Link>
          <Link href="/grievance-redressal" className="text-zinc-200 hover:text-white underline">Grievance Redressal</Link>
        </div>
      </div>
    </div>
  );
}
