import { MetadataRoute } from 'next';
import { getAllBlogPostSlugs } from '@/lib/blog';
import { getAllAuthors } from '@/lib/authors';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fittrock.com';
  const now = new Date();

  // Static core routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/collections/standing-desks`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/authors`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/warranty`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/shipping`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/returns`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/refund`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/pricing-payments`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/media-kit`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/disclaimer`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/accessibility`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/grievance-redressal`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];

  // Dynamic products
  const productSlugs = new Set<string>([
    'kuber-dual-motor-electric-height-adjustable-standing-desk',
    'kuber-d1-dark-mapple',
    'rati-single-motor-electric-height-adjustable-standing-desk',
    'kuber-pro-motorized-standing-table',
  ]);

  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const res = await fetch(`${apiUrl}/api/products`, { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      const products = data.products || [];
      for (const p of products) {
        if (p.slug) productSlugs.add(p.slug);
      }
    }
  } catch {
    // Graceful fallback to initial set
  }

  const productRoutes: MetadataRoute.Sitemap = Array.from(productSlugs).map((slug) => ({
    url: `${baseUrl}/products/${slug}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  // Dynamic collections
  const collectionSlugs = [
    'standing-desks',
    'dual-motor-desks',
    'single-motor-desks',
    'desk-frames',
    'ergonomic-chairs',
  ];

  const collectionRoutes: MetadataRoute.Sitemap = collectionSlugs.map((slug) => ({
    url: `${baseUrl}/collections/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Dynamic Blog Posts
  const blogSlugs = getAllBlogPostSlugs();
  const blogRoutes: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.75,
  }));

  // Dynamic Authors
  const authors = getAllAuthors();
  const authorRoutes: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${baseUrl}/authors/${author.slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.65,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...collectionRoutes,
    ...blogRoutes,
    ...authorRoutes,
  ];
}
