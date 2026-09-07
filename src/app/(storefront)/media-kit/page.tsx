import React from 'react';
import { Metadata } from 'next';
import { MediaKitClient } from './MediaKitClient';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fittrock.com';

export const metadata: Metadata = {
  title: 'Media Kit & Press Resources | Fittrock Ergonomics',
  description:
    'Official brand assets, logos, high-resolution product photography, company factsheet, and press contact information for Fittrock Ergonomics.',
  alternates: {
    canonical: `${siteUrl}/media-kit`,
  },
  openGraph: {
    title: 'Media Kit & Press Resources | Fittrock Ergonomics',
    description:
      'Official brand assets, high-resolution standing desk imagery, founder bio, and media contact for journalists and creators.',
    url: `${siteUrl}/media-kit`,
    type: 'website',
    siteName: 'Fittrock Ergonomics',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fittrock Ergonomics Media Kit',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Media Kit & Press Resources | Fittrock Ergonomics',
    description: 'Download high-res logos, product media, and company factsheet.',
    images: ['/og-image.png'],
  },
};

export default function MediaKitPage() {
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
        name: 'Media Kit',
        item: `${siteUrl}/media-kit`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <MediaKitClient />
    </>
  );
}
