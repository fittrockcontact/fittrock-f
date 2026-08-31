'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface WorkspaceItem {
  title: string;
  href: string;
  cloudinaryUrl: string;
  fallbackPlaceholder: string;
  aspectRatio: string;
}

export function WorkspaceBuilder() {
  // Configurable Cloudinary image URLs with fallback placeholders
  const rowOneItems: WorkspaceItem[] = [
    {
      title: 'KUBER - Dual Motor',
      href: '/collections/standing-desks',
      cloudinaryUrl: 'https://res.cloudinary.com/fittrock/image/upload/v1/storefront/kuber-dual-motor.jpg',
      fallbackPlaceholder: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80',
      aspectRatio: 'aspect-[4/3]',
    },
    {
      title: 'RATI - Single Motor',
      href: '/collections/standing-desks',
      cloudinaryUrl: 'https://res.cloudinary.com/fittrock/image/upload/v1/storefront/rati-single-motor.jpg',
      fallbackPlaceholder: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      aspectRatio: 'aspect-[4/3]',
    },
    {
      title: 'Yogeek Luxe',
      href: '/collections/ergonomic-chairs',
      cloudinaryUrl: 'https://res.cloudinary.com/fittrock/image/upload/v1/storefront/yogeek-luxe.jpg',
      fallbackPlaceholder: 'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=800&q=80',
      aspectRatio: 'aspect-[4/3]',
    },
  ];

  const rowTwoItems: WorkspaceItem[] = [
    {
      title: 'Premium Engineered Wood Table Tops Online | Fittrock',
      href: '/collections/standing-desks',
      cloudinaryUrl: 'https://res.cloudinary.com/fittrock/image/upload/v1/storefront/table-tops.jpg',
      fallbackPlaceholder: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: 'aspect-[16/9]',
    },
    {
      title: 'Cable Management Tray',
      href: '/collections/desk-accessories',
      cloudinaryUrl: 'https://res.cloudinary.com/fittrock/image/upload/v1/storefront/cable-management-tray.jpg',
      fallbackPlaceholder: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80',
      aspectRatio: 'aspect-[16/9]',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-black text-white border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
            Build Your Perfect Workspace
          </h2>
        </div>

        {/* Workspace Cards Layout */}
        <div className="space-y-8 sm:space-y-10">
          {/* Row 1: 3 Columns (KUBER, RATI, Yogeek Luxe) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {rowOneItems.map((item, idx) => (
              <WorkspaceCard key={idx} item={item} />
            ))}
          </div>

          {/* Row 2: 2 Columns (Table Tops, Cable Management) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {rowTwoItems.map((item, idx) => (
              <WorkspaceCard key={idx} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkspaceCard({ item }: { item: WorkspaceItem }) {
  const [imgSrc, setImgSrc] = useState(item.cloudinaryUrl);

  return (
    <Link href={item.href} className="group block focus:outline-none">
      {/* Image Container with Rounded Corners */}
      <div
        className={`relative w-full ${item.aspectRatio} overflow-hidden rounded-xl bg-zinc-900 border border-zinc-800/80 shadow-md group-hover:border-zinc-600 transition-colors`}
      >
        <img
          src={imgSrc}
          alt={item.title}
          onError={() => {
            // Fallback to placeholder if Cloudinary URL is not yet uploaded
            if (imgSrc !== item.fallbackPlaceholder) {
              setImgSrc(item.fallbackPlaceholder);
            }
          }}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
      </div>

      {/* Caption Below Image */}
      <p className="text-center text-sm sm:text-base font-normal text-white/90 group-hover:text-white transition-colors mt-3.5 leading-snug">
        {item.title}
      </p>
    </Link>
  );
}
