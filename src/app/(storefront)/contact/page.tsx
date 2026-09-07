import React from 'react';
import { Metadata } from 'next';
import { ContactClient } from './ContactClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fittrock.com';

export const metadata: Metadata = {
  title: 'Contact Us & Experience Studio Pune | Fittrock Ergonomics',
  description:
    'Contact FITTROCK ERGONOMICS LLP in Pune. Call +91 80878 27905 or WhatsApp +91 86055 91550 for ergonomic desk inquiries, corporate bulk orders, and experience studio visits.',
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact Us & Experience Studio Pune | Fittrock Ergonomics',
    description:
      'Reach out to our ergonomic specialists in Pune for desk customizations, B2B corporate workstation orders, and direct support.',
    url: `${siteUrl}/contact`,
    type: 'website',
    siteName: 'Fittrock Ergonomics',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fittrock Ergonomics Pune Office',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Fittrock Ergonomics',
    description: 'Direct contact details for Fittrock Ergonomics Pune: Phone, WhatsApp, email, and Google map directions.',
    images: ['/og-image.png'],
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Fittrock Ergonomics',
    description:
      'Official contact information for FITTROCK ERGONOMICS LLP, manufacturer of electric standing desks and ergonomic furniture in Pune, India.',
    url: `${siteUrl}/contact`,
    mainEntity: {
      '@type': 'LocalBusiness',
      name: 'FITTROCK ERGONOMICS LLP',
      legalName: 'FITTROCK ERGONOMICS LLP',
      url: siteUrl,
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
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+918087827905',
          contactType: 'customer service',
          areaServed: 'IN',
          availableLanguage: ['English', 'Hindi', 'Marathi'],
        },
        {
          '@type': 'ContactPoint',
          telephone: '+918605591550',
          contactType: 'sales',
          contactOption: 'WhatsApp',
          areaServed: 'IN',
        },
      ],
    },
  };

  const breadcrumbsJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Contact Us',
        item: `${siteUrl}/contact`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <ContactClient />
    </>
  );
}
