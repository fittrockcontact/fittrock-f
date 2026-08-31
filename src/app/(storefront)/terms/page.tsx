import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { ShieldCheck, FileText, Scale, AlertCircle, HelpCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | Fittrock Ergonomics LLP',
  description: 'Terms and Conditions governing the use of the Fittrock website, purchases, intellectual property, warranties, and legal liability under Indian Law.',
};

export default function TermsPage() {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <Scale className="w-3.5 h-3.5 text-red-500" />
            <span>Legal Compliance &amp; Consumer Protection</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: <span className="text-zinc-200 font-medium">{lastUpdated}</span> • Governed by the Laws of the Republic of India
          </p>
        </div>

        {/* Introduction Callout */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-sm leading-relaxed text-zinc-300">
          <p>
            These Terms &amp; Conditions (&quot;Terms&quot;) constitute a legally binding electronic agreement between you (&quot;User&quot;, &quot;Customer&quot;, or &quot;You&quot;) and <strong className="text-white">FITTROCK ERGONOMICS LLP</strong> (&quot;Fittrock&quot;, &quot;We&quot;, &quot;Us&quot;, or &quot;Our&quot;), governing your access to and use of <Link href="/" className="text-red-400 hover:underline font-medium">fittrock.com</Link>, our mobile web experiences, and the purchase of our height-adjustable standing desks, ergonomic seating, and accessories.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-red-500 font-mono text-sm">01.</span> User Eligibility &amp; Account Responsibility
            </h2>
            <p>
              By accessing this website or placing an order, you represent and warrant that you are at least 18 years of age and legally competent to enter into binding contracts under the <strong>Indian Contract Act, 1872</strong>. If you are registering an account on behalf of a corporate entity, you represent that you hold full authorization to bind that organization to these Terms.
            </p>
            <p>
              You are solely responsible for maintaining the confidentiality of your account credentials and one-time passwords (OTPs). Any activity conducted through your registered account shall be deemed your responsibility.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-red-500 font-mono text-sm">02.</span> Product Specifications &amp; Availability
            </h2>
            <p>
              Fittrock manufactures and markets motorized standing desks, desk frames, solid/engineered wood tabletops, and ergonomic chairs. We make every reasonable effort to display product dimensions, weight capacities (e.g., 125 kg for Dual-Motor KUBER, 80 kg for Single-Motor RATI), lift speed, motor decibel ratings (&lt;42 dB), and wood textures as accurately as possible.
            </p>
            <p>
              However, natural wood grains and screen calibrations may exhibit slight natural variations. All product orders are subject to stock availability. We reserve the right to discontinue or modify product specifications without prior notice.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-red-500 font-mono text-sm">03.</span> Pricing, Invoicing &amp; Taxes
            </h2>
            <p>
              All prices listed on the website are denominated in <strong>Indian Rupees (INR / ₹)</strong> and are inclusive of Goods &amp; Services Tax (GST at applicable 18% slab for office furniture), unless explicitly stated otherwise.
            </p>
            <p>
              Tax Invoices featuring our GSTIN and your registered B2B GSTIN (if provided during checkout) will be automatically generated upon dispatch and sent to your registered email address.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-red-500 font-mono text-sm">04.</span> Payment Gateway &amp; Security
            </h2>
            <p>
              We partner with PCI-DSS compliant Indian payment aggregators (such as Razorpay) to process Credit/Debit Cards, UPI, Net Banking, and Cardless EMI. Fittrock does not store your full card numbers, CVV, or banking passwords. In the event of a fraudulent transaction, you must notify your issuing bank and our customer support immediately.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-red-500 font-mono text-sm">05.</span> Intellectual Property Rights
            </h2>
            <p>
              All logos, brand names, visual assets, 3D configurator models, website copy, graphics, and software code on this website are the proprietary intellectual property of <strong>FITTROCK ERGONOMICS LLP</strong> and are protected under Indian and international copyright and trademark laws.
            </p>
            <p>
              Unauthorized reproduction, scraping, reverse engineering, or commercial exploitation without written consent is strictly prohibited.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-red-500 font-mono text-sm">06.</span> Limitation of Liability
            </h2>
            <p>
              To the maximum extent permitted by Indian Law, Fittrock Ergonomics LLP and its designated partners, directors, or employees shall not be liable for any indirect, punitive, incidental, or consequential damages resulting from product misuse, unauthorized modifications, exceeding rated weight capacities, or electrical voltage surges beyond standard household tolerances (220V–240V, 50Hz).
            </p>
            <p>
              Our total cumulative liability for any verified claim arising out of a purchased product shall not exceed the actual purchase price paid by the customer for that specific item.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-red-500 font-mono text-sm">07.</span> Governing Law &amp; Dispute Jurisdiction
            </h2>
            <p>
              These Terms shall be interpreted and governed in accordance with the laws of the <strong>Republic of India</strong>, including the Consumer Protection Act, 2019 and the Information Technology Act, 2000.
            </p>
            <p>
              Any legal dispute, suit, or proceeding arising out of or related to these Terms or purchases made on this platform shall be subject to the exclusive jurisdiction of the competent courts in <strong>Pune, Maharashtra, India</strong>.
            </p>
          </section>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span>Related Policies:</span>
          <Link href="/privacy" className="text-zinc-200 hover:text-white underline">Privacy Policy</Link>
          <Link href="/refund" className="text-zinc-200 hover:text-white underline">Refund &amp; Cancellation</Link>
          <Link href="/warranty" className="text-zinc-200 hover:text-white underline">Warranty Terms</Link>
          <Link href="/grievance-redressal" className="text-zinc-200 hover:text-white underline">Grievance Redressal</Link>
        </div>
      </div>
    </div>
  );
}
