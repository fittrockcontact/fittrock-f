'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, ExternalLink, Clock, ShieldCheck, CheckCircle2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api-client';

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiFetch<{ success: boolean; message: string }>('/api/contact', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          message: formData.message.trim(),
        }),
      });

      if (res?.success) {
        setSubmitted(true);
        toast.success(res.message || 'Thank you! Our ergonomic support team in Pune will get in touch shortly.');
      } else {
        toast.error('Could not submit inquiry. Please try again or WhatsApp us directly.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit contact inquiry';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-16 sm:py-24 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 sm:space-y-20">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#a32222]/10 text-[#a32222] border border-[#a32222]/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Official Registered Office</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-950">
            FITTROCK ERGONOMICS LLP
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Need guidance on desk dimensions, bulk corporate ergonomics, or visit our Pune office? Reach out to our direct support team.
          </p>
        </div>

        {/* 4 Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Address */}
          <div className="bg-zinc-50 border border-zinc-200 shadow-sm p-6 rounded-3xl space-y-3 flex flex-col justify-between hover:border-zinc-900 transition-colors">
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 text-[#a32222] flex items-center justify-center shadow-xs">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-zinc-950">Registered Office</h3>
              <p className="text-xs text-zinc-600 leading-relaxed">
                Office no 610, 6th floor, Park Plaza, Porwal Rd, Lohegaon, Pune, Maharashtra 411047
              </p>
            </div>
            <a
              href="https://maps.app.goo.gl/cNpEwygy4a8zYUNj6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-[#a32222] hover:underline pt-2"
            >
              <span>Get Google Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 2: Phone */}
          <div className="bg-zinc-50 border border-zinc-200 shadow-sm p-6 rounded-3xl space-y-3 flex flex-col justify-between hover:border-zinc-900 transition-colors">
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 text-[#a32222] flex items-center justify-center shadow-xs">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-zinc-950">Direct Phone</h3>
              <p className="text-xs text-zinc-600">
                Mon - Sat: 9:30 AM to 7:00 PM
              </p>
            </div>
            <div className="space-y-1 pt-2">
              <a href="tel:+918087827905" className="text-xs font-bold text-zinc-900 hover:text-[#a32222] block">
                +91 80878 27905
              </a>
              <a href="tel:08087827905" className="text-xs text-zinc-500 hover:text-[#a32222] block">
                Alt: 08087827905
              </a>
            </div>
          </div>

          {/* Card 3: WhatsApp Support */}
          <div className="bg-zinc-50 border border-zinc-200 shadow-sm p-6 rounded-3xl space-y-3 flex flex-col justify-between hover:border-emerald-500 transition-colors">
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 text-[#25D366] flex items-center justify-center shadow-xs">
                <WhatsAppIcon className="w-5 h-5 fill-current" />
              </div>
              <h3 className="font-bold text-sm text-zinc-950">WhatsApp Chat</h3>
              <p className="text-xs text-zinc-600">
                Fast responses for product queries &amp; order updates.
              </p>
            </div>
            <a
              href="https://wa.me/918605591550?text=Hi%20Fittrock,%20I%20have%20an%20inquiry"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 hover:underline pt-2"
            >
              <span>+91 86055 91550</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Card 4: Email */}
          <div className="bg-zinc-50 border border-zinc-200 shadow-sm p-6 rounded-3xl space-y-3 flex flex-col justify-between hover:border-zinc-900 transition-colors">
            <div className="space-y-2.5">
              <div className="w-11 h-11 rounded-2xl bg-white border border-zinc-200 text-[#a32222] flex items-center justify-center shadow-xs">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-zinc-950">Official Email</h3>
              <p className="text-xs text-zinc-600">
                Corporate sales, partnerships &amp; support.
              </p>
            </div>
            <a
              href="mailto:contact@fittrock.com"
              className="text-xs font-bold text-[#a32222] hover:underline pt-2 block"
            >
              contact@fittrock.com
            </a>
          </div>
        </div>

        {/* Two Column Grid: Contact Form & Interactive Google Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Contact Form */}
          <div className="lg:col-span-6 bg-zinc-50 border border-zinc-200 shadow-sm rounded-3xl p-6 sm:p-10 space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl sm:text-2xl font-bold text-zinc-950">
                Send Us a Message
              </h2>
              <p className="text-xs text-zinc-600">
                Fill out the form below and our ergonomics engineers will reply within 2 hours.
              </p>
            </div>

            {submitted ? (
              <div className="text-center py-12 bg-white rounded-2xl border border-zinc-200 p-8 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-bold text-zinc-950">Message Sent Successfully!</h3>
                <p className="text-xs text-zinc-600 max-w-md mx-auto">
                  Thank you for contacting FITTROCK ERGONOMICS LLP. Our customer care representative will connect with you via email or phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Joshi"
                    className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@company.com"
                      className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 block mb-1">
                    Your Inquiry / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us what product or workspace setup you need help with..."
                    className="w-full bg-white border border-zinc-300 rounded-xl px-4 py-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-[#a32222] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-[#a32222] hover:bg-[#851622] disabled:opacity-50 text-white font-extrabold py-3.5 rounded-xl text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Inquiry...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Social Links Row */}
            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
              <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Follow Us:
              </span>
              <div className="flex items-center gap-2">
                <a
                  href="https://www.youtube.com/@FITTROCK"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:text-red-600 shadow-2xs transition-colors"
                  aria-label="YouTube"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/fittrock_"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:text-pink-600 shadow-2xs transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://www.facebook.com/fittrockindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:text-blue-600 shadow-2xs transition-colors"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>
                <a
                  href="https://wa.me/918605591550"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white border border-zinc-200 text-zinc-700 hover:text-[#25D366] shadow-2xs transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Embedded Google Map & Trust Badges */}
          <div className="lg:col-span-6 space-y-6">
            {/* Embedded Google Map */}
            <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-3 sm:p-4 shadow-sm overflow-hidden space-y-3">
              <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden border border-zinc-200 shadow-inner">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3781.1215697259995!2d73.90914607554177!3d18.61360096632529!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c7f739e0898f%3A0x7b298d5c227f62ff!2sFITTROCK%20ERGONOMICS%20LLP!5e0!3m2!1sen!2sin!4v1788133113428!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="FITTROCK ERGONOMICS LLP Pune Office Map"
                />
              </div>

              <div className="px-2 py-1 flex items-center justify-between text-xs text-zinc-600">
                <span className="font-semibold text-zinc-800">
                  GPS: 18.613601, 73.9091461
                </span>
                <a
                  href="https://maps.app.goo.gl/cNpEwygy4a8zYUNj6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-[#a32222] hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps App</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Trust & Certifications Box */}
            <div className="bg-gradient-to-br from-zinc-900 to-black text-white rounded-3xl p-6 sm:p-7 space-y-4 shadow-lg border border-zinc-800">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Certified Ergonomics &amp; Direct Manufacturing</span>
              </h3>

              <div className="grid grid-cols-2 gap-3 text-xs text-zinc-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>ISO 9001:2015 Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>3-Year Onsite Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>100% Free All-India Shipping</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>GST Invoice Available</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
