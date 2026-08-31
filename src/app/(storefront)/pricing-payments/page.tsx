import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { CreditCard, Receipt, Percent, ShieldCheck, HelpCircle, FileCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Pricing & Payment Terms | Fittrock Ergonomics LLP',
  description: 'Understand pricing display, GST 18% tax transparency, accepted payment methods (UPI, Cards, No-Cost EMI), and B2B GST tax invoice generation.',
};

export default function PricingPaymentsPage() {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Transparent Pricing &amp; Tax Compliance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Pricing &amp; Payment Terms
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: <span className="text-zinc-200 font-medium">{lastUpdated}</span> • 100% Tax Inclusive Pricing (INR)
          </p>
        </div>

        {/* Highlight Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <Receipt className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">GST 18% Inclusive</h3>
            <p className="text-xs text-zinc-400">All prices displayed are final. No surprise taxes added at checkout.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <Percent className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white text-sm">No-Cost EMI Options</h3>
            <p className="text-xs text-zinc-400">Available across all major credit cards and cardless BNPL partners.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <FileCheck className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-sm">B2B Tax Invoicing</h3>
            <p className="text-xs text-zinc-400">Claim 18% GST Input Tax Credit (ITC) with your registered company GSTIN.</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">01.</span> Currency &amp; Pricing Transparency
            </h2>
            <p>
              All prices across our website are displayed in <strong>Indian National Rupees (INR / ₹)</strong> and are inclusive of all statutory central and state taxes (CGST, SGST, IGST at 18% under HSN 9403). The price you see on the product page is the exact final price you pay at checkout.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">02.</span> Accepted Payment Modes
            </h2>
            <p>We accept all standard, secure Indian payment options via Razorpay:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li><strong className="text-zinc-200">Unified Payments Interface (UPI):</strong> Google Pay, PhonePe, Paytm, BHIM, CRED, and all BHIM UPI QR codes.</li>
              <li><strong className="text-zinc-200">Credit &amp; Debit Cards:</strong> Visa, MasterCard, RuPay, and American Express.</li>
              <li><strong className="text-zinc-200">Internet Banking:</strong> Over 50+ Indian banks including HDFC, ICICI, SBI, Axis, Kotak, and Bank of Baroda.</li>
              <li><strong className="text-zinc-200">EMI &amp; PayLater:</strong> 3, 6, 9, and 12-month low-cost and No-Cost EMI plans on eligible bank credit cards.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">03.</span> B2B Invoices &amp; Input Tax Credit (ITC)
            </h2>
            <p>
              Purchasing ergonomic standing desks for your office or remote tech team?
            </p>
            <p>
              During checkout, check the <em>&quot;I have a GSTIN (B2B Tax Invoice)&quot;</em> box and enter your legal company name and 15-digit GSTIN. An official digitally-signed GST Tax Invoice with our GSTIN will be automatically emailed to you upon dispatch for claiming 100% Input Tax Credit.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-emerald-400 font-mono text-sm">04.</span> Payment Security &amp; Fraud Prevention
            </h2>
            <p>
              All payments are processed using 256-bit TLS encryption in accordance with RBI guidelines on tokenization and two-factor authentication (OTP/PIN). In the event that payment is debited from your account but order generation fails, funds are automatically refunded back to your source account within 24 to 48 hours by Razorpay.
            </p>
          </section>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span>Related Policies:</span>
          <Link href="/terms" className="text-zinc-200 hover:text-white underline">Terms &amp; Conditions</Link>
          <Link href="/refund" className="text-zinc-200 hover:text-white underline">Refund Policy</Link>
          <Link href="/shipping" className="text-zinc-200 hover:text-white underline">Shipping Policy</Link>
          <Link href="/about" className="text-zinc-200 hover:text-white underline">Seller Info</Link>
        </div>
      </div>
    </div>
  );
}
