import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, BookOpen, Calendar, Clock, MapPin, GraduationCap, Mail, ArrowRight, Tag } from 'lucide-react';
import { Metadata } from 'next';
import { getAllAuthors, getAuthorBySlug, getPostsByAuthor } from '@/lib/authors';

function LinkedInIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}

function TwitterIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const authors = getAllAuthors();
  return authors.map((author) => ({ slug: author.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    return {
      title: 'Author Not Found | Fittrock',
    };
  }

  return {
    title: `${author.name} - ${author.role} | Fittrock Ergonomics`,
    description: author.shortBio,
    openGraph: {
      title: `${author.name} | Fittrock`,
      description: author.bio,
      images: [{ url: author.avatar }],
    },
  };
}

export default async function AuthorProfilePage({ params }: Props) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) {
    notFound();
  }

  const posts = getPostsByAuthor(author.name);

  return (
    <div className="py-16 sm:py-24 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Back Link */}
        <Link
          href="/authors"
          className="inline-flex items-center gap-2 text-xs font-bold text-[#a32222] hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Authors</span>
        </Link>

        {/* Profile Card Header */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl overflow-hidden shadow-lg">
          {/* Cover Header */}
          <div className="h-44 sm:h-56 bg-gradient-to-r from-zinc-800 via-zinc-900 to-black relative">
            {author.coverImage && (
              <img
                src={author.coverImage}
                alt={author.name}
                className="w-full h-full object-cover opacity-30"
              />
            )}
          </div>

          {/* Profile Details */}
          <div className="px-6 sm:px-10 pb-8 pt-0 relative space-y-6">
            {/* Avatar & Action Row */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 -mt-20 mb-4">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-32 h-32 sm:w-36 sm:h-36 rounded-full object-cover border-4 border-white shadow-2xl"
              />

              {/* Social Links */}
              <div className="flex items-center gap-2 pt-2 sm:pt-0">
                {author.socials?.linkedin && (
                  <a
                    href={author.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white border border-zinc-200 text-zinc-700 hover:text-[#0077b5] rounded-xl shadow-xs transition-colors"
                    aria-label="LinkedIn Profile"
                  >
                    <LinkedInIcon className="w-4 h-4" />
                  </a>
                )}
                {author.socials?.twitter && (
                  <a
                    href={author.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-white border border-zinc-200 text-zinc-700 hover:text-black rounded-xl shadow-xs transition-colors"
                    aria-label="Twitter Profile"
                  >
                    <TwitterIcon className="w-4 h-4" />
                  </a>
                )}
                {author.socials?.email && (
                  <a
                    href={`mailto:${author.socials.email}`}
                    className="p-2.5 bg-white border border-zinc-200 text-zinc-700 hover:text-[#a32222] rounded-xl shadow-xs transition-colors"
                    aria-label="Email Author"
                  >
                    <Mail className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

            {/* Author Title & Bio */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-950">
                {author.name}
              </h1>
              <p className="text-sm sm:text-base font-bold text-[#a32222]">
                {author.role}
              </p>
            </div>

            {/* Meta Tags */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 pt-1">
              {author.location && (
                <span className="flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-1 rounded-full shadow-xs">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{author.location}</span>
                </span>
              )}
              {author.education && (
                <span className="flex items-center gap-1.5 bg-white border border-zinc-200 px-3 py-1 rounded-full shadow-xs">
                  <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                  <span>{author.education}</span>
                </span>
              )}
            </div>

            {/* Full Biography */}
            <div className="prose prose-zinc max-w-none pt-2 border-t border-zinc-200/80">
              <h3 className="text-base font-bold text-zinc-950 mb-2">About {author.name}</h3>
              <p className="text-zinc-700 text-sm leading-relaxed">
                {author.bio}
              </p>
            </div>

            {/* Areas of Expertise */}
            <div className="pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                Areas of Expertise
              </h4>
              <div className="flex flex-wrap gap-2">
                {author.expertise.map((exp, i) => (
                  <span
                    key={i}
                    className="bg-white border border-zinc-200 text-zinc-800 text-xs font-semibold px-3 py-1 rounded-xl shadow-xs"
                  >
                    {exp}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Articles Written by Author */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
            <h2 className="text-2xl font-bold text-zinc-950 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-[#a32222]" />
              <span>Articles by {author.name} ({posts.length})</span>
            </h2>

            <Link
              href="/blog"
              className="text-xs font-bold text-[#a32222] hover:underline"
            >
              Browse All Blog Posts &rarr;
            </Link>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-zinc-200 p-6">
              <p className="text-sm text-zinc-500">No articles published by this author yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-white border border-zinc-200 rounded-2xl overflow-hidden p-5 shadow-sm hover:shadow-md hover:border-zinc-900 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs text-zinc-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-zinc-950 group-hover:text-[#a32222] transition-colors leading-snug">
                      {post.title}
                    </h3>

                    <p className="text-xs text-zinc-600 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-zinc-100 flex items-center justify-between text-xs">
                    <span className="text-[#a32222] font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      Read Full Article <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
