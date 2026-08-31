'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api-client';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiFetch<{ success: boolean; message: string }>('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
      });

      if (res?.success) {
        setSubscribed(true);
        toast.success(res.message || 'Thank you for subscribing to Fittrock updates!');
        setEmail('');
      } else {
        toast.error('Subscription could not be processed. Please try again.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Subscription failed';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-zinc-900 border-y border-zinc-800 text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
          
          {/* Subtle Background Accent */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Left Text */}
          <div className="space-y-3 text-center lg:text-left max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#a32222]/20 border border-[#a32222]/30 text-[#f87171] text-xs font-semibold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ergonomics Newsletter</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Stay ahead in workplace ergonomics
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
              Subscribe to receive posture guides, special desk upgrade discounts, new product launch alerts, and B2B corporate tax-saving insights.
            </p>
          </div>

          {/* Right Input Form */}
          <div className="w-full lg:max-w-md">
            {subscribed ? (
              <div className="bg-zinc-900/90 border border-emerald-500/40 rounded-2xl p-4 flex items-center gap-3 text-emerald-400">
                <CheckCircle2 className="w-6 h-6 shrink-0" />
                <p className="text-xs sm:text-sm font-medium">
                  You are subscribed! Look out for exclusive ergonomic offers in your inbox.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                <div className="relative flex-1">
                  <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your work or personal email"
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-[#a32222] focus:ring-1 focus:ring-[#a32222]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#a32222] hover:bg-[#851622] disabled:opacity-50 text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-lg transition-all shrink-0 flex items-center justify-center gap-2 active:scale-98"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Joining...</span>
                    </>
                  ) : (
                    <span>Subscribe</span>
                  )}
                </button>
              </form>
            )}
            <p className="text-[11px] text-zinc-500 mt-2.5 text-center lg:text-left">
              Zero spam. Unsubscribe anytime in one click.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
