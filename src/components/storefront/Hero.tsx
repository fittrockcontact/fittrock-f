import React from 'react';
import Link from 'next/link';
import { ArrowDown, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative w-full min-h-[85svh] sm:min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-slate-50">
      {/* Full Screen Hero Image Background */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="/hero.png"
          alt="Fittrock Ergonomic Standing Desk Banner"
          className="w-full h-full object-cover object-[70%_center] sm:object-center scale-[1.02] transition-transform duration-1000 ease-out opacity-40"
        />

        {/* Layered gradients for crisp text contrast & light ambiance */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-slate-50/80 to-slate-50" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-white/90 pointer-events-none" />
      </div>

      {/* Hero Content Overlay */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center flex flex-col items-center justify-center space-y-4 sm:space-y-6">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 backdrop-blur-md text-amber-700 font-semibold px-3.5 py-1.5 rounded-full text-xs sm:text-sm tracking-wider uppercase shadow-sm">
          <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
          <span>Ergonomic Excellence</span>
        </div>

        {/* Catchy Subheading */}
        <p className="text-xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-amber-600 drop-shadow-sm">
          Love Yourself!
        </p>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black tracking-tight text-zinc-900 drop-shadow-sm leading-[1.15] max-w-4xl">
          Get The Best Standing Desk In The Market!
        </h1>

        {/* Sub-description */}
        <p className="text-sm sm:text-lg md:text-xl text-zinc-600 max-w-2xl font-normal leading-relaxed px-2 sm:px-0">
          Engineered with whisper-quiet dual motors, solid hardwood finishes, and advanced anti-collision technology for your ultimate workspace setup.
        </p>

        {/* Action Call Buttons */}
        <div className="pt-4 sm:pt-6 w-full max-w-md sm:max-w-none flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-3 sm:gap-6">
          <Link
            href="/collections/standing-desks"
            className="w-full sm:w-auto bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold px-8 py-4 rounded-xl text-base sm:text-lg transition-all shadow-lg shadow-amber-500/20 transform hover:-translate-y-0.5 active:scale-[0.98] text-center"
          >
            Shop Standing Desks
          </Link>
          <Link
            href="/collections/ergonomic-chairs"
            className="w-full sm:w-auto bg-white hover:bg-zinc-100 text-zinc-900 border border-zinc-300 shadow-sm font-extrabold px-8 py-4 rounded-xl text-base sm:text-lg transition-all transform hover:-translate-y-0.5 active:scale-[0.98] text-center"
          >
            Explore Chairs
          </Link>
        </div>
      </div>

      {/* Bottom Scroll Indicator */}
      <div className="hidden sm:flex absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-1 text-zinc-500 animate-bounce pointer-events-none">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-zinc-500">Scroll</span>
        <ArrowDown className="w-4 h-4 text-amber-600" />
      </div>
    </section>
  );
}


