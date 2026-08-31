'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
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

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-800 pt-2 sm:pt-4 pb-2 sm:pb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10">

          {/* Col 1 & 2: Brand & Official Registered Office */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center group">
              <Image
                src="/wordart-logo-white-color.svg"
                alt="FITTROCK Ergonomics"
                width={160}
                height={50}
                className="h-9 sm:h-10 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-md">
              <strong className="text-white font-bold">FITTROCK ERGONOMICS LLP</strong> — India&apos;s leading manufacturer of high-precision electric dual-motor height-adjustable standing desks, ergonomic lumbar mesh chairs, and workplace wellness solutions.
            </p>

            {/* Address & Quick Contacts */}
            <div className="space-y-2.5 pt-2 text-xs text-zinc-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#a32222] shrink-0 mt-0.5" />
                <a
                  href="https://maps.app.goo.gl/cNpEwygy4a8zYUNj6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors leading-relaxed group"
                >
                  <span>Office no 610, 6th floor, Park Plaza, Porwal Rd, Lohegaon, Pune, Maharashtra 411047</span>
                  <ExternalLink className="w-3 h-3 inline-block ml-1 text-zinc-500 group-hover:text-white" />
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-1">
                <a href="tel:+918087827905" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Phone className="w-3.5 h-3.5 text-[#a32222]" />
                  <span>+91 80878 27905</span>
                </a>

                <a href="https://wa.me/918605591550" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors">
                  <WhatsAppIcon className="w-3.5 h-3.5 fill-current" />
                  <span>+91 86055 91550</span>
                </a>

                <a href="mailto:contact@fittrock.com" className="flex items-center gap-1.5 hover:text-white transition-colors">
                  <Mail className="w-3.5 h-3.5 text-[#a32222]" />
                  <span>contact@fittrock.com</span>
                </a>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2 flex items-center gap-3">
              <a
                href="https://www.youtube.com/@FITTROCK"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube Channel"
                className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-red-600 text-zinc-300 hover:text-white border border-zinc-800 flex items-center justify-center transition-all shadow-sm"
              >
                <YouTubeIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/fittrock_"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-pink-600 text-zinc-300 hover:text-white border border-zinc-800 flex items-center justify-center transition-all shadow-sm"
              >
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/fittrockindia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Page"
                className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-blue-600 text-zinc-300 hover:text-white border border-zinc-800 flex items-center justify-center transition-all shadow-sm"
              >
                <FacebookIcon className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/918605591550"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Support"
                className="w-9 h-9 rounded-xl bg-zinc-900 hover:bg-[#25D366] text-zinc-300 hover:text-white border border-zinc-800 flex items-center justify-center transition-all shadow-sm"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Products & Gear */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Products</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/collections/standing-desks" className="hover:text-white transition-colors py-0.5 block">
                  KUBER Dual Motor
                </Link>
              </li>
              <li>
                <Link href="/collections/standing-desks" className="hover:text-white transition-colors py-0.5 block">
                  RATI Single Motor
                </Link>
              </li>
              <li>
                <Link href="/collections/ergonomic-chairs" className="hover:text-white transition-colors py-0.5 block">
                  Lumbar Mesh Chairs
                </Link>
              </li>
              <li>
                <Link href="/collections/desk-accessories" className="hover:text-white transition-colors py-0.5 block">
                  Solid Wooden Tops
                </Link>
              </li>
              <li>
                <Link href="/collections/desk-accessories" className="hover:text-white transition-colors py-0.5 block">
                  Gas-Spring Arms
                </Link>
              </li>
              <li>
                <Link href="/collections/desk-accessories" className="hover:text-white transition-colors py-0.5 block">
                  Cable Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Company Pages */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors py-0.5 block">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors py-0.5 block">
                  Experience Studio
                </Link>
              </li>
              <li>
                <Link href="/authors" className="hover:text-white transition-colors py-0.5 block">
                  Ergonomics Team
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-white transition-colors py-0.5 block">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/pricing-payments" className="hover:text-white transition-colors py-0.5 block">
                  Payment Terms
                </Link>
              </li>
              <li>
                <Link href="/media-kit" className="hover:text-white transition-colors py-0.5 block">
                  Media Kit &amp; Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors py-0.5 block">
                  Contact &amp; Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">Resources</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/faq" className="hover:text-white transition-colors py-0.5 block">
                  Help Center &amp; FAQ
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors py-0.5 block">
                  Ergo Lab Blog
                </Link>
              </li>
              <li>
                <a href="https://www.youtube.com/@FITTROCK" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors py-0.5 block">
                  Video Guides &amp; Demos
                </a>
              </li>
              <li>
                <Link href="/account" className="hover:text-white transition-colors py-0.5 block">
                  Customer Account
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="hover:text-white transition-colors py-0.5 block">
                  Track Delivery SLA
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors py-0.5 block">
                  Posture &amp; Safety
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal Secondary Navigation Bar */}
        <div className="border-t border-zinc-900 pt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[11px] text-zinc-400">
          <Link href="/warranty" className="hover:text-zinc-200 transition-colors">Warranty Policy</Link>
          <span>•</span>
          <Link href="/refund" className="hover:text-zinc-200 transition-colors">Refund &amp; Cancellation</Link>
          <span>•</span>
          <Link href="/returns" className="hover:text-zinc-200 transition-colors">Return &amp; Exchange</Link>
          <span>•</span>
          <Link href="/shipping" className="hover:text-zinc-200 transition-colors">Shipping &amp; Delivery</Link>
          <span>•</span>
          <Link href="/terms" className="hover:text-zinc-200 transition-colors">Terms of Service</Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-zinc-200 transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link href="/cookies" className="hover:text-zinc-200 transition-colors">Cookie Policy</Link>
          <span>•</span>
          <Link href="/disclaimer" className="hover:text-zinc-200 transition-colors">Disclaimer</Link>
          <span>•</span>
          <Link href="/accessibility" className="hover:text-zinc-200 transition-colors">Accessibility</Link>
          <span>•</span>
          <Link href="/pricing-payments" className="hover:text-zinc-200 transition-colors">Payment Terms</Link>
          <span>•</span>
          <Link href="/grievance-redressal" className="hover:text-zinc-200 transition-colors">Grievance Desk</Link>
        </div>

        {/* Bottom Bar with LLP & Copyright */}
        <div className="border-t border-zinc-900 pt-1 flex flex-col items-center justify-center gap-2 text-xs text-zinc-500 text-center">
          <p>© {new Date().getFullYear()} <strong className="text-zinc-300 font-medium">FITTROCK ERGONOMICS LLP</strong>. All rights reserved.</p>
          <p className="text-[11px] text-zinc-600">Compliant with Consumer Protection (E-Commerce) Rules, 2020 &amp; Information Technology Act, 2000.</p>
        </div>
      </div>
    </footer>
  );
}
