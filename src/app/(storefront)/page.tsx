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
import { apiFetch } from '@/lib/api-client';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Fittrock Ergonomics | Premium Electric Standing Desks & Chairs',
  description: 'Upgrade your workplace posture with dual-motor height-adjustable electric standing desks, lumbar mesh chairs, and heavy-duty monitor arms.',
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

  return (
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

      {/* 11. Google Review & Warranty / Trust Strip (Matching Attached Image) */}
      <GoogleReviewsTrustSection />

      {/* 12. FAQ Accordion */}
      <FAQAccordion />

      {/* 13. Featured Landscape Video Showcase (Below FAQ) */}
      <LandscapeVideoShowcase />
    </div>
  );
}




