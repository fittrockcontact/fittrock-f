import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { Eye, Keyboard, Monitor, CheckCircle2, MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Accessibility Statement | Fittrock Ergonomics LLP',
  description: 'Our commitment to digital accessibility, WCAG 2.1 standards, keyboard navigation, and inclusive design for all users on Fittrock.',
};

export default function AccessibilityPage() {
  const lastUpdated = 'January 15, 2026';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <Eye className="w-3.5 h-3.5 text-cyan-400" />
            <span>Inclusive Digital Design &amp; WCAG 2.1</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Accessibility Statement
          </h1>
          <p className="text-sm text-zinc-400">
            Last Updated: <span className="text-zinc-200 font-medium">{lastUpdated}</span> • FITTROCK ERGONOMICS LLP
          </p>
        </div>

        {/* Commitment Banner */}
        <div className="p-5 rounded-2xl bg-zinc-900/70 border border-zinc-800 text-sm leading-relaxed text-zinc-300">
          <p>
            <strong className="text-white">FITTROCK ERGONOMICS LLP</strong> is committed to ensuring digital accessibility for people with disabilities. We continuously improve the user experience for everyone and apply relevant accessibility standards across our storefront and desk configuration tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <Keyboard className="w-5 h-5 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Keyboard Navigable</h3>
            <p className="text-xs text-zinc-400">Full keyboard focus indicators and logical tab sequences throughout.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <Monitor className="w-5 h-5 text-emerald-400" />
            <h3 className="font-bold text-white text-sm">High Contrast Ratio</h3>
            <p className="text-xs text-zinc-400">Optimized text-to-background contrast meeting WCAG AA standards.</p>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/70 border border-zinc-800 space-y-1">
            <Eye className="w-5 h-5 text-purple-400" />
            <h3 className="font-bold text-white text-sm">Screen Reader Friendly</h3>
            <p className="text-xs text-zinc-400">Semantic HTML tags and descriptive ARIA labels across all controls.</p>
          </div>
        </div>

        {/* Policy Details */}
        <div className="space-y-10 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Conformance Status</h2>
            <p>
              The Web Content Accessibility Guidelines (WCAG) defines requirements for designers and developers to improve accessibility for people with disabilities. It defines three levels of conformance: Level A, Level AA, and Level AAA.
            </p>
            <p>
              Fittrock aims to conform with <strong>WCAG 2.1 Level AA</strong>. We regularly review our interactive 3D configurators, video players, and checkout flows to remove barriers for assistive technology users.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold text-white">Feedback &amp; Assistance</h2>
            <p>
              We welcome your feedback on the accessibility of the Fittrock web store. If you encounter any accessibility barriers while browsing or purchasing:
            </p>
            <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1 text-xs sm:text-sm text-zinc-300">
              <p><strong className="text-white">Email:</strong> <a href="mailto:accessibility@fittrock.com" className="text-cyan-400 hover:underline">accessibility@fittrock.com</a> / <a href="mailto:contact@fittrock.com" className="text-cyan-400 hover:underline">contact@fittrock.com</a></p>
              <p><strong className="text-white">Phone / WhatsApp:</strong> +91 86055 91550 (Assisted Phone Orders Available)</p>
              <p className="text-zinc-400 pt-1">We strive to respond to accessibility feedback within 2 business days.</p>
            </div>
          </section>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span>Related Policies:</span>
          <Link href="/terms" className="text-zinc-200 hover:text-white underline">Terms of Service</Link>
          <Link href="/privacy" className="text-zinc-200 hover:text-white underline">Privacy Policy</Link>
          <Link href="/contact" className="text-zinc-200 hover:text-white underline">Contact Us</Link>
        </div>
      </div>
    </div>
  );
}
