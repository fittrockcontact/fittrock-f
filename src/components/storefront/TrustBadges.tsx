import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react';

export function TrustBadges() {
  const badges = [
    {
      icon: ShieldCheck,
      title: '10-Year Warranty',
      description: 'Comprehensive warranty on steel frames & motors.',
    },
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'Free doorstep delivery on orders above ₹5,000.',
    },
    {
      icon: RotateCcw,
      title: '30-Day Trial',
      description: 'Hassle-free 30-day return policy.',
    },
    {
      icon: Award,
      title: 'ISO Certified',
      description: 'BIFMA X5.5 & ISO 9001 certified stability.',
    },
  ];

  return (
    <section className="bg-zinc-50 border-y border-zinc-200 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div key={idx} className="flex flex-col sm:flex-row items-start gap-3 p-3.5 sm:p-4 rounded-xl bg-white border border-zinc-200 shadow-sm">
                <div className="p-2.5 sm:p-3 bg-amber-500/10 border border-amber-500/20 text-amber-700 rounded-xl shrink-0">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-zinc-900 text-xs sm:text-sm mb-1">{badge.title}</h4>
                  <p className="text-zinc-600 text-[11px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-none">{badge.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

