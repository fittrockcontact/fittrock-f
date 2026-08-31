import React from 'react';
import { Header } from '@/components/storefront/Header';
import { Footer } from '@/components/storefront/Footer';
import { CartDrawer } from '@/components/storefront/CartDrawer';
import { WhatsAppButton } from '@/components/storefront/WhatsAppButton';
import { ErgoFaqChatbot } from '@/components/storefront/ErgoFaqChatbot';
import { Toaster } from 'sonner';

export default function StorefrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'FITTROCK ERGONOMICS LLP',
    legalName: 'FITTROCK ERGONOMICS LLP',
    url: 'https://fittrock.com/',
    logo: 'https://fittrock.com/logo.png',
    telephone: '+918087827905',
    email: 'contact@fittrock.com',
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Office no 610, 6th floor, Park Plaza, Porwal Rd',
      addressLocality: 'Lohegaon, Pune',
      addressRegion: 'Maharashtra',
      postalCode: '411047',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 18.613601,
      longitude: 73.9091461,
    },
    hasMap: 'https://maps.app.goo.gl/cNpEwygy4a8zYUNj6',
    sameAs: [
      'https://www.youtube.com/@FITTROCK',
      'https://www.instagram.com/fittrock_',
      'https://www.facebook.com/fittrockindia',
    ],
  };

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col selection:bg-amber-500 selection:text-zinc-950 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppButton />
      <ErgoFaqChatbot />
      <Toaster position="bottom-right" theme="light" />
    </div>
  );
}



