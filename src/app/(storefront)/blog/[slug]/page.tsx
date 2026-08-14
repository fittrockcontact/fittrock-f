import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock, User } from 'lucide-react';
import { Metadata } from 'next';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const formatted = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${formatted} | Fittrock Blog`,
    description: `Read our comprehensive guide on ${formatted} for optimal workplace ergonomics.`,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  const formattedTitle = slug
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return (
    <article className="py-16 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Ergo Lab</span>
        </Link>

        <div className="space-y-4">
          <div className="flex items-center gap-4 text-xs text-zinc-500">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" /> Aug 4, 2026
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> 5 min read
            </span>
            <span className="flex items-center gap-1 text-zinc-600">
              <User className="w-3.5 h-3.5" /> Dr. Rahul Vance, Ergonomist
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            {formattedTitle}
          </h1>
        </div>

        <div className="aspect-16/9 rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&w=1200&q=80"
            alt={formattedTitle}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="max-w-none text-zinc-700 text-sm leading-relaxed space-y-4">
          <p>
            Sitting statically for 8+ hours a day places sustained mechanical stress on your lower lumbar vertebrae and restricts venous blood flow. Alternating between sitting and standing every 45 minutes reduces fatigue and increases cognitive focus.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 pt-4">Rule 1: The 90-Degree Elbow Angle</h2>
          <p>
            When standing at your Fittrock desk, set the electric height memory preset so your forearms rest parallel to the desktop surface, forming a 90-to-100 degree bend at the elbow.
          </p>

          <h2 className="text-xl font-bold text-zinc-900 pt-4">Rule 2: Eye Level Monitor Clearance</h2>
          <p>
            The top third of your dual monitors should align with your natural horizontal eye line. Use a heavy-duty gas-spring monitor arm to elevate screens without neck strain.
          </p>
        </div>
      </div>
    </article>
  );
}
