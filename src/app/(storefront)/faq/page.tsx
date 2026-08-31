'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { HelpCircle, ChevronDown, Sparkles, MessageCircle, Phone, Mail } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'desks' | 'motors' | 'shipping' | 'warranty' | 'assembly';
}

const faqs: FAQItem[] = [
  {
    category: 'motors',
    question: 'What is the difference between Dual Motor (KUBER) and Single Motor (RATI)?',
    answer: 'Dual Motor desks feature synchronized German-spec motors in each leg, offering a 125 kg weight capacity, faster 35mm/s transit, enhanced stability at maximum 1190mm height, and whisper-quiet (<42 dB) operation. Single Motor desks feature one motor connected via a hex driveshaft with an 80 kg weight capacity and 25mm/s speed, ideal for compact or budget-friendly home workstations.',
  },
  {
    category: 'motors',
    question: 'How loud are Fittrock motorized desks during height transition?',
    answer: 'Fittrock dual-motor desks operate under 42 dB—quieter than a normal library whisper. Transitions between seated (710mm) and standing (1190mm) height take less than 6 seconds without disturbing calls or video meetings.',
  },
  {
    category: 'assembly',
    question: 'How difficult is the desk assembly? Do tabletops have pre-drilled holes?',
    answer: 'Setup is beginner-friendly and takes just 15 to 20 minutes. All Fittrock solid engineered wood tabletops come with precision CNC pre-drilled threaded insert holes. Every desk box includes labeled Allen keys, screws, cable clips, and a step-by-step video guide.',
  },
  {
    category: 'shipping',
    question: 'Do you offer free delivery across India? How long does shipping take?',
    answer: 'Yes! All motorized standing desks qualify for 100% Free Express Shipping across 19,000+ pin codes. Orders are dispatched from our Pune manufacturing facility within 24 hours. Metros receive delivery in 3 to 5 business days, while other locations take 5 to 7 days.',
  },
  {
    category: 'warranty',
    question: 'What does the 3-Year Motor and 10-Year Frame Warranty cover?',
    answer: 'Our 10-Year Frame Warranty covers all structural cold-rolled steel columns, legs, and feet against bending or weld failure. The 3-Year Electrical Warranty covers motors, control box circuit boards, power transformers, and the LED digital memory handset.',
  },
  {
    category: 'shipping',
    question: 'What is your 30-Day Trial & Return Policy?',
    answer: 'We offer a 30-Day Risk-Free Trial. If you are not satisfied with your ergonomic standing desk, contact us within 30 days of delivery. We will arrange a doorstep reverse pickup and refund your purchase amount back to your original bank/UPI account.',
  },
  {
    category: 'desks',
    question: 'Can I use my own custom tabletop with Fittrock desk frames?',
    answer: 'Yes! You can purchase the KUBER or RATI frame standalone. Our telescoping steel frames adjust horizontally from 1000mm to 1600mm, accommodating custom wooden tabletops between 1100mm and 2000mm in length and 600mm to 850mm in depth.',
  },
  {
    category: 'desks',
    question: 'Do you provide B2B GST tax invoices for claiming Input Tax Credit (ITC)?',
    answer: 'Yes! During checkout, enter your company name and 15-digit GSTIN. An official digitally-signed GST Tax Invoice with our GSTIN will be automatically generated and emailed to you for claiming 18% Input Tax Credit.',
  },
];

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const filteredFaqs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(f => f.category === activeCategory);

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
