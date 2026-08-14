import React from 'react';
import { Cpu, ShieldCheck, Zap, Volume2, Award, Sparkles } from 'lucide-react';

export function FeatureSpotlight() {
  const features = [
    {
      icon: Cpu,
      title: 'Smart 4-Preset Memory Controller',
      description: 'One-touch height switching between your personalized sitting, standing, and active perching heights.',
    },
    {
      icon: Volume2,
      title: 'Whisper-Quiet Dual Motors',
      description: 'Dual high-torque electric drives operate under 42 decibels—quieter than a library room.',
    },
    {
      icon: ShieldCheck,
      title: '6-Axis Gyro Anti-Collision',
      description: 'Auto-reverses 2cm instantly upon sensing resistance from chairs, drawers, or office pedestals.',
    },
    {
      icon: Zap,
      title: '125 KG Heavy-Duty Steel Frame',
      description: 'Aircraft-grade dual-stage steel legs engineered to hold triple 34" monitors and studio gear.',
    },
  ];

  return (
    <section className="py-20 bg-zinc-50 text-zinc-900 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ergonomics Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Why Choose Fittrock ?
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base">
            Every component is built for heavy daily use, whisper-quiet motor transitions, and structural stability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-zinc-200 shadow-sm rounded-3xl p-6 space-y-4 hover:border-zinc-300 hover:shadow-md transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-base text-zinc-900 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
