import React from 'react';
import { notFound } from 'next/navigation';
import { apiFetch } from '@/lib/api-client';
import { ProductDetailClient } from './ProductDetailClient';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const data = await apiFetch<{ product: any }>(`/api/products/${slug}`);
    if (data.product) {
      return {
        title: `${data.product.name || data.product.title} | Fittrock Ergonomics`,
        description: data.product.description || `Buy ${data.product.name || data.product.title} with 10-Year Warranty.`,
      };
    }
  } catch (e) {
    // Ignore error
  }

  const name = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${name} | Fittrock Ergonomics`,
    description: `Shop ${name} height-adjustable standing desks and ergonomic solutions.`,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;

  let productData: any = null;

  try {
    const res = await apiFetch<{ product: any }>(`/api/products/${slug}`);
    if (res.product) {
      productData = res.product;
    }
  } catch (err) {
    console.error(`Error fetching product ${slug} from Supabase database API:`, err);
  }

  // Fallback slug matching if exact slug is not found (e.g. fittrock-pro-motorized-standing-table)
  if (!productData) {
    try {
      const allRes = await apiFetch<{ products: any[] }>('/api/products');
      const allProducts = allRes.products || [];
      if (allProducts.length > 0) {
        // Find best matching product or fallback to first product
        const matched = allProducts.find(
          (p) =>
            p.slug === slug ||
            slug.includes(p.slug) ||
            p.slug.includes('fittrock-pro') ||
            p.name.toLowerCase().includes('standing desk')
        );
        productData = matched || allProducts[0];
      }
    } catch (e) {
      console.error('Fallback product search failed:', e);
    }
  }

  if (!productData) {
    notFound();
  }

  return <ProductDetailClient product={productData} />;
}
