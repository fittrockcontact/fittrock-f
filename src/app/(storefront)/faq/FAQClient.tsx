'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, MessageCircle, Phone } from 'lucide-react';
import { faqsData } from '@/lib/faq-data';

export function FAQClient() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs =
    activeCategory === 'all'
      ? faqsData
      : faqsData.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 border-b border-zinc-800 pb-8 text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-300">
            <HelpCircle className="w-3.5 h-3.5 text-red-500" />
            <span>Help Center &amp; Frequently Asked Questions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-zinc-400 max-w-2xl">
            Everything you need to know about Fittrock standing desks, motor mechanics, tabletop sizes, shipping timelines, and warranty claims.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'all', label: 'All Questions' },
            { id: 'motors', label: 'Motors & Performance' },
            { id: 'assembly', label: 'Setup & Assembly' },
            { id: 'shipping', label: 'Delivery & Returns' },
            { id: 'warranty', label: 'Warranty & Claims' },
            { id: 'desks', label: 'Tabletops & B2B' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveCategory(tab.id);
                setOpenIndex(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeCategory === tab.id
                  ? 'bg-white text-zinc-950 shadow-md'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden transition-colors hover:border-zinc-700"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-white"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/50 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Live Support Help Box */}
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-base sm:text-lg font-bold text-white">Still have questions?</h3>
            <p className="text-xs sm:text-sm text-zinc-400">Our ergonomic specialists in Pune are ready to assist you on WhatsApp or phone.</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/918605591550"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-zinc-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>WhatsApp Us</span>
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs sm:text-sm border border-zinc-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Contact Page</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
