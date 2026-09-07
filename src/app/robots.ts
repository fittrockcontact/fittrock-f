import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fittrock.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/cart',
          '/checkout',
          '/account',
          '/api/',
          '/_next/',
          '/orders',
        ],
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'PerplexityBot',
          'ClaudeBot',
          'Applebot-Extended',
          'Google-Extended',
        ],
        allow: [
          '/',
          '/products',
          '/products/',
          '/collections',
          '/collections/',
          '/blog',
          '/blog/',
          '/authors',
          '/authors/',
          '/faq',
          '/about',
          '/warranty',
          '/shipping',
          '/returns',
          '/refund',
          '/contact',
          '/testimonials',
          '/media-kit',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/cart',
          '/checkout',
          '/account',
          '/api/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
