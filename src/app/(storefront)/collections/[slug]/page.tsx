import React from 'react';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/storefront/ProductCard';
import { apiFetch } from '@/lib/api-client';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const data = await apiFetch<{ collection: any }>(`/api/collections/${slug}`);
    if (data.collection) {
      return {
        title: `${data.collection.name} | Fittrock Ergonomics`,
        description: data.collection.description || `Shop premium ${data.collection.name} at Fittrock Ergonomics.`,
      };
    }
  } catch (e) {
    // Ignore error
  }

  const titleFormatted = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${titleFormatted} | Fittrock Ergonomics`,
    description: `Browse our collection of ${titleFormatted} engineered for posture & focus.`,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;

  let collectionData: any = null;
  let collectionProducts: any[] = [];

  try {
    const res = await apiFetch<{ collection: any }>(`/api/collections/${slug}`);
    if (res.collection) {
      collectionData = res.collection;
      collectionProducts = res.collection.products || [];
    }
  } catch (err) {
    console.error(`Error fetching collection ${slug} from Supabase database API:`, err);
  }

  if (!collectionData) {
    notFound();
  }

  return (
    <div className="py-12 bg-white min-h-screen text-zinc-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Collection Header */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 sm:p-12 mb-12 space-y-3 relative overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 block">
            Collection
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight">
            {collectionData.name}
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl leading-relaxed">
            {collectionData.description}
          </p>
        </div>

        {/* Products Grid */}
        {collectionProducts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-3">
            <h3 className="text-xl font-bold text-zinc-800">No products in this collection yet</h3>
            <p className="text-sm text-zinc-500">Products added to this category in Supabase will automatically appear here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {collectionProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
