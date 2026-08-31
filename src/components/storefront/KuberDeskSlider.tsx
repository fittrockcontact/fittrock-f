'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/storefront/ProductCard';

interface Props {
  dbProducts?: any[];
}

export function KuberDeskSlider({ dbProducts = [] }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Default KUBER desks list matching the screenshot
  const defaultKuberProducts = [
    {
      id: 'kuber-ice-beach',
      name: 'Kuber D1 Ice Beach Dual Motor Adjustable Desk | Fittrock',
      slug: 'kuber-d1-ice-beach-dual-motor',
      basePrice: '24990',
      compareAtPrice: '39990',
      imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'kuber-dark-maple',
      name: 'Kuber D1 Dark Maple Dual Motor Adjustable Desk | Fittrock',
      slug: 'kuber-d1-dark-maple-dual-motor',
      basePrice: '24990',
      compareAtPrice: '39990',
      imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'kuber-frosty-white',
      name: 'Kuber D1 Frosty White Dual Motor Adjustable Desk | Fittrock',
      slug: 'kuber-d1-frosty-white-dual-motor',
      basePrice: '24990',
      compareAtPrice: '39990',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'kuber-black',
      name: 'Kuber D1 Black Dual Motor Adjustable Desk | Fittrock',
      slug: 'kuber-d1-black-dual-motor',
      basePrice: '24990',
      compareAtPrice: '39990',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'kuber-teak-wood',
      name: 'Kuber D1 Teak Wood Dual Motor Adjustable Desk | Fittrock',
      slug: 'kuber-d1-teak-wood-dual-motor',
      basePrice: '26990',
      compareAtPrice: '42990',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const displayProducts = dbProducts.length > 0 ? dbProducts : defaultKuberProducts;

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -460 : 460;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-800 text-white border-b border-gray-600 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Semibold typography */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-white">
            KUBER Dual Motor – Premium Electric Height Adjustable Standing Desks
          </h2>
        </div>

        {/* Carousel / Slider Container */}
        <div className="relative group">
          {/* Slider Items Row with Larger Cards */}
          <div
            ref={sliderRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth no-scrollbar pb-6 pt-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayProducts.map((product) => (
              <div
                key={product.id}
                className="w-[300px] sm:w-[360px] md:w-[410px] lg:w-[440px] shrink-0 snap-start"
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            aria-label="Previous products"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 text-zinc-900 border border-zinc-200 shadow-2xl flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button (Always visible on hover / desktop) */}
          <button
            onClick={() => scroll('right')}
            aria-label="Next products"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/95 text-zinc-900 border border-zinc-200 shadow-2xl flex items-center justify-center hover:bg-white hover:scale-110 active:scale-95 transition-all z-20"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
