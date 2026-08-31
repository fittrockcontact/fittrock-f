'use client';

import React, { useState } from 'react';
import { ChevronDown, Check, Copy } from 'lucide-react';
import { toast } from 'sonner';

interface OfferCard {
  category: string;
  title: string;
  subtitle?: string;
  code?: string;
  logoType?: 'icici' | 'upi' | 'none';
  expiry: string;
  terms: string[];
}

export function FeatureSpotlight() {
  const [selectedTerms, setSelectedTerms] = useState<OfferCard | null>(null);

  const offers: OfferCard[] = [
    {
      category: 'ICICI BANK CREDIT CARD',
      title: 'Flat 5% Off upto Rs 1,500/-',
      subtitle: 'On ICICI Credit Card',
      logoType: 'icici',
      expiry: 'Expired',
      terms: [
        'Valid on ICICI Bank Credit Card non-EMI & EMI transactions.',
        'Minimum cart value of ₹15,000 required.',
        'Discount capped at maximum ₹1,500 per card.',
        'Cannot be combined with other promotional codes.',
      ],
    },
    {
      category: 'EXCLUSIVE',
      title: '₹500 off with code STAYFIT',
      code: 'STAYFIT',
      logoType: 'none',
      expiry: 'Expired',
      terms: [
        'Use coupon code STAYFIT during checkout.',
        'Valid on all dual-motor and single-motor standing desks.',
        'Flat discount of ₹500 applied at cart summary.',
        'One-time use per customer account.',
      ],
    },
    {
      category: 'UPI PAYMENT',
      title: '₹500 off with UPI Payment',
      logoType: 'upi',
      expiry: 'Expired',
      terms: [
        'Instant ₹500 discount on paying via any UPI app (GPay, PhonePe, Paytm, BHIM).',
        'Applicable on orders above ₹10,000.',
        'Auto-applied on checkout payment screen when selecting UPI.',
      ],
    },
  ];

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success(`Coupon code ${code} copied to clipboard!`);
  };

  return (
    <section className="py-16 sm:py-24 bg-black text-white border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header Content */}
        <div className="text-center max-w-4xl mx-auto space-y-4 sm:space-y-5">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
            Why Choose Fittrock ?
          </h2>
          <p className="text-zinc-300 text-xs sm:text-sm md:text-base leading-relaxed max-w-3xl mx-auto font-normal">
            Fittrock Products are built with rock-solid quality and engineered for long-lasting performance. Our products are BIFMA-certified, meeting the highest international standards for durability, safety, stability, and ergonomic excellence.
          </p>
        </div>

        {/* Certification Logos Row */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14 opacity-90">
          {/* BIFMA SGS */}
          <div className="flex items-center gap-2 text-white">
            <span className="font-black text-lg sm:text-xl tracking-wider font-sans">BIFMA</span>
            <span className="text-zinc-500 font-light">|</span>
            <span className="font-bold text-base sm:text-lg tracking-widest text-zinc-300">SGS</span>
          </div>

          {/* ECHA */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="font-black text-lg sm:text-xl tracking-widest">ECHA</span>
            </div>
            <span className="text-[7px] sm:text-[8px] uppercase tracking-widest text-zinc-400 font-semibold">
              European Chemicals Agency
            </span>
          </div>

          {/* ISO */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-white/40 flex items-center justify-center p-1">
              <svg viewBox="0 0 24 24" className="w-full h-full fill-none stroke-current stroke-1">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
            </div>
            <span className="font-black text-lg sm:text-2xl tracking-widest">ISO</span>
          </div>

          {/* ECHA 2 / RoHS */}
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1">
              <span className="font-black text-lg sm:text-xl tracking-widest">ECHA</span>
            </div>
            <span className="text-[7px] sm:text-[8px] uppercase tracking-widest text-zinc-400 font-semibold">
              European Chemicals Agency
            </span>
          </div>

          {/* ATC FOUNDATION */}
          <div className="flex flex-col items-center justify-center border border-white/40 px-2 py-1 rounded">
            <span className="font-black text-xs sm:text-sm tracking-wider leading-none">ATC</span>
            <span className="text-[7px] font-bold tracking-widest uppercase text-zinc-300 leading-tight">
              Foundation
            </span>
          </div>

          {/* ASTM */}
          <div className="flex items-center gap-1 text-white">
            <span className="font-black text-xl sm:text-2xl italic tracking-tighter font-serif">ASTM</span>
            <span className="text-[8px] font-bold tracking-widest uppercase text-zinc-400 block -mt-2">INTERNATIONAL</span>
          </div>
        </div>

        {/* Voucher / Coupon Tickets Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6 pt-4">
          {offers.map((offer, idx) => (
            <div
              key={idx}
              className="relative flex items-stretch rounded-2xl overflow-hidden shadow-xl bg-white text-zinc-900 min-h-[140px] group transition-transform hover:-translate-y-0.5"
            >
              {/* Red Left Ticket Stub with Punch Cutout */}
              <div className="relative w-14 sm:w-16 bg-[#b91c1c] shrink-0 flex items-center justify-center">
                {/* Circular cutout on left edge */}
                <div className="absolute -left-3.5 w-7 h-7 rounded-full bg-black" />
                {/* Vertical dashed dividing line on right edge */}
                <div className="absolute right-0 top-0 bottom-0 border-r-2 border-dashed border-amber-300/40" />
              </div>

              {/* White Right Ticket Body */}
              <div className="flex-1 p-4 sm:p-5 flex flex-col justify-between bg-white">
                {/* Top Row: Category & Brand Logo */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider text-zinc-500">
                    {offer.category}
                  </span>

                  {offer.logoType === 'icici' && (
                    <div className="flex items-center gap-1 bg-[#d71920] px-2 py-0.5 rounded text-[10px] font-extrabold text-white tracking-tight">
                      <span className="italic font-bold">i</span>
                      <span>ICICI Bank</span>
                    </div>
                  )}

                  {offer.logoType === 'upi' && (
                    <div className="flex items-center gap-0.5 text-zinc-800 font-black text-xs tracking-tight">
                      <span>UPI</span>
                      <span className="text-[#00875a]">▶</span>
                    </div>
                  )}
                </div>

                {/* Offer Title & Subtitle */}
                <div className="my-2">
                  <h4 className="text-sm sm:text-base font-bold text-zinc-950 leading-tight">
                    {offer.title}
                  </h4>
                  {offer.subtitle && (
                    <p className="text-xs sm:text-sm font-bold text-zinc-900 leading-tight mt-0.5">
                      {offer.subtitle}
                    </p>
                  )}
                  {offer.code && (
                    <button
                      onClick={() => copyCode(offer.code!)}
                      className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded border border-amber-200"
                    >
                      <span>CODE: {offer.code}</span>
                      <Copy className="w-3 h-3 ml-0.5" />
                    </button>
                  )}
                </div>

                {/* Bottom Row: Expiry & T&C Action */}
                <div className="flex items-center justify-between text-xs text-zinc-600 pt-2 border-t border-zinc-100">
                  <span className="text-[11px]">
                    Ends in <strong className="font-bold text-zinc-900">{offer.expiry}</strong>
                  </span>
                  <button
                    onClick={() => setSelectedTerms(offer)}
                    className="flex items-center gap-1 text-[11px] font-bold text-zinc-800 hover:text-zinc-950 transition-colors"
                  >
                    <span>See T&C</span>
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Terms & Conditions Modal */}
      {selectedTerms && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-zinc-900 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 border border-zinc-200">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  {selectedTerms.category}
                </span>
                <h3 className="text-lg font-bold text-zinc-900 mt-1">{selectedTerms.title}</h3>
              </div>
              <button
                onClick={() => setSelectedTerms(null)}
                className="text-zinc-400 hover:text-zinc-700 p-1 rounded-lg"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2 text-xs sm:text-sm text-zinc-600">
              <h4 className="font-bold text-zinc-900">Terms & Conditions:</h4>
              <ul className="list-disc pl-5 space-y-1">
                {selectedTerms.terms.map((t, idx) => (
                  <li key={idx}>{t}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedTerms(null)}
                className="w-full py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-bold rounded-xl text-xs transition-colors"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
