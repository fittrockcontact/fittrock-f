'use client';

import React, { useState } from 'react';
import { Sliders, Check, ShoppingCart } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/use-cart-store';

export function DeskConfigurator() {
  const [selectedFinish, setSelectedFinish] = useState<'oak' | 'walnut' | 'black'>('oak');
  const [selectedSize, setSelectedSize] = useState<'140' | '160'>('140');
  const [currentHeight, setCurrentHeight] = useState<number>(72); // 72cm to 120cm

  const addItem = useCartStore((s) => s.addItem);

  const finishes = [
    {
      id: 'oak',
      name: 'Natural Oak',
      colorBg: 'bg-[#d2b48c]',
      image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'walnut',
      name: 'Dark Walnut',
      colorBg: 'bg-[#5c4033]',
      image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'black',
      name: 'Stealth Black',
      colorBg: 'bg-zinc-800',
      image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const currentFinishObj = finishes.find((f) => f.id === selectedFinish)!;
  const price = selectedSize === '140' ? 34999 : 39999;

  const handleAddToCart = () => {
    addItem({
      variantId: `FT-DESK-${selectedFinish.toUpperCase()}-${selectedSize}`,
      productId: 'configurator-desk',
      productName: `Fittrock Pro Desk (${currentFinishObj.name})`,
      productSlug: 'fittrock-pro-standing-desk',
      sku: `FT-DESK-${selectedFinish.toUpperCase()}-${selectedSize}`,
      color: currentFinishObj.name,
      size: `${selectedSize} x ${selectedSize === '140' ? '70' : '80'} cm`,
      price,
      imageUrl: currentFinishObj.image,
      stockQuantity: 10,
      quantity: 1,
    });
  };

  return (
    <section className="py-12 sm:py-20 bg-zinc-50 text-zinc-900 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-3 sm:space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            <span>Interactive Studio Preview</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-zinc-900">
            Customize Your Dream Standing Desk
          </h2>
          <p className="text-zinc-600 text-xs sm:text-base">
            Select your hardwood finish, desk size, and preview motorized height range in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-center bg-white border border-zinc-200 shadow-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-10">
          {/* Visualizer Panel */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-6">
            <div className="relative aspect-4/3 sm:aspect-16/10 rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-100 border border-zinc-200">
              <img
                src={currentFinishObj.image}
                alt={currentFinishObj.name}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 via-transparent to-transparent" />

              {/* Digital Height Indicator Overlay */}
              <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 bg-white/95 backdrop-blur-md border border-zinc-200 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl flex items-center gap-2.5 shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] sm:text-xs text-zinc-600 font-medium">Height:</span>
                <span className="text-base sm:text-lg font-mono font-bold text-amber-600">{currentHeight} cm</span>
              </div>
            </div>

            {/* Height Touch Slider */}
            <div className="bg-zinc-50 border border-zinc-200 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl space-y-2">
              <div className="flex justify-between text-[11px] sm:text-xs text-zinc-600 font-semibold">
                <span>Min: 65cm (Seated)</span>
                <span>Max: 130cm (Standing)</span>
              </div>
              <input
                type="range"
                min={65}
                max={130}
                value={currentHeight}
                onChange={(e) => setCurrentHeight(Number(e.target.value))}
                className="w-full h-3 accent-amber-500 cursor-pointer rounded-lg bg-zinc-200"
              />
            </div>
          </div>

          {/* Options Panel */}
          <div className="lg:col-span-5 space-y-6 sm:space-y-8 pt-2 lg:pt-0">
            {/* Step 1: Wood Finish */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-xs sm:text-sm font-bold text-zinc-800 block uppercase tracking-wider">
                1. Select Desktop Finish
              </label>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {finishes.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setSelectedFinish(f.id as any)}
                    className={`p-2.5 sm:p-3 rounded-xl border flex flex-col items-center gap-1.5 sm:gap-2 text-center transition-all min-h-[72px] justify-center active:scale-95 ${
                      selectedFinish === f.id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-700 font-bold'
                        : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                    }`}
                  >
                    <span className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border border-zinc-300 ${f.colorBg}`} />
                    <span className="text-[11px] sm:text-xs font-semibold leading-tight">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions */}
            <div className="space-y-2 sm:space-y-3">
              <label className="text-xs sm:text-sm font-bold text-zinc-800 block uppercase tracking-wider">
                2. Desktop Dimensions
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                <button
                  onClick={() => setSelectedSize('140')}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all active:scale-[0.99] ${
                    selectedSize === '140'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-700'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm text-zinc-900">140 x 70 cm</div>
                  <div className="text-[11px] text-zinc-500">Compact / Home Office</div>
                </button>
                <button
                  onClick={() => setSelectedSize('160')}
                  className={`p-3.5 sm:p-4 rounded-xl border text-left transition-all active:scale-[0.99] ${
                    selectedSize === '160'
                      ? 'border-amber-500 bg-amber-500/10 text-amber-700'
                      : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                  }`}
                >
                  <div className="font-bold text-xs sm:text-sm text-zinc-900">160 x 80 cm</div>
                  <div className="text-[11px] text-zinc-500">Executive Pro Width</div>
                </button>
              </div>
            </div>

            {/* Price & Action Button */}
            <div className="border-t border-zinc-200 pt-5 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div className="flex items-baseline justify-between sm:block">
                <span className="text-xs text-zinc-500 font-semibold sm:block">Configured Total</span>
                <span className="text-2xl sm:text-3xl font-black text-zinc-900">{formatPrice(price)}</span>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full sm:w-auto min-h-[48px] bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold px-6 py-3.5 rounded-xl text-base flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/20 active:scale-[0.98]"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add Configuration</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

