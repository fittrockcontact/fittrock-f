import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { RefreshCw, Clock, CreditCard, CheckCircle2, AlertTriangle } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund & Cancellation Policy | Fittrock Ergonomics LLP',
  description: 'Understand Fittrock’s order cancellation timelines, refund processing via Razorpay, and 30-day money-back satisfaction guarantee terms.',
};

export default function RefundPage() {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <RefreshCw className="w-3.5 h-3.5 text-blue-400" />
            <span>30-Day Risk-Free Guarantee &amp; Cancellation Terms</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Refund &amp; Cancellation Policy
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: <span className="text-zinc-200 font-medium">{lastUpdated}</span> • Consumer Protection (E-Commerce) Rules, 2020
          </p>
        </div>

        {/* Highlight Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <Clock className="w-5 h-5 text-blue-400" />
            <h3 className="font-bold text-white text-sm">24-Hour Free Cancellation</h3>
            <p className="text-xs text-zinc-400">Cancel before dispatch with 100% full refund immediately.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">30-Day Trial Guarantee</h3>
            <p className="text-xs text-zinc-400">Try your desk for 30 days. Not satisfied? Return hassle-free.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <CreditCard className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white text-sm">5-7 Days Bank Refund</h3>
            <p className="text-xs text-zinc-400">Directly credited back to original payment mode via Razorpay.</p>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-400 font-mono text-sm">01.</span> Order Cancellation Policy
            </h2>
            <p>
              We understand that plans can change. You can cancel your order under the following conditions:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li><strong className="text-zinc-200">Before Dispatch (Within 24 Hours):</strong> If your motorized desk, tabletop, or accessory order has not left our Pune manufacturing facility, you receive a <strong>100% instant refund</strong> with zero cancellation charges.</li>
              <li><strong className="text-zinc-200">After Dispatch / In-Transit:</strong> If you request cancellation while the shipment is in transit with our logistics partner, a nominal round-trip freight charge may be deducted from the total refund amount to cover return courier costs.</li>
              <li><strong className="text-zinc-200">Customized / Bespoke Orders:</strong> Custom CNC table cuts or custom-drilled dimensions cannot be cancelled once wood cutting has commenced.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-400 font-mono text-sm">02.</span> 30-Day Money-Back Guarantee
            </h2>
            <p>
              We want you to experience genuine ergonomic comfort with zero hesitation. If you are not completely thrilled with your Fittrock motorized standing desk or chair within <strong>30 calendar days</strong> of delivery:
            </p>
            <ol className="list-decimal pl-5 space-y-1.5 text-zinc-400">
              <li>Contact our team via WhatsApp at <a href="https://wa.me/918605591550" className="text-blue-400 hover:underline">+91 86055 91550</a> or email <a href="mailto:support@fittrock.com" className="text-blue-400 hover:underline">support@fittrock.com</a>.</li>
              <li>We will arrange a reverse pickup from your doorstep across major serviceable pin codes in India.</li>
              <li>Once our warehouse team receives and inspects the item for basic completeness (original frame, motor controller, power cable, and tabletop), your refund is approved.</li>
            </ol>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-400 font-mono text-sm">03.</span> Refund Timelines &amp; Methods
            </h2>
            <p>
              All approved refunds are credited back to the original method of payment via our banking partner Razorpay:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-zinc-800 rounded-xl overflow-hidden">
                <thead className="bg-zinc-900 text-zinc-200">
                  <tr>
                    <th className="p-3 border-b border-zinc-800">Payment Mode</th>
                    <th className="p-3 border-b border-zinc-800">Refund Destination</th>
                    <th className="p-3 border-b border-zinc-800">Estimated TAT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-400">
                  <tr>
                    <td className="p-3 font-medium text-white">UPI (GPay / PhonePe / Paytm)</td>
                    <td className="p-3">Source Bank Account via UPI</td>
                    <td className="p-3 text-emerald-400">24 – 48 Hours</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Credit / Debit Card</td>
                    <td className="p-3">Source Card Issuing Bank</td>
                    <td className="p-3">3 – 5 Business Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">Net Banking / NEFT</td>
                    <td className="p-3">Source Bank Account</td>
                    <td className="p-3">3 – 7 Business Days</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-medium text-white">No-Cost EMI / PayLater</td>
                    <td className="p-3">Financing Partner Account</td>
                    <td className="p-3">5 – 7 Business Days (Interest reversed)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-blue-400 font-mono text-sm">04.</span> Non-Refundable Scenarios
            </h2>
            <p>Refunds cannot be issued under the following circumstances:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-zinc-400">
              <li>Damage caused by customer mishandling, electrical short circuits exceeding 240V without surge protection, or DIY drill modifications not matching instruction manuals.</li>
              <li>Products returned with missing core components (e.g. control box, handset, AC adapter).</li>
              <li>Requests initiated after the expiry of the 30-day trial window (post 30 days, issues are covered under our <strong>3-Year / 10-Year Warranty</strong>).</li>
            </ul>
          </section>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span>Related Policies:</span>
          <Link href="/returns" className="text-zinc-200 hover:text-white underline">Return &amp; Exchange Policy</Link>
          <Link href="/shipping" className="text-zinc-200 hover:text-white underline">Shipping Policy</Link>
          <Link href="/warranty" className="text-zinc-200 hover:text-white underline">Warranty Policy</Link>
          <Link href="/contact" className="text-zinc-200 hover:text-white underline">Contact Support</Link>
        </div>
      </div>
    </div>
  );
}
