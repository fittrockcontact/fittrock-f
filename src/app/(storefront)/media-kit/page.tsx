'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Download,
  Copy,
  Check,
  Building2,
  Sparkles,
  FileText,
  Mail,
  Phone,
  Camera,
  ExternalLink,
  ShieldCheck,
  Layers,
  ArrowRight,
  Send,
  Loader2,
  CheckCircle2,
} from 'lucide-react';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api-client';

const BRAND_COLORS = [
  {
    name: 'Fittrock Crimson',
    role: 'Primary Brand Accent',
    hex: '#a32222',
    rgb: '163, 34, 34',
    cmyk: '20, 95, 95, 15',
    isDark: true,
  },
  {
    name: 'Carbon Onyx',
    role: 'Primary Dark & Frame',
    hex: '#09090b',
    rgb: '9, 9, 11',
    cmyk: '0, 0, 0, 96',
    isDark: true,
  },
  {
    name: 'Amber Glow',
    role: 'Highlights & Ratings',
    hex: '#f59e0b',
    rgb: '245, 158, 11',
    cmyk: '0, 40, 95, 0',
    isDark: false,
  },
  {
    name: 'Studio Gray',
    role: 'Surface & UI Elements',
    hex: '#f4f4f5',
    rgb: '244, 244, 245',
    cmyk: '3, 2, 2, 0',
    isDark: false,
  },
  {
    name: 'Pure White',
    role: 'Contrast & Canvas',
    hex: '#ffffff',
    rgb: '255, 255, 255',
    cmyk: '0, 0, 0, 0',
    isDark: false,
  },
];

const LOGO_ASSETS = [
  {
    title: 'Wordmark Logo (Light / White on Dark)',
    description: 'Vector SVG & transparent high-res PNG for dark backgrounds, video overlays, and dark mode websites.',
    previewBg: 'bg-zinc-950',
    previewImg: '/wordart-logo-white-color.svg',
    svgPath: '/wordart-logo-white-color.svg',
    pngPath: '/wordart-logo-white-color.png',
  },
  {
    title: 'Wordmark Logo (Dark / Black on Light)',
    description: 'Vector SVG & transparent PNG for light backgrounds, print documents, press releases, and white letterheads.',
    previewBg: 'bg-white border border-zinc-200',
    previewImg: '/wordart-logo-black-color.svg',
    svgPath: '/wordart-logo-black-color.svg',
    pngPath: '/wordart-logo-black-color.png',
  },
  {
    title: 'Primary Monogram Emblem',
    description: 'Square monogram icon for app icons, profile avatars, editorial stamps, and compact square favicons.',
    previewBg: 'bg-zinc-900 border border-zinc-800',
    previewImg: '/logo.svg',
    svgPath: '/logo.svg',
    pngPath: '/logo.png',
  },
];

const FAST_FACTS = [
  { label: 'Legal Entity', value: 'FITTROCK ERGONOMICS LLP' },
  { label: 'Headquarters', value: 'Pune, Maharashtra, India' },
  { label: 'Founded For', value: 'Indian creators, coders, & modern hybrid offices' },
  { label: 'Flagship Products', value: 'Kuber Dual Motor & Rati Single Motor Desks' },
  { label: 'Warranty Standard', value: '3-Year Comprehensive On-Site Warranty' },
  { label: 'Delivery SLA', value: '100% Pan-India Express Doorstep Shipping' },
  { label: 'Customer Satisfaction', value: '4.9 / 5.0 Star Google Verified Reviews' },
  { label: 'Desks Installed', value: '10,000+ Workspaces Transformed' },
];

export default function MediaKitPage() {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  // Press Inquiry Form State
  const [pressForm, setPressForm] = useState({
    name: '',
    outlet: '',
    email: '',
    deadline: '',
    inquiry: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHex(text);
    toast.success(`Copied ${label} (${text}) to clipboard!`);
    setTimeout(() => setCopiedHex(null), 2000);
  };

  const handlePressSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pressForm.name || !pressForm.email || !pressForm.inquiry) {
      toast.error('Please fill in your name, publication/outlet, email, and inquiry.');
      return;
    }

    setSubmitting(true);
    try {
      const fullMessage = `
[PRESS / MEDIA INQUIRY]
Publication / Media Outlet: ${pressForm.outlet || 'Independent / Freelance'}
Editorial Deadline: ${pressForm.deadline || 'Flexible'}

Inquiry Details:
${pressForm.inquiry}
      `.trim();

      const res = await apiFetch<{ success: boolean; message: string }>('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: `${pressForm.name} (${pressForm.outlet || 'Media'})`,
          email: pressForm.email,
          subject: `[Press & Media] Inquiry from ${pressForm.outlet || pressForm.name}`,
          message: fullMessage,
        }),
      });

      if (res?.success) {
        setSubmitted(true);
        toast.success('Press inquiry submitted! Our media communications team will respond promptly.');
      } else {
        toast.error('Could not submit inquiry. Please email press@fittrock.com directly.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to send inquiry';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 pb-20">
      
      {/* Hero Section */}
      <section className="bg-zinc-950 text-white pt-16 pb-20 border-b border-zinc-800 relative overflow-hidden">
        {/* Subtle Ambient Light */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#a32222]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <Sparkles className="w-3.5 h-3.5 text-[#a32222]" />
            <span>Official Press Kit &amp; Brand Guidelines</span>
          </div>

          <div className="space-y-4 max-w-3xl">
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Fittrock Media Kit &amp; Press Room
            </h1>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed">
              Official logos, high-resolution product imagery, brand assets, color codes, and executive commentary for journalists, creators, and media partners.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <a
              href="/wordart-logo-white-color.svg"
              download="fittrock-logo-white.svg"
              className="bg-[#a32222] hover:bg-[#851622] text-white font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-[#a32222]/20 active:scale-98 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Primary Vector Logo (.SVG)</span>
            </a>

            <a
              href="#press-inquiry"
              className="bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 font-bold px-6 py-3 rounded-2xl text-xs sm:text-sm flex items-center gap-2 transition-colors"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>Contact Press Office</span>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Company Facts Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <div className="bg-white rounded-3xl border border-zinc-200 shadow-xl p-6 sm:p-8">
          <div className="flex items-center gap-3 border-b border-zinc-100 pb-4 mb-6">
            <div className="p-2 rounded-xl bg-red-50 text-[#a32222]">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-zinc-950">Company Fast Facts &amp; At-a-Glance</h2>
              <p className="text-xs text-zinc-500">Verified institutional data for press citations and editorial publication.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {FAST_FACTS.map((fact, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-zinc-50 border border-zinc-200/80 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500">
                  {fact.label}
                </span>
                <p className="text-xs sm:text-sm font-bold text-zinc-950 leading-snug">
                  {fact.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Narrative / About Snippet */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-6">
        <div className="border-l-4 border-[#a32222] pl-4 space-y-2">
          <h2 className="text-2xl font-black text-zinc-950">About Fittrock Ergonomics</h2>
          <p className="text-xs sm:text-sm text-zinc-500 uppercase tracking-wider font-semibold">
            Official Boilerplate for Press Releases
          </p>
        </div>

        <div className="bg-zinc-50 rounded-3xl p-6 sm:p-8 border border-zinc-200 space-y-4 text-sm text-zinc-700 leading-relaxed">
          <p>
            <strong>FITTROCK ERGONOMICS LLP</strong> is an Indian workplace wellness and ergonomic furniture manufacturer headquartered in Pune, Maharashtra. Built to combat the severe spinal and metabolic toll of prolonged sedentary office culture, Fittrock engineers heavy-duty motorized standing desks, multi-stage electric lifting columns, and synchronized lumbar mesh chairs.
          </p>
          <p>
            Unlike generic imported re-brands, Fittrock develops high-load dual-motor mechanisms with whisper-quiet (&lt;45dB) decibel performance, smart gyroscope anti-collision safety sensors, multi-memory digital height controllers, and solid FSC-certified wood and high-density bevelled tabletops. Every desk is backed by a 3-Year comprehensive on-site warranty and nationwide express doorstep delivery across India.
          </p>

          <div className="pt-2 flex items-center justify-between border-t border-zinc-200 text-xs">
            <span className="text-zinc-500">Suggested editorial attribution: &quot;Fittrock Ergonomics&quot; or &quot;Fittrock&quot;</span>
            <button
              onClick={() =>
                copyToClipboard(
                  'FITTROCK ERGONOMICS LLP is an Indian workplace wellness and ergonomic furniture manufacturer headquartered in Pune, Maharashtra, engineering heavy-duty motorized standing desks and lumbar ergonomic chairs with whisper-quiet dual motors and 3-Year warranty.',
                  'Boilerplate text'
                )
              }
              className="text-[#a32222] font-bold hover:underline inline-flex items-center gap-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Boilerplate</span>
            </button>
          </div>
        </div>
      </section>

      {/* Official Logos & Brand Marks */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-zinc-950 flex items-center gap-2">
            <Layers className="w-6 h-6 text-[#a32222]" />
            <span>Official Logo Assets &amp; Marks</span>
          </h2>
          <p className="text-sm text-zinc-600">
            Download vector SVG files (infinite resolution) or transparent PNGs. Please preserve minimum clear space around the logo marks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LOGO_ASSETS.map((logo, idx) => (
            <div key={idx} className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm flex flex-col justify-between">
              <div>
                {/* Logo Canvas Preview */}
                <div className={`h-44 ${logo.previewBg} flex items-center justify-center p-6 transition-transform`}>
                  <div className="relative w-full h-16 max-w-[200px]">
                    <Image
                      src={logo.previewImg}
                      alt={logo.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="p-5 space-y-2">
                  <h3 className="text-sm font-extrabold text-zinc-950">{logo.title}</h3>
                  <p className="text-xs text-zinc-600 leading-relaxed">{logo.description}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-5 pt-0 grid grid-cols-2 gap-2.5">
                <a
                  href={logo.svgPath}
                  download
                  className="bg-zinc-900 hover:bg-zinc-800 text-white font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>SVG (Vector)</span>
                </a>
                <a
                  href={logo.pngPath}
                  download
                  className="bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border border-zinc-300 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-zinc-600" />
                  <span>PNG (Hi-Res)</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Color Palette */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-8">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-zinc-950 flex items-center gap-2">
            <span className="w-3.5 h-3.5 rounded-full bg-[#a32222]" />
            <span>Brand Color System</span>
          </h2>
          <p className="text-sm text-zinc-600">
            Click any color card to quickly copy its HEX or RGB value to your clipboard.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {BRAND_COLORS.map((col, idx) => (
            <div
              key={idx}
              onClick={() => copyToClipboard(col.hex, col.name)}
              className="bg-white border border-zinc-200 rounded-3xl overflow-hidden shadow-sm cursor-pointer group hover:border-zinc-400 hover:shadow-md transition-all"
            >
              {/* Color Block */}
              <div
                className="h-28 flex items-end justify-end p-3 transition-transform group-hover:scale-[1.02]"
                style={{ backgroundColor: col.hex }}
              >
                <span
                  className={`text-[10px] font-bold px-2 py-1 rounded-md backdrop-blur-md shadow-sm ${
                    col.isDark ? 'bg-black/40 text-white' : 'bg-white/70 text-zinc-900'
                  }`}
                >
                  {copiedHex === col.hex ? (
                    <span className="flex items-center gap-1">
                      <Check className="w-3 h-3 text-emerald-400" /> Copied
                    </span>
                  ) : (
                    'Click to Copy'
                  )}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <div>
                  <h3 className="text-xs font-black text-zinc-950">{col.name}</h3>
                  <p className="text-[11px] text-zinc-500">{col.role}</p>
                </div>

                <div className="pt-1 border-t border-zinc-100 space-y-1 text-[11px] font-mono">
                  <div className="flex justify-between text-zinc-800">
                    <span className="text-zinc-400">HEX:</span>
                    <span className="font-bold">{col.hex}</span>
                  </div>
                  <div className="flex justify-between text-zinc-600">
                    <span className="text-zinc-400">RGB:</span>
                    <span>{col.rgb}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Brand Guidelines: Do's and Don'ts */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 space-y-6">
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-zinc-950 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-[#a32222]" />
            <span>Trademark &amp; Logo Usage Guidelines</span>
          </h2>
          <p className="text-sm text-zinc-600">
            Please adhere to these guidelines to ensure consistency across digital publications and print media.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-6 rounded-3xl bg-emerald-50/70 border border-emerald-200/80 space-y-3">
            <div className="flex items-center gap-2 text-emerald-800 font-bold">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span className="text-base">Do:</span>
            </div>
            <ul className="space-y-2 text-emerald-950 list-disc list-inside">
              <li>Use the white wordmark on dark backgrounds and the black wordmark on light surfaces.</li>
              <li>Maintain proportional scaling without skewing, rotating, or distorting logo dimensions.</li>
              <li>Provide ample padding (at least 24px) around the logo away from busy graphics or typography.</li>
              <li>Spell the brand as <strong>&quot;Fittrock&quot;</strong> (Title Case) or <strong>&quot;FITTROCK&quot;</strong> in all-caps legal citations.</li>
            </ul>
          </div>

          <div className="p-6 rounded-3xl bg-rose-50/70 border border-rose-200/80 space-y-3">
            <div className="flex items-center gap-2 text-rose-800 font-bold">
              <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center font-black text-xs">✕</span>
              <span className="text-base">Don&apos;t:</span>
            </div>
            <ul className="space-y-2 text-rose-950 list-disc list-inside">
              <li>Do not alter the logo colors, apply drop shadows, or add outlines.</li>
              <li>Do not abbreviate as &quot;FitRock&quot; or spell with a single &apos;t&apos; (&quot;Fitrock&quot;).</li>
              <li>Do not place the black logo over low-contrast dark imagery.</li>
              <li>Do not incorporate the Fittrock logo into unofficial merchandise without written authorization.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Press Inquiry Form & Media Relations Contact */}
      <section id="press-inquiry" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-12 border border-zinc-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            
            {/* Left: Contact Info & Media Liaison */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-red-400">
                <Mail className="w-3.5 h-3.5" />
                <span>Media Relations Office</span>
              </div>

              <div className="space-y-3">
                <h2 className="text-2xl sm:text-3xl font-black text-white">
                  Get in Touch with Our Press Team
                </h2>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  For press interviews, high-resolution product review samples, executive commentary on ergonomics in Indian tech, or high-res studio photography, reach out directly.
                </p>
              </div>

              <div className="space-y-4 pt-2 text-xs sm:text-sm">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-900 text-[#a32222] border border-zinc-800">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-xs font-semibold">Press &amp; Media Inquiries</span>
                    <a href="mailto:press@fittrock.com" className="text-white font-bold hover:text-red-400 transition-colors">
                      press@fittrock.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-900 text-[#a32222] border border-zinc-800">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-xs font-semibold">Media Relations Hotline</span>
                    <a href="tel:+918087827905" className="text-white font-bold hover:text-red-400 transition-colors">
                      +91 80878 27905
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-zinc-900 text-[#a32222] border border-zinc-800">
                    <Building2 className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-zinc-500 block text-xs font-semibold">Registered Office &amp; Studio</span>
                    <span className="text-zinc-300">Office 610, 6th floor, Park Plaza, Lohegaon, Pune 411047</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Quick Press Inquiry Form */}
            <div className="bg-zinc-900/90 rounded-2xl p-6 sm:p-8 border border-zinc-800">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-12 h-12 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Press Inquiry Received!</h3>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto">
                    Thank you. Our communications team will review your deadline and respond promptly with assets or interview scheduling.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setPressForm({ name: '', outlet: '', email: '', deadline: '', inquiry: '' });
                    }}
                    className="text-xs text-red-400 font-bold hover:underline pt-2"
                  >
                    Submit another inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handlePressSubmit} className="space-y-4">
                  <h3 className="text-sm font-bold text-white mb-2">Request Press Interview / Review Sample</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rahul Sharma"
                        value={pressForm.name}
                        onChange={(e) => setPressForm({ ...pressForm, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                        Publication / Channel *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. TechSparks / YouTube"
                        value={pressForm.outlet}
                        onChange={(e) => setPressForm({ ...pressForm, outlet: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                        Official Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="journalist@publication.com"
                        value={pressForm.email}
                        onChange={(e) => setPressForm({ ...pressForm, email: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                        Editorial Deadline
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sep 10, 2026"
                        value={pressForm.deadline}
                        onChange={(e) => setPressForm({ ...pressForm, deadline: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                      Inquiry / Story Scope *
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Please mention your story topic, specific desk models needed for review, or interview questions..."
                      value={pressForm.inquiry}
                      onChange={(e) => setPressForm({ ...pressForm, inquiry: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-[#a32222] hover:bg-[#851622] disabled:opacity-50 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-[#a32222]/20 active:scale-98 transition-all"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Sending to Press Desk...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Submit Media Inquiry</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
