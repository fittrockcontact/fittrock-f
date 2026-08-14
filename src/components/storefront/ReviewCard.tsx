import React from 'react';
import { Star, CheckCircle2, Quote } from 'lucide-react';
import Link from 'next/link';

export interface ReviewItem {
  id?: string;
  name?: string;
  customerName?: string;
  role?: string;
  jobTitle?: string;
  avatar?: string;
  rating: number;
  comment?: string | null;
  body?: string | null;
  title?: string | null;
  productName?: string;
  productSlug?: string;
  isVerifiedPurchase?: boolean;
  createdAt?: string | Date;
}

export interface ReviewCardProps {
  review: ReviewItem;
  showProductLink?: boolean;
  className?: string;
}

export function ReviewCard({ review, showProductLink = false, className = '' }: ReviewCardProps) {
  const authorName = review.name || review.customerName || review.title || 'Verified Customer';
  const authorRole = review.jobTitle || review.role || 'Verified Buyer';
  const reviewText = review.comment || review.body || '';
  const starCount = Math.max(1, Math.min(5, Number(review.rating) || 5));
  
  // High quality avatar fallback if missing
  const avatarUrl =
    review.avatar ||
    `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80`;

  return (
    <div
      className={`bg-white border border-zinc-200 rounded-3xl p-6 sm:p-7 space-y-5 shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-300 flex flex-col justify-between group ${className}`}
    >
      {/* Top Header: Star Rating & Verified Purchase Badge */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex text-amber-400 gap-0.5">
            {[...Array(starCount)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
            ))}
          </div>
          {review.isVerifiedPurchase !== false && (
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-0.5 rounded-full">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Verified Purchase</span>
            </span>
          )}
        </div>

        {/* Review Text Area */}
        <div className="relative">
          <p className="text-zinc-700 text-xs sm:text-sm leading-relaxed font-normal">
            &ldquo;{reviewText}&rdquo;
          </p>
        </div>
      </div>

      {/* Bottom Section: Profile Avatar, Name, Job Title & Optional Product Link */}
      <div className="pt-4 border-t border-zinc-100 space-y-3">
        <div className="flex items-center gap-3.5">
          <div className="relative w-11 h-11 rounded-full overflow-hidden shrink-0 border-2 border-amber-400/40 bg-zinc-100 shadow-sm">
            <img
              src={avatarUrl}
              alt={authorName}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h4 className="font-bold text-sm text-zinc-900 truncate">
              {authorName}
            </h4>
            <p className="text-xs text-zinc-500 font-medium truncate">
              {authorRole}
            </p>
          </div>
        </div>

        {/* Optional Tag Linking to Product */}
        {showProductLink && review.productName && review.productSlug && (
          <div className="pt-1">
            <Link
              href={`/products/${review.productSlug}`}
              className="inline-block text-[11px] font-semibold text-amber-700 hover:text-amber-800 hover:underline transition-colors"
            >
              Purchased: <span className="text-zinc-700">{review.productName}</span> →
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
