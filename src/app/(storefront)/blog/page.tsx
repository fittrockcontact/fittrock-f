import React from 'react';
import Link from 'next/link';
import { BookOpen, Calendar, Clock, User, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { getAllBlogPosts } from '@/lib/blog';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Ergo Lab & Workplace Health Blog | Fittrock',
  description: 'Guides on standing desk posture, lumbar alignment, dual-motor maintenance, and daily productivity science.',
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="py-16 sm:py-24 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Ergo Lab &amp; Science Blog</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900">
            Workplace Ergonomics &amp; Health
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto">
            Expert insights, posture guides, and science-backed tips for dynamic active working.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {posts.length === 0 ? (
          <div className="text-center py-20 bg-zinc-50 border border-zinc-200 rounded-3xl p-8 space-y-3">
            <p className="text-zinc-500 text-sm">No blog posts found in <code className="text-zinc-800 font-mono font-bold bg-zinc-200 px-1.5 py-0.5 rounded">content/</code> directory.</p>
            <p className="text-xs text-zinc-400">Add a .md file to frontend/content/ to create your first post!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="bg-white border border-zinc-200/90 rounded-3xl overflow-hidden group hover:border-zinc-900 transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div>
                  {/* Featured Cover Image */}
                  <div className="aspect-16/9 bg-zinc-100 overflow-hidden relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {post.tags && post.tags.length > 0 && (
                      <span className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                        {post.tags[0]}
                      </span>
                    )}
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3.5">
                    <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-zinc-400" /> {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg sm:text-xl font-bold text-zinc-900 group-hover:text-[#a32222] transition-colors leading-snug">
                      {post.title}
                    </h2>

                    <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Author & Read More */}
                <div className="p-6 pt-0 border-t border-zinc-100 flex items-center justify-between text-xs mt-4">
                  <div className="flex items-center gap-2 pt-3">
                    <img
                      src={post.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                      alt={post.author}
                      className="w-6 h-6 rounded-full object-cover border border-zinc-200"
                    />
                    <span className="font-semibold text-zinc-700 text-[11px]">{post.author}</span>
                  </div>

                  <span className="text-[#a32222] font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform pt-3">
                    Read Post <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
