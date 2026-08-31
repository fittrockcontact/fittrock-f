import React from 'react';
import Link from 'next/link';

interface MarketplaceLink {
  name: string;
  href: string;
  logo: string;
  alt: string;
  className?: string;
}

export function AvailableOn() {
  // Configurable marketplace links - update with official store URLs when ready
  const marketplaces: MarketplaceLink[] = [
    {
      name: 'Flipkart',
      href: 'https://www.flipkart.com',
      logo: '/Flipkart-Logo.jpg',
      alt: 'Buy Fittrock Standing Desks on Flipkart',
      className: 'h-8 sm:h-10 md:h-12',
    },
    {
      name: 'Amazon',
      href: 'https://www.amazon.in',
      logo: '/amazon-logo.png',
      alt: 'Buy Fittrock Standing Desks on Amazon',
      className: 'h-8 sm:h-10 md:h-12',
    },
  ];

  return (
    <section className="py-10 sm:py-14 bg-white text-zinc-900 border-b border-zinc-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4 sm:space-y-6">
        {/* Title */}
        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
          Available On
        </h3>

        {/* Marketplace Logos Container */}
        <div className="flex items-center justify-center gap-8 sm:gap-14 md:gap-16">
          {marketplaces.map((marketplace) => (
            <a
              key={marketplace.name}
              href={marketplace.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center p-2 rounded-xl transition-all transform hover:scale-105 active:scale-95 focus:outline-none"
              title={`Shop on ${marketplace.name}`}
            >
              <img
                src={marketplace.logo}
                alt={marketplace.alt}
                className={`${marketplace.className} w-auto object-contain select-none`}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
