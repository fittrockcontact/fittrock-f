import React from 'react';
import Link from 'next/link';
import { Hero } from '@/components/storefront/Hero';
import { TrustBadges } from '@/components/storefront/TrustBadges';
import { ProductCard } from '@/components/storefront/ProductCard';
import { FeatureSpotlight } from '@/components/storefront/FeatureSpotlight';
import { DeskConfigurator } from '@/components/storefront/DeskConfigurator';
import { TestimonialSection } from '@/components/storefront/TestimonialSection';
import { FAQAccordion } from '@/components/storefront/FAQAccordion';
import { apiFetch } from '@/lib/api-client';
import { Metadata } from 'next';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Fittrock Ergonomics | Premium Electric Standing Desks & Chairs',
  description: 'Upgrade your workplace posture with dual-motor height-adjustable electric standing desks, lumbar mesh chairs, and heavy-duty monitor arms.',
};

export default async function HomePage() {
  let dbProducts: any[] = [];
  let dbCollections: any[] = [];

  try {
    const productsRes = await apiFetch<{ products: any[] }>('/api/products');
    dbProducts = productsRes.products || [];

    const collectionsRes = await apiFetch<{ collections: any[] }>('/api/collections');
    dbCollections = collectionsRes.collections || [];
  } catch (err) {
    console.error('Error fetching products/collections from Supabase API server:', err);
  }

  return (
    <div className="space-y-0">
      {/* 1. Hero Banner */}
      <Hero />

      {/* 2. Trust Badges */}
      <TrustBadges />

      {/* 3. Shop by Collection Grid */}
      <section className="py-12 sm:py-20 bg-white text-zinc-900 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                Explore Categories
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">Shop By Collection</h2>
            </div>
          </div>

          {dbCollections.length === 0 ? (
            <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
              <h3 className="text-lg font-bold text-zinc-800">No Collections In Supabase Database</h3>
              <p className="text-xs text-zinc-500">Add collection rows to your Supabase `collections` table to display them here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {dbCollections.map((col: any) => (
                <Link
                  key={col.slug}
                  href={`/collections/${col.slug}`}
                  className="group relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-zinc-200 bg-zinc-100 block active:scale-[0.98] transition-all shadow-sm hover:shadow-md"
                >
                  <img
                    src={col.imageUrl || col.image_url}
                    alt={col.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/30 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 space-y-1 sm:space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-zinc-100 group-hover:text-amber-400 transition-colors">
                      {col.name}
                    </h3>
                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">{col.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Featured Products (Directly from Supabase Database) */}
      <section className="py-12 sm:py-20 bg-zinc-50/50 text-zinc-900 border-b border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block mb-1">
                Supabase Live Database Catalog
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900">Featured Products</h2>
            </div>
          </div>

          {dbProducts.length === 0 ? (
            <div className="text-center py-16 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
              <h3 className="text-xl font-bold text-zinc-800">No Products Found In Supabase Database</h3>
              <p className="text-xs text-zinc-500">Run the seed query to insert the products into your database.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {dbProducts.map((prod: any) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. Feature Engineering Spotlight */}
      <FeatureSpotlight />

      {/* 6. Interactive Studio Configurator */}
      <DeskConfigurator />

      {/* 7. Verified Customer Reviews */}
      <TestimonialSection />

      {/* 8. FAQ Accordion */}
      <FAQAccordion />
    </div>
  );
}
