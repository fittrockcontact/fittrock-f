'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Lock, CheckCircle2 } from 'lucide-react';

function GoogleIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
      />
      <path
        fill="#34A853"
        d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
      />
      <path
        fill="#FBBC05"
        d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
      />
      <path
        fill="#EA4335"
        d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
      />
    </svg>
  );
}

function GoogleLogoText() {
  return (
    <div className="flex items-center text-lg sm:text-xl font-bold tracking-tight select-none">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span>
    </div>
  );
}

interface GoogleReview {
  id: string;
  author_name: string;
  author_url: string | null;
  date: string;
  avatar: string | null;
  rating: number;
  comment: string;
}

interface GoogleReviewsResponse {
  rating: number | null;
  totalReviews: number;
  mapsUrl: string | null;
  reviews: GoogleReview[];
}

const GOOGLE_REVIEWS_URL = 'https://share.google/ERo5PamELGZZmvh1S';

function ratingLabel(rating: number): string {
  if (rating >= 4.5) return 'Excellent';
  if (rating >= 4) return 'Very Good';
  if (rating >= 3) return 'Good';
  return 'Rated';
}

export function GoogleReviewsTrustSection() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [google, setGoogle] = useState<GoogleReviewsResponse | null>(null);

  // Live reviews from the Fittrock Google Business Profile (via /api/google-reviews)
  useEffect(() => {
    fetch('/api/google-reviews')
      .then((res) => (res.ok ? res.json() : null))
      .then((data: GoogleReviewsResponse | null) => {
        if (data?.reviews?.length) setGoogle(data);
      })
      .catch((e) => console.error('Error fetching Google reviews:', e));
  }, []);

  const reviewsList = google?.reviews ?? [];
  const rating = google?.rating ?? 0;
  const reviewsUrl = google?.mapsUrl || GOOGLE_REVIEWS_URL;

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -310 : 310;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white text-zinc-900 border-b border-zinc-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
        
        {/* ======================================================== */}
        {/* 1. GOOGLE REVIEW HEADER & SLIDER                         */}
        {/* ======================================================== */}
        {google && (
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-1.5">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-900">
              {ratingLabel(rating)}
            </h3>
            <div className="flex items-center justify-center gap-1 text-amber-400" aria-label={`Rated ${rating} out of 5`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.round(rating) ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'}`}
                />
              ))}
            </div>
            <p className="text-xs text-zinc-500 font-medium">
              <span className="font-bold text-zinc-800">{rating.toFixed(1)}</span> · Based on{' '}
              <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-zinc-800 underline">
                {google.totalReviews} Google Reviews
              </a>
            </p>
            <div className="pt-0.5 flex justify-center">
              <GoogleLogoText />
            </div>
          </div>

          {/* Cards Carousel Container */}
          <div className="relative group">
            {/* Left Arrow Button */}
            <button
              onClick={() => scroll('left')}
              aria-label="Previous Google reviews"
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 sm:-translate-x-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-zinc-700 border border-zinc-200 shadow-md flex items-center justify-center hover:bg-zinc-50 active:scale-95 transition-all z-20"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Cards Track */}
            <div
              ref={sliderRef}
              className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth no-scrollbar py-2 px-2 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {reviewsList.map((rev) => {
                const isExpanded = expandedId === rev.id;

                return (
                  <div
                    key={rev.id}
                    className="w-[260px] sm:w-[290px] md:w-[310px] bg-[#f8f9fa] border border-zinc-200/80 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow shrink-0 snap-start flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      {/* User Info + Google G Icon */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          {rev.avatar ? (
                            <img
                              src={rev.avatar}
                              alt=""
                              referrerPolicy="no-referrer"
                              loading="lazy"
                              className="w-9 h-9 rounded-full object-cover border border-zinc-300 shadow-xs"
                            />
                          ) : (
                            <div className="w-9 h-9 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center text-xs font-bold text-zinc-600">
                              {rev.author_name.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <h4 className="text-xs sm:text-[13px] font-bold text-zinc-900 leading-tight line-clamp-1">
                              {rev.author_url ? (
                                <a href={rev.author_url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                                  {rev.author_name}
                                </a>
                              ) : (
                                rev.author_name
                              )}
                            </h4>
                            <p className="text-[11px] text-zinc-500">{rev.date}</p>
                          </div>
                        </div>
                        <GoogleIcon className="w-4 h-4 shrink-0 mt-0.5" />
                      </div>

                      {/* 5 Stars */}
                      <div className="flex text-amber-400 gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-zinc-300'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Comment text */}
                      <p
                        className={`text-xs text-zinc-700 leading-relaxed ${
                          isExpanded ? '' : 'line-clamp-3'
                        }`}
                      >
                        {rev.comment}
                      </p>

                      {rev.comment.length > 100 && (
                        <button
                          onClick={() => setExpandedId(isExpanded ? null : rev.id)}
                          className="text-[11px] text-zinc-500 hover:text-zinc-900 font-semibold underline block pt-0.5"
                        >
                          {isExpanded ? 'Show Less' : 'Read More'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Arrow Button */}
            <button
              onClick={() => scroll('right')}
              aria-label="Next Google reviews"
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 sm:translate-x-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white text-zinc-700 border border-zinc-200 shadow-md flex items-center justify-center hover:bg-zinc-50 active:scale-95 transition-all z-20"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex justify-center pt-1">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-zinc-600 hover:text-zinc-900 underline"
            >
              Read all reviews on Google
            </a>
          </div>
        </div>
        )}

        {/* ======================================================== */}
        {/* 2. SSL, ISO & PAYMENT METHODS BADGES STRIP               */}
        {/* ======================================================== */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 py-6 border-t border-zinc-200/80">
          {/* SSL Secured Badge */}
          <div className="inline-flex items-center gap-2 bg-[#52b72c] text-white px-4 py-2 rounded-full shadow-sm">
            <Lock className="w-4 h-4 text-white fill-white" />
            <span className="text-xs sm:text-sm font-black tracking-wide uppercase">
              SSL Secured
            </span>
          </div>

          {/* ISO Badge */}
          <div className="flex items-center gap-2">
            <div className="w-11 h-11 rounded-full border-2 border-[#1a4a75] flex flex-col items-center justify-center text-[#1a4a75] leading-none">
              <span className="text-[7px] font-black uppercase">9001</span>
              <span className="text-[10px] font-black tracking-tighter">ISO</span>
              <span className="text-[6px] font-semibold uppercase">Certified</span>
            </div>
          </div>

          {/* Payment Method Marks */}
          <div className="flex items-center gap-4 sm:gap-6 opacity-90 grayscale-0">
            {/* VISA */}
            <span className="font-black italic text-lg text-[#1a1f71] tracking-tighter">
              VISA
            </span>

            {/* MasterCard */}
            <div className="flex items-center">
              <div className="w-5 h-5 rounded-full bg-[#EB001B] opacity-90" />
              <div className="w-5 h-5 rounded-full bg-[#F79E1B] -ml-2.5 opacity-90" />
            </div>

            {/* American Express */}
            <span className="font-black text-xs sm:text-sm bg-[#006fcf] text-white px-2 py-0.5 rounded tracking-tighter">
              AMEX
            </span>

            {/* Google Pay */}
            <div className="flex items-center gap-0.5 text-xs sm:text-sm font-bold text-zinc-700">
              <span className="text-[#4285F4]">G</span>
              <span className="text-zinc-600 font-semibold">Pay</span>
            </div>

            {/* BHIM UPI */}
            <div className="flex items-center text-xs font-black italic tracking-tighter text-[#097939]">
              BHIM<span className="text-[#0072bc] ml-0.5">UPI</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
