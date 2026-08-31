import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Calendar, Clock, User, Tag, Share2, ArrowRight } from 'lucide-react';
import { Metadata } from 'next';
import { getBlogPostBySlug, getAllBlogPostSlugs } from '@/lib/blog';
import { getAuthorByName } from '@/lib/authors';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlogPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | Fittrock Blog',
    };
  }

  return {
    title: `${post.title} | Fittrock Ergo Lab`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [{ url: post.image }],
    },
  };
}

// Simple Markdown to HTML-like JSX renderer
function renderMarkdownContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inList = false;
  let listItems: string[] = [];

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join(' ').trim();
      if (text) {
        elements.push(
          <p key={`p-${elements.length}`} className="text-zinc-700 text-sm sm:text-base leading-relaxed my-4">
            {renderInlineMarkdown(text)}
          </p>
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 text-zinc-700 text-sm sm:text-base my-4 pl-2">
          {listItems.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineMarkdown(item)}
            </li>
          ))}
        </ul>
      );
      listItems = [];
      inList = false;
    }
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (!line) {
      flushParagraph();
      flushList();
      continue;
    }

    if (line.startsWith('### ')) {
      flushParagraph();
      flushList();
      elements.push(
        <h3 key={`h3-${i}`} className="text-lg sm:text-xl font-bold text-zinc-900 mt-6 mb-2">
          {line.replace('### ', '')}
        </h3>
      );
    } else if (line.startsWith('## ')) {
      flushParagraph();
      flushList();
      elements.push(
        <h2 key={`h2-${i}`} className="text-xl sm:text-2xl font-bold text-zinc-900 mt-8 mb-3 pb-2 border-b border-zinc-200">
          {line.replace('## ', '')}
        </h2>
      );
    } else if (line.startsWith('# ')) {
      flushParagraph();
      flushList();
      elements.push(
        <h1 key={`h1-${i}`} className="text-2xl sm:text-3xl font-extrabold text-zinc-900 mt-8 mb-4">
          {line.replace('# ', '')}
        </h1>
      );
    } else if (line.startsWith('- ') || line.startsWith('* ')) {
      flushParagraph();
      inList = true;
      listItems.push(line.slice(2));
    } else {
      flushList();
      currentParagraph.push(line);
    }
  }

  flushParagraph();
  flushList();

  return elements;
}

// Basic inline markdown (bold **text**, italic *text*, links)
function renderInlineMarkdown(text: string): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*|\*.*?\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={index} className="font-bold text-zinc-950">{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('*') && part.endsWith('*')) {
      return <em key={index} className="italic text-zinc-800">{part.slice(1, -1)}</em>;
    }
    return part;
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const author = getAuthorByName(post.author);

  return (
    <article className="py-16 sm:py-24 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10">
        {/* Navigation & Category */}
        <div className="flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#a32222] hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          {post.tags && post.tags.length > 0 && (
            <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-800 text-xs font-semibold px-3 py-1 rounded-full border border-zinc-200">
              <Tag className="w-3 h-3 text-zinc-500" />
              {post.tags[0]}
            </span>
          )}
        </div>

        {/* Title & Meta */}
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-950 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-zinc-500 pt-2 border-b border-zinc-100 pb-4">
            <Link
              href={author ? `/authors/${author.slug}` : '/authors'}
              className="flex items-center gap-2 group hover:text-[#a32222] transition-colors"
            >
              <img
                src={post.authorAvatar || author?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={post.author}
                className="w-8 h-8 rounded-full object-cover border border-zinc-200"
              />
              <div>
                <span className="font-bold text-zinc-900 group-hover:text-[#a32222] block">{post.author}</span>
                <span className="text-[11px] text-zinc-500">{post.authorRole}</span>
              </div>
            </Link>

            <span className="hidden sm:inline text-zinc-300">|</span>

            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-zinc-400" /> {post.date}
            </span>

            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-zinc-400" /> {post.readTime}
            </span>
          </div>
        </div>

        {/* Featured Banner Image */}
        <div className="aspect-16/9 rounded-3xl overflow-hidden bg-zinc-100 border border-zinc-200 shadow-md">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Article Body */}
        <div className="prose prose-zinc max-w-none pt-2">
          {renderMarkdownContent(post.content)}
        </div>

        {/* ======================================================== */}
        {/* AUTHOR INTRO CARD AT BOTTOM OF BLOG POST                */}
        {/* ======================================================== */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Link href={author ? `/authors/${author.slug}` : '/authors'} className="shrink-0 group">
              <img
                src={author?.avatar || post.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt={post.author}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-2 border-white shadow-md group-hover:scale-105 transition-transform"
              />
            </Link>

            <div className="space-y-2 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                    Written By
                  </span>
                  <Link
                    href={author ? `/authors/${author.slug}` : '/authors'}
                    className="text-lg sm:text-xl font-bold text-zinc-950 hover:text-[#a32222] transition-colors"
                  >
                    {post.author}
                  </Link>
                  <p className="text-xs font-semibold text-[#a32222]">
                    {post.authorRole}
                  </p>
                </div>

                {author && (
                  <Link
                    href={`/authors/${author.slug}`}
                    className="inline-flex items-center gap-1 text-xs font-bold text-zinc-900 bg-white border border-zinc-200 hover:border-zinc-900 px-3.5 py-1.5 rounded-xl shadow-xs transition-colors"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                {author?.shortBio || `${post.author} is a workplace health specialist contributing ergonomics, setup tutorials, and biomechanics research at Fittrock.`}
              </p>
            </div>
          </div>
        </div>

        {/* Share & Footer */}
        <div className="border-t border-zinc-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-zinc-500">
            Published under <span className="font-bold text-zinc-800">{post.tags?.join(', ') || 'Ergonomics'}</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/authors"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-700 hover:text-black border border-zinc-200 px-4 py-2 rounded-xl transition-colors"
            >
              <span>All Authors</span>
            </Link>

            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold text-white bg-zinc-950 hover:bg-zinc-800 px-5 py-2.5 rounded-xl shadow transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Explore More Posts</span>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
