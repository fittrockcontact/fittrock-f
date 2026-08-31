import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { Building2, Award, Sparkles, MapPin, Phone, Mail, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us & Seller Information | Fittrock Ergonomics LLP',
  description: 'Learn about Fittrock Ergonomics LLP, India’s premier manufacturer of electric dual-motor height-adjustable standing desks and ergonomic wellness furniture based in Pune.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <Building2 className="w-3.5 h-3.5 text-red-500" />
            <span>Official Seller Information &amp; Corporate Entity</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            About Fittrock Ergonomics
          </h1>
          <p className="text-base text-zinc-400 max-w-2xl">
            Engineered in Pune. Crafted for India&apos;s most demanding creators, developers, and knowledge workers who refuse to compromise on spine health and workspace aesthetics.
          </p>
        </div>

        {/* Legal Seller Transparency Card (Mandated under E-Commerce Rules) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/80 border border-zinc-800 space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-red-600/10 border border-red-500/20 text-red-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">Statutory Seller Information</h2>
              <p className="text-xs text-zinc-400">Mandated transparency disclosure under the Consumer Protection (E-Commerce) Rules, 2020</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-zinc-300">
            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5">
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Legal Entity Name</p>
              <p className="font-bold text-white text-base">FITTROCK ERGONOMICS LLP</p>
              <p className="text-xs text-zinc-400">Registered Limited Liability Partnership in India</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5">
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Primary Business Nature</p>
              <p className="font-bold text-white text-base">Manufacturer &amp; Direct-to-Consumer (D2C)</p>
              <p className="text-xs text-zinc-400">Electric Standing Desks &amp; Ergonomic Furniture</p>
            </div>

            <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 space-y-1.5 sm:col-span-2">
              <p className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">Registered Office &amp; Experience Studio</p>
              <p className="font-semibold text-white">Office no 610, 6th floor, Park Plaza, Porwal Rd, Lohegaon, Pune, Maharashtra 411047, India</p>
              <div className="pt-2 flex flex-wrap gap-4 text-xs">
                <a href="mailto:contact@fittrock.com" className="text-red-400 hover:underline flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> contact@fittrock.com
                </a>
                <a href="tel:+918087827905" className="text-red-400 hover:underline flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> +91 80878 27905
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Brand Mission & Story */}
        <div className="space-y-8 text-sm text-zinc-300 leading-relaxed">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Our Mission: Eradicating Sedentary Strain in Indian Workspaces</h2>
            <p>
              Sedentary work culture is one of the leading contributors to chronic lower back compression, cervical disc strain, and fatigue among Indian IT professionals, designers, and entrepreneurs. Fittrock was founded with a singular conviction: <strong>ergonomic wellness should be accessible, durable, and whisper-quiet</strong>.
            </p>
            <p>
              Rather than importing flimsy manual cranks or generic single-stage mechanisms, we precision-engineer cold-rolled steel dual-motor frames capable of smoothly raising 125 kg loads in under 6 seconds at less than 42 decibels.
            </p>
          </section>

          {/* Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-red-600/10 text-red-400 flex items-center justify-center font-bold">1</div>
              <h3 className="font-bold text-white text-base">Dual-Motor Precision</h3>
              <p className="text-xs text-zinc-400">Synchronized German-spec dual motors with anti-collision gyros for seamless height adjustment.</p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-red-600/10 text-red-400 flex items-center justify-center font-bold">2</div>
              <h3 className="font-bold text-white text-base">Engineered &amp; Solid Woods</h3>
              <p className="text-xs text-zinc-400">Pre-drilled 25mm thick high-density tabletops with bevelled edges in Maple, Gothic Grey, and Frosty White.</p>
            </div>
            <div className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
              <div className="w-8 h-8 rounded-xl bg-red-600/10 text-red-400 flex items-center justify-center font-bold">3</div>
              <h3 className="font-bold text-white text-base">Direct From Factory</h3>
              <p className="text-xs text-zinc-400">No middleman markups. Shipped directly from Pune with comprehensive transit insurance.</p>
            </div>
          </div>
        </div>

        {/* Quick Links Footer */}
        <div className="pt-8 border-t border-zinc-800 flex flex-wrap gap-4 text-xs text-zinc-400">
          <span>Explore More:</span>
          <Link href="/collections/standing-desks" className="text-zinc-200 hover:text-white underline">Standing Desks</Link>
          <Link href="/blog" className="text-zinc-200 hover:text-white underline">Ergo Lab Blog</Link>
          <Link href="/authors" className="text-zinc-200 hover:text-white underline">Ergonomics Team</Link>
          <Link href="/contact" className="text-zinc-200 hover:text-white underline">Visit Pune Studio</Link>
        </div>
      </div>
    </div>
  );
}
