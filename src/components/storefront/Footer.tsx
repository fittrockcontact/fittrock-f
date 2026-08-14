'use client';

import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-50 text-zinc-600 border-t border-zinc-200 pt-10 sm:pt-16 pb-8 sm:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-16">
          {/* Col 1: Brand (Full width on small phones) */}
          <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center font-black text-zinc-950 text-xl tracking-tighter">
                F
              </div>
              <span className="font-extrabold text-xl tracking-tight text-zinc-900">
                FITT<span className="text-amber-600">ROCK</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed max-w-sm">
              Engineered for dynamic work. Custom electric dual-motor standing desks and precision ergonomics designed for ultimate daily focus and long-term spinal health.
            </p>
          </div>

          {/* Col 2: Shop */}
          <div className="col-span-1 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/collections/standing-desks" className="hover:text-amber-600 transition-colors py-1 block">
                  Motorized Desks
                </Link>
              </li>
              <li>
                <Link href="/collections/ergonomic-chairs" className="hover:text-amber-600 transition-colors py-1 block">
                  Mesh Chairs
                </Link>
              </li>
              <li>
                <Link href="/collections/desk-accessories" className="hover:text-amber-600 transition-colors py-1 block">
                  Monitor Arms
                </Link>
              </li>
              <li>
                <Link href="/collections/desk-accessories" className="hover:text-amber-600 transition-colors py-1 block">
                  Cable Trays
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Customer Care & Policies */}
          <div className="col-span-1 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wider">Policies & Help</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <Link href="/shipping" className="hover:text-amber-600 transition-colors py-1 block">
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link href="/refund" className="hover:text-amber-600 transition-colors py-1 block">
                  30-Day Guarantee
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-600 transition-colors py-1 block">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-amber-600 transition-colors py-1 block">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/testimonials" className="hover:text-amber-600 transition-colors py-1 block">
                  Customer Reviews
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-600 transition-colors py-1 block">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter (Full width on mobile) */}
          <div className="col-span-2 md:col-span-1 space-y-3 sm:space-y-4">
            <h4 className="text-xs sm:text-sm font-bold text-zinc-900 uppercase tracking-wider">Stay In Motion</h4>
            <p className="text-xs sm:text-sm text-zinc-600">
              Subscribe for ergonomic tips, posture guides, and exclusive discount codes.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white border border-zinc-300 rounded-xl px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-amber-500 flex-1 min-h-[44px]"
              />
              <button
                type="submit"
                className="bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-4 py-2.5 rounded-xl text-sm transition-colors min-h-[44px]"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-zinc-200 pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-zinc-500 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Fittrock Ergonomics. All rights reserved.</p>
          <div className="flex gap-4">
            <span>Official Storefront</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

