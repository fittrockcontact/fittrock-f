import React from 'react';
import { Metadata } from 'next';
import { FAQClient } from './FAQClient';
import { faqsData } from '@/lib/faq-data';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fittrock.com';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions (FAQ) | Fittrock Ergonomics',
  description:
    'Got questions about Fittrock standing desks? Learn about dual vs single motors, whisper-quiet operation, 3-year warranty, 10-day trial, and free Pan-India delivery.',
  alternates: {
    canonical: `${siteUrl}/faq`,
  },
  openGraph: {
    title: 'Frequently Asked Questions (FAQ) | Fittrock Ergonomics',
    description:
      'Answers to top questions about Fittrock motorized standing desks, weight capacity, assembly, and warranty coverage.',
    url: `${siteUrl}/faq`,
    type: 'website',
    siteName: 'Fittrock Ergonomics',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fittrock Ergonomics FAQ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fittrock Ergonomics FAQ',
    description: 'Learn about dual vs single motors, assembly, 3-year warranty, and shipping timelines.',
    images: ['/og-image.png'],
  },
};

export default function FAQPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqsData.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
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
        name: 'Frequently Asked Questions',
        item: `${siteUrl}/faq`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <FAQClient />
    </>
  );
}
