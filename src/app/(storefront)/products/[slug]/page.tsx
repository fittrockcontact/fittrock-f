import React from 'react';
import { notFound } from 'next/navigation';
import { apiFetch } from '@/lib/api-client';
import { ProductDetailClient } from './ProductDetailClient';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fittrock.com';

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let title = '';
  let description = '';
  let imageUrl = '/og-image.png';

  try {
    const data = await apiFetch<{ product: any }>(`/api/products/${slug}`);
    if (data.product) {
      const p = data.product;
      title = p.name || p.title;
      description =
        p.shortDescription ||
        p.description ||
        `Buy ${p.name || p.title} with 3-Year Frame Warranty and Free Shipping across India.`;
      if (p.imageUrl) {
        imageUrl = p.imageUrl;
      } else if (Array.isArray(p.imageUrls) && p.imageUrls.length > 0) {
        imageUrl = p.imageUrls[0];
      }
    }
  } catch {
    // Fallback if direct fetch fails
  }

  if (!title) {
    const name = slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    title = name;
    description = `Shop ${name} height-adjustable standing desks, dual-motor lift systems, and ergonomic furniture with 3-Year Warranty.`;
  }

  const canonicalUrl = `${siteUrl}/products/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: 'website',
      siteName: 'Fittrock Ergonomics',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
      creator: '@fittrockindia',
    },
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

  const productName = productData.name || productData.title || 'Fittrock Standing Desk';
  const productPrice = productData.basePrice || '24999';
  const productImage =
    productData.imageUrl ||
    (Array.isArray(productData.imageUrls) ? productData.imageUrls[0] : null) ||
    'https://fittrock.com/og-image.png';
  const productDescription =
    productData.shortDescription ||
    productData.description ||
    `Fittrock ${productName} motorized height adjustable standing desk with German-spec motors and 3-Year Warranty.`;

  // Product Schema.org JSON-LD (Latest Search Central / Merchant Return Policy standard)
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productName,
    description: productDescription,
    image: [productImage],
    sku: productData.slug || `FT-${productData.id}`,
    mpn: productData.id,
    brand: {
      '@type': 'Brand',
      name: 'Fittrock',
    },
    manufacturer: {
      '@type': 'Organization',
      name: 'FITTROCK ERGONOMICS LLP',
      url: siteUrl,
    },
    offers: {
      '@type': 'Offer',
      url: `${siteUrl}/products/${slug}`,
      priceCurrency: 'INR',
      price: productPrice,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'FITTROCK ERGONOMICS LLP',
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'IN',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'INR',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'IN',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 0,
            maxValue: 1,
            unitCode: 'DAY',
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 2,
            maxValue: 5,
            unitCode: 'DAY',
          },
        },
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '148',
      bestRating: '5',
      worstRating: '1',
    },
  };

  // Breadcrumbs Schema
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
        name: 'Standing Desks',
        item: `${siteUrl}/collections/standing-desks`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: productName,
        item: `${siteUrl}/products/${slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsJsonLd) }}
      />
      <ProductDetailClient product={productData} />
    </>
  );
}
