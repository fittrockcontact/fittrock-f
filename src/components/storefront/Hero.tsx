import React from 'react';

export function Hero() {
  return (
    <section className="relative w-full h-screen min-h-screen bg-[#032e33] overflow-hidden flex items-center justify-center">
      {/* Full Screen Hero Image */}
      <img
        src="/hero.png"
        alt="Love Yourself! Get The Best Standing Desk In The Market!"
        className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
      />

      {/* Black Gradient at the Bottom for Crisp Text Legibility */}
      <div className="absolute inset-x-0 bottom-0 h-3/5 sm:h-1/2 bg-gradient-to-t from-black/95 via-black/60 to-transparent pointer-events-none z-0" />

      {/* Bottom Center Hero Captions */}
      <div className="absolute inset-x-0 bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 flex flex-col items-center justify-center text-center px-4 z-10 pointer-events-none space-y-2 sm:space-y-3">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
          Love Yourself!
        </h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] max-w-5xl leading-tight sm:leading-tight">
          Get The Best Standing Desk In The Market!
        </h1>
      </div>
    </section>
  );
}
