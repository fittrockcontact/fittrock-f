import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Cookie, Shield, Settings, Info, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Cookie Policy | Fittrock Ergonomics LLP',
  description: 'How Fittrock uses essential cookies, performance tracking, and session data to optimize your shopping and desk configuration experience.',
};

export default function CookiePolicyPage() {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <Cookie className="w-3.5 h-3.5 text-amber-400" />
            <span>Browser Storage &amp; Transparency</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Cookie Policy
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: <span className="text-zinc-200 font-medium">{lastUpdated}</span> • Digital Personal Data Protection Act (DPDP), 2023
          </p>
        </div>

        {/* Introduction Callout */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-sm leading-relaxed text-zinc-300">
          <p>
            This Cookie Policy explains how <strong className="text-white">FITTROCK ERGONOMICS LLP</strong> uses cookies, local storage, and similar web technologies on <Link href="/" className="text-amber-400 hover:underline">fittrock.com</Link> to preserve your shopping cart, remember 3D studio desk customizations, and analyze website performance.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono text-sm">01.</span> What Are Cookies?
            </h2>
            <p>
              Cookies are small alphanumeric text files stored on your computer or mobile device when you visit websites. They allow our server to recognize your device across sessions, remember items in your cart, and deliver a smooth checkout experience without forcing you to re-enter configurations on each page refresh.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono text-sm">02.</span> Categories of Cookies We Use
            </h2>
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1">
                <h4 className="font-bold text-white text-sm">1. Strictly Necessary / Essential Cookies</h4>
                <p className="text-xs text-zinc-400">
                  Required for core platform operations such as user authentication, cart persistence, and secure Razorpay payment processing. These cannot be disabled without breaking website functionality.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1">
                <h4 className="font-bold text-white text-sm">2. Preference &amp; Functionality Cookies</h4>
                <p className="text-xs text-zinc-400">
                  Remember your chosen desk frame finish, tabletop dimensions (e.g. 1600x750mm vs 1200x600mm), and selected ergonomic accessories in our interactive desk configurator.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 space-y-1">
                <h4 className="font-bold text-white text-sm">3. Performance &amp; Analytics Cookies</h4>
                <p className="text-xs text-zinc-400">
                  Collect aggregated, anonymized metrics on page load times, high-traffic blog posts, and checkout drop-off rates to help our engineering team optimize speed and reliability.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span className="text-amber-400 font-mono text-sm">03.</span> Managing &amp; Disabling Cookies
            </h2>
            <p>
              Most modern web browsers (Chrome, Safari, Edge, Firefox) allow you to view, delete, or block cookies through browser settings. Please note that if you block all cookies, features such as saving custom desk configurations or keeping items in your cart may not function properly.
            </p>
          </section>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span>Related Policies:</span>
          <Link href="/privacy" className="text-zinc-200 hover:text-white underline">Privacy Policy</Link>
          <Link href="/terms" className="text-zinc-200 hover:text-white underline">Terms of Service</Link>
          <Link href="/grievance-redressal" className="text-zinc-200 hover:text-white underline">Grievance Redressal</Link>
        </div>
      </div>
    </div>
  );
}
