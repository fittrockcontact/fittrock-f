import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Clock } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ergo Lab & Workplace Health Blog | Fittrock',
  description: 'Guides on standing desk posture, lumbar alignment, dual-motor maintenance, and daily productivity science.',
};

export default function BlogPage() {
  const posts = [
    {
      slug: 'standing-desk-posture-guide',
      title: 'The Ultimate Guide to Standing Desk Posture & Ergonomics',
      excerpt: 'Learn the exact elbow angle, monitor eye height, and standing-to-sitting ratio for optimal spinal alignment during 8+ hour workdays.',
      date: 'Aug 4, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=800&q=80',
    },
    {
      slug: 'dual-motor-vs-single-motor',
      title: 'Why Dual-Motor Standing Desks Outperform Single-Motor Alternatives',
      excerpt: 'Discover why dual independent motors offer smoother lifting, higher weight capacity (125kg), and longer mechanical longevity.',
      date: 'Jul 28, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="py-16 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ergo Lab Science</span>
          </div>
          <h1 className="text-4xl font-black tracking-tight text-zinc-900">Workplace Ergonomics & Health</h1>
          <p className="text-zinc-600 text-sm sm:text-base">
            Expert insights, posture guides, and science-backed tips for dynamic active working.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="bg-zinc-50 border border-zinc-200 rounded-3xl overflow-hidden group hover:border-amber-500 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col justify-between"
            >
              <div className="aspect-16/9 bg-zinc-100 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6 space-y-4">
                <div className="flex items-center gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {post.readTime}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-zinc-900 group-hover:text-amber-600 transition-colors">
                  {post.title}
                </h2>

                <p className="text-zinc-600 text-xs leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
