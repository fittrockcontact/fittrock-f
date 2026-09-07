import React from 'react';
import { Hero } from '@/components/storefront/Hero';
import { FeatureSpotlight } from '@/components/storefront/FeatureSpotlight';
import { WorkspaceBuilder } from '@/components/storefront/WorkspaceBuilder';
import { AvailableOn } from '@/components/storefront/AvailableOn';
import { KuberDeskSlider } from '@/components/storefront/KuberDeskSlider';
import { RatiDeskSlider } from '@/components/storefront/RatiDeskSlider';
import { TrustBadges } from '@/components/storefront/TrustBadges';
import { DeskConfigurator } from '@/components/storefront/DeskConfigurator';
import { TestimonialSection } from '@/components/storefront/TestimonialSection';
import { YouTubeSection } from '@/components/storefront/YouTubeSection';
import { GoogleReviewsTrustSection } from '@/components/storefront/GoogleReviewsTrustSection';
import { FAQAccordion } from '@/components/storefront/FAQAccordion';
import { LandscapeVideoShowcase } from '@/components/storefront/LandscapeVideoShowcase';
import { NewsletterSection } from '@/components/storefront/NewsletterSection';
import { apiFetch } from '@/lib/api-client';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fittrock.com';

export const metadata: Metadata = {
  title: 'Fittrock Ergonomics | Premium Height Adjustable Standing Desks & Chairs',
  description:
    'Upgrade your workplace posture with dual-motor height-adjustable electric standing desks, lumbar mesh chairs, and heavy-duty monitor arms engineered in Pune, India.',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Fittrock Ergonomics | Premium Height Adjustable Standing Desks & Chairs',
    description:
      'Upgrade your workplace posture with dual-motor height-adjustable electric standing desks, lumbar mesh chairs, and heavy-duty monitor arms engineered in Pune, India.',
    url: siteUrl,
    type: 'website',
    siteName: 'Fittrock Ergonomics',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Fittrock Ergonomics Standing Desks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fittrock Ergonomics | Electric Height Adjustable Desks',
    description: '125kg capacity dual-motor standing desks with whisper quiet <42dB operation & 10-Year Warranty.',
    images: ['/og-image.png'],
  },
};

export default async function HomePage() {
  let dbProducts: any[] = [];

  try {
    const productsRes = await apiFetch<{ products: any[] }>('/api/products');
    dbProducts = productsRes.products || [];
  } catch (err) {
    console.error('Error fetching products from Supabase API server:', err);
  }

  // Filter products directly from Supabase database by motor type / series
  const kuberProducts = dbProducts.filter((p: any) =>
    p.motor_type === 'dual' || p.slug?.includes('kuber') || p.title?.toLowerCase().includes('kuber')
  );

  const ratiProducts = dbProducts.filter((p: any) =>
    p.motor_type === 'single' || p.slug?.includes('rati') || p.title?.toLowerCase().includes('rati')
  );

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Fittrock Ergonomics',
    url: siteUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${siteUrl}/collections/standing-desks?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const homepageFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How quiet are the electric dual motors on Fittrock standing desks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Fittrock dual-motor desks operate under 42 dB—quieter than a whisper. Transitions between seated and standing height take less than 6 seconds without disturbing calls or video meetings.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the weight capacity of the Fittrock standing desk frame?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our heavy-duty steel frame is rated for 125 kg (275 lbs) lifting capacity, allowing you to easily support triple monitors, studio speakers, desktop CPUs, and heavy peripherals.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does the desk come with an anti-collision safety system?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes! Every Fittrock standing desk includes 6-axis gyro anti-collision technology. If the desk contacts an obstacle (like a chair armrest or drawer) while lowering, it automatically stops and reverses 2cm.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does shipping take and is assembly included?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We offer free express delivery within 3-5 business days across India. Desks come with a pre-wired control box and numbered assembly guide. Toolkits and screws are included.',
        },
      },
      {
        '@type': 'Question',
        name: 'What warranty coverage is included with Fittrock desks?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every Fittrock desk frame is backed by our industry-leading 10-Year Structural Warranty, and electric motors/control boxes are covered by a 3-Year Replacement Warranty.',
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageFaqSchema) }}
      />
      <div className="space-y-0">
        {/* 1. Hero Banner */}
        <Hero />

        {/* 2. Why Choose Fittrock Spotlight (Certifications + Vouchers) */}
        <FeatureSpotlight />

        {/* 3. Build Your Perfect Workspace (Cloudinary Workspace Grid) */}
        <WorkspaceBuilder />

        {/* 4. Available On (Flipkart & Amazon Marketplaces) */}
        <AvailableOn />

        {/* 5. KUBER Dual Motor Standing Desk Slider (Supabase Live DB) */}
        <KuberDeskSlider dbProducts={kuberProducts} />

        {/* 6. RATI Single Motor Standing Desk Slider (Supabase Live DB) */}
        <RatiDeskSlider dbProducts={ratiProducts} />

        {/* 7. Trust Badges */}
        <TrustBadges />

        {/* 8. Interactive Studio Configurator */}
        <DeskConfigurator />

        {/* 9. Verified Customer Reviews */}
        <TestimonialSection />

        {/* 10. YouTube Shorts Showcase */}
        <YouTubeSection />

        {/* 11. Google Review & Warranty / Trust Strip */}
        <GoogleReviewsTrustSection />

        {/* 12. FAQ Accordion */}
        <FAQAccordion />

        {/* 13. Featured Landscape Video Showcase (Below FAQ) */}
        <LandscapeVideoShowcase />

        {/* 14. Newsletter Subscription (Connected to Supabase DB) */}
        <NewsletterSection />
      </div>
    </>
  );
}
