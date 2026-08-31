'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/storefront/ProductCard';

interface Props {
  dbProducts?: any[];
}

export function RatiDeskSlider({ dbProducts = [] }: Props) {
  const sliderRef = useRef<HTMLDivElement>(null);

  // Default RATI Single Motor desks list
  const defaultRatiProducts = [
    {
      id: 'rati-ice-beach',
      name: 'Rati S1 Ice Beach Single Motor Adjustable Desk | Fittrock',
      slug: 'rati-s1-ice-beach-single-motor',
      basePrice: '18990',
      compareAtPrice: '29990',
      imageUrl: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'rati-dark-maple',
      name: 'Rati S1 Dark Maple Single Motor Adjustable Desk | Fittrock',
      slug: 'rati-s1-dark-maple-single-motor',
      basePrice: '18990',
      compareAtPrice: '29990',
      imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'rati-frosty-white',
      name: 'Rati S1 Frosty White Single Motor Adjustable Desk | Fittrock',
      slug: 'rati-s1-frosty-white-single-motor',
      basePrice: '18990',
      compareAtPrice: '29990',
      imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'rati-black',
      name: 'Rati S1 Black Single Motor Adjustable Desk | Fittrock',
      slug: 'rati-s1-black-single-motor',
      basePrice: '18990',
      compareAtPrice: '29990',
      imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1000&q=80',
    },
    {
      id: 'rati-teak-wood',
      name: 'Rati S1 Teak Wood Single Motor Adjustable Desk | Fittrock',
      slug: 'rati-s1-teak-wood-single-motor',
      basePrice: '20990',
      compareAtPrice: '32990',
      imageUrl: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80',
    },
  ];

  const displayProducts = dbProducts.length > 0 ? dbProducts : defaultRatiProducts;

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -460 : 460;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-100 text-white border-b border-gray-600 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with Semibold typography */}
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-black">
            RATI Single Motor – Smart Electric Height Adjustable Standing Desks
          </h2>
        </div>

        {/* Carousel / Slider Container */}
        <div className="relative group">
          {/* Slider Items Row with Large Cards */}
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

          {/* Right Arrow Button */}
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
