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
  // Real Cloudinary image URLs from Fittrock product catalog
  const rowOneItems: WorkspaceItem[] = [
    {
      title: 'KUBER - Dual Motor',
      href: '/collections/standing-desks',
      cloudinaryUrl: 'https://res.cloudinary.com/suoauydj/image/upload/v1788429509/fittrock/products/Kuber_dark_mapple.jpg',
      fallbackPlaceholder: 'https://res.cloudinary.com/suoauydj/image/upload/v1788429619/fittrock/products/Kuber_ice_beach2.jpg',
      aspectRatio: 'aspect-[4/3]',
    },
    {
      title: 'RATI - Single Motor',
      href: '/collections/standing-desks',
      cloudinaryUrl: 'https://res.cloudinary.com/suoauydj/image/upload/v1788429265/fittrock/products/rati_ice_beach1.jpg',
      fallbackPlaceholder: 'https://res.cloudinary.com/suoauydj/image/upload/v1788429128/fittrock/products/rati_dark_mapple1.jpg',
      aspectRatio: 'aspect-[4/3]',
    },
    {
      title: 'Yogeek Luxe',
      href: '/collections/ergonomic-chairs',
      cloudinaryUrl: 'https://res.cloudinary.com/suoauydj/image/upload/v1788429780/fittrock/products/1_c31a2eff-b24a-4a22-9fef-4fb71db1c8d4.jpg',
      fallbackPlaceholder: 'https://res.cloudinary.com/suoauydj/image/upload/v1788429796/fittrock/products/YG_0115.png',
      aspectRatio: 'aspect-[4/3]',
    },
  ];

  const rowTwoItems: WorkspaceItem[] = [
    {
      title: 'Premium Engineered Wood Table Tops Online | Fittrock',
      href: '/collections/standing-desks',
      cloudinaryUrl: 'https://res.cloudinary.com/suoauydj/image/upload/v1788429718/fittrock/products/IceBeach.jpg',
      fallbackPlaceholder: 'https://res.cloudinary.com/suoauydj/image/upload/v1788429706/fittrock/products/tabletop.jpg',
      aspectRatio: 'aspect-[16/9]',
    },
    {
      title: 'Cable Management Tray',
      href: '/collections/desk-accessories',
      cloudinaryUrl: 'https://res.cloudinary.com/suoauydj/image/upload/v1788429720/fittrock/products/1White1.jpg',
      fallbackPlaceholder: 'https://res.cloudinary.com/suoauydj/image/upload/v1788429722/fittrock/products/1Black.jpg',
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
          loading="lazy"
          decoding="async"
          onError={() => {
            if (imgSrc !== item.fallbackPlaceholder) {
              setImgSrc(item.fallbackPlaceholder);
            } else if (imgSrc !== '/og-image.png') {
              setImgSrc('/og-image.png');
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
