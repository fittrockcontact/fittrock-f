import React from 'react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';

export function TestimonialSection() {
  const reviews = [
    {
      name: 'Dr. Siddharth Menon',
      role: 'Software Architect & Remote Worker',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      comment:
        'Switching to the Fittrock Pro standing desk eliminated my 4 PM lower back stiffness. The dual motors are so silent my team does not hear height transitions during Zoom calls.',
      rating: 5,
    },
    {
      name: 'Ananya Roy',
      role: 'Lead UX Designer',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
      comment:
        'The solid natural oak top feels extremely premium. Assembly was super simple and the cable spine keeps my setup 100% wire-free.',
      rating: 5,
    },
    {
      name: 'Karan Malhotra',
      role: 'Founder & Tech Lead',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      comment:
        'Equipped our entire studio with 12 Fittrock desks. 10/10 build quality, fast delivery, and the 10-year frame warranty gives us complete peace of mind.',
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-zinc-50 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5" />
            <span>Verified Customer Stories</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Trusted By 10,000+ Active Professionals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, idx) => (
            <div
              key={idx}
              className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-8 space-y-6 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-zinc-700 text-sm leading-relaxed italic">&ldquo;{rev.comment}&rdquo;</p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-zinc-200">
                <img
                  src={rev.avatar}
                  alt={rev.name}
                  className="w-11 h-11 rounded-full object-cover border border-amber-500/40"
                />
                <div>
                  <h4 className="font-bold text-sm text-zinc-900 flex items-center gap-1.5">
                    <span>{rev.name}</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </h4>
                  <p className="text-xs text-zinc-500">{rev.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
