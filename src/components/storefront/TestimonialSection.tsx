'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, X, CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { apiFetch } from '@/lib/api-client';

interface ReviewItem {
  id: string;
  name: string;
  avatar?: string;
  role?: string;
  rating: number;
  comment: string;
  createdAt?: string;
  timeAgo?: string;
}

export function TestimonialSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [reviews, setReviews] = useState<ReviewItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Default reviews matching the screenshot
  const defaultReviews: ReviewItem[] = [
    {
      id: 'rev-davinder',
      name: 'Davinder Kumar',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment:
        'Incredible! Simple to build, works exactly as it should and fits so well into my office. Great for the price - Thank You Fittrock! definitely recommend.',
      timeAgo: '10 months ago',
    },
    {
      id: 'rev-pralhad',
      name: 'Pralhad Sonar',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment:
        'Value for Money! The Standing Desk by Fittrock is a perfect blend of comfort, style, and productivity. Its sturdy design, smooth height adjustment, and ergonomic features make it ideal for long work hours. A...',
      timeAgo: '10 months ago',
    },
    {
      id: 'rev-prajwal',
      name: 'Prajwal Raju Tulawe',
      avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment:
        'Extremely high-grade material used for this table frame. It is very easy to assemble also they have a very good tech support. The salespersons are nice, suggest us appropriate desk as per our requirement and..',
      timeAgo: '6 months ago',
    },
    {
      id: 'rev-gopala',
      name: 'Gopala Ganeshan Subbiah',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment:
        'I recently purchased the single Motor White Height Adjustable Standing Desk from Fittrock, and I am genuinely impressed with the overall quality and value it offers. The wood quality of the tabletop is excellent and sturdy.',
      timeAgo: '3 weeks ago',
    },
    {
      id: 'rev-vikram',
      name: 'Vikram Malhotra',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
      rating: 5,
      comment:
        'Delivery was quick and assembly took less than 30 minutes with the clear instructions. Anti-collision gyro sensor works like a charm.',
      timeAgo: '1 month ago',
    },
  ];

  // Fetch reviews from Supabase database API on mount
  useEffect(() => {
    async function loadReviews() {
      try {
        const res = await apiFetch<{ reviews: any[] }>('/api/products/testimonials/all');
        if (res?.reviews && res.reviews.length > 0) {
          const mapped: ReviewItem[] = res.reviews.map((r: any) => ({
            id: r.id,
            name: r.name || r.customerName || 'Verified Customer',
            avatar: r.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
            role: r.role || 'Verified Customer',
            rating: Number(r.rating) || 5,
            comment: r.comment || r.body || '',
            timeAgo: calculateTimeAgo(r.createdAt),
          }));
          setReviews(mapped);
        } else {
          setReviews(defaultReviews);
        }
      } catch (err) {
        console.error('Error fetching database reviews, using defaults:', err);
        setReviews(defaultReviews);
      }
    }
    loadReviews();
  }, []);

  function calculateTimeAgo(dateString?: string) {
    if (!dateString) return 'Recently';
    const date = new Date(dateString);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays <= 1) return 'Today';
    if (diffDays < 30) return `${diffDays} days ago`;
    const diffMonths = Math.floor(diffDays / 30);
    if (diffMonths < 12) return `${diffMonths} months ago`;
    return `${Math.floor(diffMonths / 12)} years ago`;
  }

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -420 : 420;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }
    if (!comment.trim()) {
      toast.error('Please write your review comment');
      return;
    }

    setSubmitting(true);
    try {
      const res = await apiFetch<{ success: boolean; review: any }>('/api/products/reviews/new', {
        method: 'POST',
        body: JSON.stringify({
          name: name.trim(),
          rating,
          title: title.trim() || 'Verified Customer Review',
          body: comment.trim(),
        }),
      });

      if (res?.success) {
        toast.success('Thank you! Your review has been submitted.');
        const newRev: ReviewItem = {
          id: res.review.id || `rev-${Date.now()}`,
          name: name.trim(),
          rating,
          comment: comment.trim(),
          avatar: res.review.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
          timeAgo: 'Just now',
        };
        setReviews((prev) => [newRev, ...prev]);

        // Reset and close
        setName('');
        setTitle('');
        setComment('');
        setRating(5);
        setModalOpen(false);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to submit review';
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-[#dae5eb] via-[#94b4c7] to-[#2b5166] text-zinc-900 relative overflow-hidden border-b border-zinc-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 space-y-2">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950">
            Trusted by thousands of happy customers
          </h2>
          <p className="text-sm sm:text-base text-zinc-800 font-normal">
            Don&apos;t just take our word for it.
          </p>
        </div>

        {/* Slidable Cards Container */}
        <div className="relative group mb-12 sm:mb-14">
          {/* Left Arrow Button */}
          <button
            onClick={() => scroll('left')}
            aria-label="Previous reviews"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 w-11 h-11 rounded-full bg-[#1e1e1e]/90 text-white shadow-2xl flex items-center justify-center hover:bg-black active:scale-95 transition-all z-20 focus:outline-none"
          >
            <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
          </button>

          {/* Cards Track */}
          <div
            ref={sliderRef}
            className="flex gap-6 sm:gap-8 overflow-x-auto scroll-smooth no-scrollbar py-2 px-2 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayReviews.map((rev) => {
              const isExpanded = expandedReviewId === rev.id;

              return (
                <div
                  key={rev.id}
                  className="w-[300px] sm:w-[360px] md:w-[400px] bg-[#222222] text-white rounded-2xl p-6 sm:p-7 shadow-2xl shrink-0 snap-start flex flex-col justify-between border border-zinc-700/60 transition-transform hover:-translate-y-1 duration-300"
                >
                  <div className="space-y-3">
                    {/* Top Row: Stars + Time Ago */}
                    <div className="flex items-center justify-between">
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-zinc-600 fill-zinc-600'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] text-zinc-400 font-normal">
                        {rev.timeAgo || 'Verified'}
                      </span>
                    </div>

                    {/* Review Body */}
                    <p
                      className={`text-xs sm:text-[13px] text-zinc-200 leading-relaxed ${
                        isExpanded ? '' : 'line-clamp-4'
                      }`}
                    >
                      {rev.comment}
                    </p>

                    {rev.comment.length > 140 && (
                      <button
                        onClick={() =>
                          setExpandedReviewId(isExpanded ? null : rev.id)
                        }
                        className="text-[11px] text-zinc-400 hover:text-white underline block"
                      >
                        {isExpanded ? 'Show less' : 'Show more'}
                      </button>
                    )}
                  </div>

                  {/* Bottom Row: User Avatar & Name */}
                  <div className="flex items-center gap-3.5 pt-5 mt-4 border-t border-zinc-800">
                    <img
                      src={rev.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover border border-zinc-700 shadow-sm"
                    />
                    <div>
                      <h4 className="text-xs sm:text-sm font-semibold text-white">
                        {rev.name}
                      </h4>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={() => scroll('right')}
            aria-label="Next reviews"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-6 w-11 h-11 rounded-full bg-[#1e1e1e]/90 text-white shadow-2xl flex items-center justify-center hover:bg-black active:scale-95 transition-all z-20 focus:outline-none"
          >
            <ChevronRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Leave a Review Action Button */}
        <div className="text-center">
          <button
            onClick={() => setModalOpen(true)}
            className="bg-[#242424] hover:bg-[#171717] text-white font-medium px-9 py-3.5 rounded-xl shadow-xl hover:shadow-2xl active:scale-95 transition-all text-sm sm:text-base border border-zinc-700/80"
          >
            Leave a Review
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* LEAVE A REVIEW POPUP MODAL (Connected to Supabase DB)    */}
      {/* ======================================================== */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white text-zinc-900 rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-zinc-200 relative animate-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-700 rounded-lg transition-colors"
              aria-label="Close review modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Heading */}
            <div className="mb-6 space-y-1">
              <h3 className="text-xl font-bold text-zinc-950">Write a Review</h3>
              <p className="text-xs text-zinc-500">
                Share your experience with Fittrock Ergonomic Desks.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              {/* Star Rating Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1.5">
                  Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-amber-400 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-zinc-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 text-xs font-bold text-zinc-700">
                    {rating} out of 5 Stars
                  </span>
                </div>
              </div>

              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1">
                  Your Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Davinder Kumar"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              {/* Review Headline (Optional) */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1">
                  Review Headline (Optional)
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Best desk for daily WFH"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black"
                />
              </div>

              {/* Review Body */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-600 mb-1">
                  Review Details <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about the build quality, motor smoothness, assembly, or ergonomics..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:border-black focus:ring-1 focus:ring-black resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-zinc-950 hover:bg-zinc-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting to Database...</span>
                    </>
                  ) : (
                    <span>Submit Review</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
