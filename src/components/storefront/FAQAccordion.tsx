'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'How quiet are the electric dual motors?',
      answer:
        'Fittrock dual-motor desks operate under 42 dB—quieter than a whisper. Transitions between seated and standing height take less than 6 seconds without disturbing calls or video meetings.',
    },
    {
      question: 'What is the weight capacity of the standing desk frame?',
      answer:
        'Our heavy-duty steel frame is rated for 125 kg (275 lbs) lifting capacity, allowing you to easily support triple monitors, studio speakers, desktop CPUs, and heavy peripherals.',
    },
    {
      question: 'Does the desk come with an anti-collision safety system?',
      answer:
        'Yes! Every Fittrock standing desk includes 6-axis gyro anti-collision technology. If the desk contacts an obstacle (like a chair armrest or drawer) while lowering, it automatically stops and reverses 2cm.',
    },
    {
      question: 'How long does shipping take and is assembly included?',
      answer:
        'We offer free express delivery within 3-5 business days across India. Desks come with a pre-wired control box and numbered assembly guide. Toolkits and screws are included.',
    },
    {
      question: 'What warranty coverage is included?',
      answer:
        'Every Fittrock desk frame is backed by our industry-leading 10-Year Structural Warranty, and electric motors/control boxes are covered by a 5-Year Replacement Warranty.',
    },
  ];

  return (
    <section className="py-20 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl font-extrabold text-zinc-900">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-zinc-200 shadow-sm rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-bold text-zinc-900 hover:text-amber-600 transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-600 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-zinc-600 text-sm leading-relaxed border-t border-zinc-100 pt-4">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
