'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageSquareText, X, Bot, Sparkles, Send, ArrowRight, RotateCcw, ChevronRight, HelpCircle, Phone } from 'lucide-react';
import Link from 'next/link';

interface QAItem {
  id: string;
  category: string;
  question: string;
  shortLabel: string;
  answer: string;
  actionText?: string;
  actionUrl?: string;
}

const PREDEFINED_QA: QAItem[] = [
  {
    id: 'diff-motors',
    category: 'Desks & Motors',
    shortLabel: 'Dual Motor vs Single Motor',
    question: 'What is the difference between KUBER (Dual Motor) and RATI (Single Motor)?',
    answer:
      'The KUBER Dual Motor features two synchronized motors with 125kg load capacity, faster 35mm/s lift speed, and 6-axis gyro anti-collision. The RATI Single Motor is our value champion with 80kg capacity, 25mm/s speed, and whisper-quiet motor operation for daily work-from-home setups.',
    actionText: 'Compare Desk Collections',
    actionUrl: '/collections/standing-desks',
  },
  {
    id: 'warranty',
    category: 'Warranty & Peace of Mind',
    shortLabel: '3-Year Warranty Details',
    question: 'What does the 3-Year Warranty cover and how do I claim it?',
    answer:
      'Every Fittrock desk includes a comprehensive 3-Year Onsite Warranty covering all electric motors, control boxes, memory hand controllers, and steel leg columns. In case of any issue, our support team dispatches replacement components within 24-48 hours.',
    actionText: 'View Warranty Policy',
    actionUrl: '/terms',
  },
  {
    id: 'delivery',
    category: 'Shipping & Delivery',
    shortLabel: 'Delivery Times & Shipping',
    question: 'How long does shipping take and is delivery free across India?',
    answer:
      'Yes! We provide 100% Free Doorstep Delivery across 19,000+ pincodes in India. Metro orders are delivered within 2-4 business days, and non-metro locations within 4-7 business days with real-time tracking.',
    actionText: 'Track Shipping Policy',
    actionUrl: '/shipping',
  },
  {
    id: 'installation',
    category: 'Assembly & Setup',
    shortLabel: 'DIY Installation & Support',
    question: 'Is assembly easy to do myself? Do you provide installation support?',
    answer:
      'Yes! All Fittrock desks come with pre-drilled tabletop holes, labeled toolkits (Allen keys & screws included), and a step-by-step video guide. Setup takes just 15-20 minutes. Video call installation assistance is also available on request.',
    actionText: 'Watch Assembly Video',
    actionUrl: 'https://www.youtube.com/@FITTROCK/videos',
  },
  {
    id: 'no-cost-emi',
    category: 'Payments & EMI',
    shortLabel: 'No-Cost EMI Options',
    question: 'How do I avail No-Cost EMI on my order?',
    answer:
      'We offer 0% interest No-Cost EMI across major banks (HDFC, ICICI, Axis, SBI, Kotak, Amex) and credit cards for up to 6 months at checkout via our secure payment gateway.',
    actionText: 'Go to Checkout',
    actionUrl: '/cart',
  },
  {
    id: 'tabletop-specs',
    category: 'Materials & Durability',
    shortLabel: 'Tabletop Material & Sizes',
    question: 'What materials are used for tabletop surfaces?',
    answer:
      'Our tabletops are engineered with high-density E0-grade CARB-certified moisture-resistant MDF, finished with scratch-resistant, spill-proof thermal laminate and ergonomic beveled edges.',
    actionText: 'Try Desk Configurator',
    actionUrl: '/#configurator',
  },
];

interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actionText?: string;
  actionUrl?: string;
}

export function ErgoFaqChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-1',
      sender: 'bot',
      text: '👋 Hi there! Welcome to Fittrock Ergonomics. Ask me any question below for immediate answers on desks, warranty, or delivery!',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSelectQuestion = (qa: QAItem) => {
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: qa.question,
    };

    const botMsg: ChatMessage = {
      id: `bot-${Date.now() + 1}`,
      sender: 'bot',
      text: qa.answer,
      actionText: qa.actionText,
      actionUrl: qa.actionUrl,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: 'bot',
        text: '👋 What else can I help you with today? Choose any question below!',
      },
    ]);
  };

  return (
    <>
      {/* Floating Bottom-Left Button */}
      <div className="fixed bottom-3 left-3 sm:bottom-7 sm:left-7 z-50 flex flex-col items-start gap-2.5 pointer-events-auto">
        {/* Interactive Chat Bubble (if chat is closed) */}
        {!isOpen && showNotification && (
          <div className="hidden sm:block relative bg-zinc-900 text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-zinc-700/80 max-w-[240px] text-xs font-medium leading-snug animate-in fade-in slide-in-from-bottom-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowNotification(false);
              }}
              className="absolute -top-2 -right-2 bg-zinc-700 hover:bg-zinc-600 text-white rounded-full p-1 shadow"
              title="Dismiss"
              aria-label="Dismiss FAQ tooltip"
            >
              <X className="w-3 h-3" />
            </button>
            <div
              onClick={() => setIsOpen(true)}
              className="cursor-pointer hover:text-amber-400 transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>
                Need quick answers? <strong className="font-bold text-white underline">Instant FAQ Chat</strong>
              </span>
            </div>
          </div>
        )}

        {/* Floating Button Icon */}
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            setShowNotification(false);
          }}
          aria-label="Open Instant FAQ & Help Chat"
          className="relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-[#032e33] via-[#054950] to-[#0d6e79] hover:brightness-110 text-white shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-teal-400/40 group"
        >
          {isOpen ? (
            <X className="w-7 h-7 sm:w-8 sm:h-8" />
          ) : (
            <>
              <Bot className="w-7 h-7 sm:w-8 sm:h-8 text-teal-200 group-hover:text-white transition-colors" />
              <span className="absolute -top-1 -right-1 bg-amber-500 text-zinc-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                FAQ
              </span>
            </>
          )}
        </button>
      </div>

      {/* Floating Chat Modal Box */}
      {isOpen && (
        <div className="fixed bottom-20 left-3 sm:bottom-28 sm:left-7 z-50 w-[calc(100vw-24px)] sm:w-[380px] md:w-[410px] max-h-[580px] h-[80vh] sm:h-[560px] bg-white rounded-3xl shadow-2xl border border-zinc-200/90 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#032e33] via-[#054950] to-[#043d44] text-white p-4 sm:p-5 flex items-center justify-between shadow-md shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-teal-300">
                  <Bot className="w-6 h-6" />
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#032e33]" />
              </div>
              <div>
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  Fittrock Instant Help
                </h3>
                <p className="text-[11px] text-teal-200 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Instant Q&amp;A Assistant
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleReset}
                title="Reset conversation"
                aria-label="Reset conversation"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chat"
                aria-label="Close chat"
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-zinc-50/70 text-xs sm:text-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-full bg-teal-900 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Bot className="w-4 h-4 text-teal-300" />
                  </div>
                )}

                <div
                  className={`p-3.5 rounded-2xl max-w-[82%] leading-relaxed shadow-xs ${
                    msg.sender === 'user'
                      ? 'bg-[#054950] text-white rounded-br-none font-medium'
                      : 'bg-white text-zinc-800 border border-zinc-200/80 rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>

                  {msg.actionText && msg.actionUrl && (
                    <div className="mt-2.5 pt-2 border-t border-zinc-100">
                      {msg.actionUrl.startsWith('http') ? (
                        <a
                          href={msg.actionUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#054950] hover:underline"
                        >
                          <span>{msg.actionText}</span>
                          <ArrowRight className="w-3 h-3" />
                        </a>
                      ) : (
                        <Link
                          href={msg.actionUrl}
                          onClick={() => setIsOpen(false)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-[#054950] hover:underline"
                        >
                          <span>{msg.actionText}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick FAQ Question Selectors */}
          <div className="p-3.5 bg-white border-t border-zinc-200 space-y-2 shrink-0">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-1">
                <HelpCircle className="w-3 h-3 text-[#054950]" />
                Select a Question:
              </span>
              <a
                href="https://wa.me/918605591550?text=Hi%20Fittrock,%20I%20have%20a%20question"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-[#25D366] hover:underline flex items-center gap-1"
              >
                <Phone className="w-3 h-3" />
                Live Agent
              </a>

            </div>

            <div className="max-h-40 overflow-y-auto space-y-1.5 pr-1 no-scrollbar">
              {PREDEFINED_QA.map((qa) => (
                <button
                  key={qa.id}
                  onClick={() => handleSelectQuestion(qa)}
                  className="w-full text-left px-3 py-2 rounded-xl bg-zinc-50 hover:bg-teal-50 border border-zinc-200/80 hover:border-teal-300 text-zinc-800 hover:text-[#054950] transition-colors flex items-center justify-between gap-2 text-xs font-semibold group"
                >
                  <span className="line-clamp-1">{qa.shortLabel}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-[#054950] shrink-0" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
