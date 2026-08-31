import React from 'react';
import Link from 'next/link';
import { Users, ArrowRight, BookOpen, MapPin, GraduationCap, Mail } from 'lucide-react';
import { Metadata } from 'next';
import { getAllAuthors, getPostsByAuthor } from '@/lib/authors';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Authors & Ergonomics Experts | Fittrock',
  description: 'Meet the team of orthopedic specialists, industrial designers, and workspace architects writing for the Fittrock Ergo Lab blog.',
};

export default function AuthorsPage() {
  const authors = getAllAuthors();

  return (
    <div className="py-16 sm:py-24 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Ergonomics Editorial Team</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-950">
            Meet Our Authors &amp; Experts
          </h1>
          <p className="text-zinc-600 text-sm sm:text-base max-w-2xl mx-auto font-normal">
            Discover the specialists behind our science-backed ergonomic guides, dual-motor engineering reviews, and posture tutorials.
          </p>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {authors.map((author) => {
            const authorPosts = getPostsByAuthor(author.name);

            return (
              <div
                key={author.id}
                className="bg-zinc-50/70 border border-zinc-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Author Header Banner */}
                  <div className="h-28 bg-gradient-to-r from-zinc-800 to-zinc-950 relative overflow-hidden">
                    {author.coverImage && (
                      <img
                        src={author.coverImage}
                        alt={author.name}
                        className="w-full h-full object-cover opacity-35 group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>

                  {/* Profile Info */}
                  <div className="px-6 pb-6 pt-0 relative space-y-4">
                    {/* Floating Avatar */}
                    <div className="-mt-14 mb-3 inline-block">
                      <img
                        src={author.avatar}
                        alt={author.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform"
                      />
                    </div>

                    <div>
                      <Link
                        href={`/authors/${author.slug}`}
                        className="text-xl font-bold text-zinc-950 hover:text-[#a32222] transition-colors block leading-snug"
                      >
                        {author.name}
                      </Link>
                      <p className="text-xs font-semibold text-[#a32222] mt-0.5">
                        {author.role}
                      </p>
                    </div>

                    <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed line-clamp-3">
                      {author.shortBio}
                    </p>

                    {/* Location & Credentials */}
                    <div className="space-y-1.5 text-xs text-zinc-500 pt-2 border-t border-zinc-200/80">
                      {author.location && (
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{author.location}</span>
                        </div>
                      )}
                      {author.education && (
                        <div className="flex items-center gap-1.5 line-clamp-1">
                          <GraduationCap className="w-3.5 h-3.5 text-zinc-400" />
                          <span>{author.education}</span>
                        </div>
                      )}
                    </div>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {author.expertise.slice(0, 3).map((exp, i) => (
                        <span
                          key={i}
                          className="bg-white border border-zinc-200 text-zinc-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Button */}
                <div className="p-6 pt-0 border-t border-zinc-200/60 bg-white flex items-center justify-between">
                  <span className="text-xs text-zinc-500 font-medium pt-4 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                    <span>{authorPosts.length} Articles Written</span>
                  </span>

                  <Link
                    href={`/authors/${author.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#a32222] hover:underline pt-4 group-hover:translate-x-0.5 transition-transform"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
