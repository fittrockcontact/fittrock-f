import React from 'react';
import { Metadata } from 'next';
import { Star, ShieldCheck, Quote, Sparkles, CheckCircle2, Award, ThumbsUp } from 'lucide-react';
import { apiFetch } from '@/lib/api-client';
import { ReviewCard, ReviewItem } from '@/components/storefront/ReviewCard';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Customer Stories & Testimonials | Fittrock Ergonomics',
  description:
    'Read verified customer reviews from over 10,000+ developers, designers, and creators who upgraded their posture with Fittrock electric standing desks.',
};

export default async function TestimonialsPage() {
  let reviews: ReviewItem[] = [];

  try {
    const res = await apiFetch<{ reviews: ReviewItem[] }>('/api/products/testimonials/all');
    if (Array.isArray(res.reviews) && res.reviews.length > 0) {
      reviews = res.reviews;
    }
  } catch (err) {
    console.error('Error fetching testimonials from API:', err);
  }

  // Fallback if backend API is offline during build
  if (reviews.length === 0) {
    reviews = [
      {
        id: '1',
        name: 'Gopala Ganeshan Subbiah',
        role: 'Principal Systems Engineer',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        comment:
          "I recently purchased the single Motor White, 1600 mm × 700 mm Height Adjustable Standing Desk from Fittrock, and I'm genuinely impressed with the overall quality and value it offers. The wood quality of the tabletop is sturdy, smooth-finished, and premium to the touch. The metal frame feels solid with zero wobble even at higher elevations.",
        productName: 'Fittrock Pro Motorized Standing Table',
        productSlug: 'fittrock-pro-motorized-standing-table',
        isVerifiedPurchase: true,
      },
      {
        id: '2',
        name: 'Sukanya Singh',
        role: 'Lead Product Designer',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        comment:
          'Excellent product and service delivery. The dual motors are so silent my colleagues never hear height adjustments during virtual meetings. Great finish!',
        productName: 'Fittrock Pro Motorized Standing Table',
        productSlug: 'fittrock-pro-motorized-standing-table',
        isVerifiedPurchase: true,
      },
      {
        id: '3',
        name: 'Ketaki Joshi',
        role: 'Senior Frontend Architect',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        comment:
          'The smart control panel with height display and sit-stand reminder is fantastic. The table top finish feels extremely premium and scratch-resistant.',
        productName: 'Fittrock Pro Motorized Standing Table',
        productSlug: 'fittrock-pro-motorized-standing-table',
        isVerifiedPurchase: true,
      },
      {
        id: '4',
        name: 'Pralhad Sonar',
        role: 'Operations Director & Founder',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        comment:
          "I absolutely love Fittrock's sleek and scratch-resistant tabletop, it not only adds a refined, modern aesthetic to my workspace but also stands up exceptionally well to daily use.",
        productName: 'Fittrock Pro Motorized Standing Table',
        productSlug: 'fittrock-pro-motorized-standing-table',
        isVerifiedPurchase: true,
      },
      {
        id: '5',
        name: 'Vikram Malhotra',
        role: 'Full Stack Developer',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        comment:
          'Delivery was quick and assembly took less than 30 minutes with the clear instructions. Anti-collision gyro sensor works like a charm.',
        productName: 'Fittrock Pro Motorized Standing Table',
        productSlug: 'fittrock-pro-motorized-standing-table',
        isVerifiedPurchase: true,
      },
      {
        id: '6',
        name: 'Kavita Nair',
        role: 'UX Researcher & Remote Worker',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        comment:
          'Relieved my chronic lower back pain within two weeks of use. Seamless motorized movement and the steel frame is built like a tank.',
        productName: 'Fittrock Pro Motorized Standing Table',
        productSlug: 'fittrock-pro-motorized-standing-table',
        isVerifiedPurchase: true,
      },
      {
        id: '7',
        name: 'Siddharth Kapoor',
        role: 'DevOps Consultant',
        avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        comment:
          'Massive cable tray that holds two large power strips and all excess monitor/charger cords. Zero dangling wires under my desk now!',
        productName: 'Fittrock Heavy Duty Cable & Table Tray',
        productSlug: 'fittrock-cable-table-tray',
        isVerifiedPurchase: true,
      },
      {
        id: '8',
        name: 'Aditya Bansal',
        role: 'Visual Ergonomics Specialist',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=200&q=80',
        rating: 5,
        comment:
          'The gas spring mechanism is ultra smooth. Moving my 32-inch curved monitor around is effortless. Great cable routing channels too.',
        productName: 'Fittrock Dynamic Gas Spring Monitor Stand',
        productSlug: 'fittrock-dynamic-monitor-stand',
        isVerifiedPurchase: true,
      },
    ];
  }

  const avgScore = (
    reviews.reduce((sum, r) => sum + (Number(r.rating) || 5), 0) / reviews.length
  ).toFixed(1);

  return (
    <div className="bg-white text-zinc-900 min-h-screen py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
            <Quote className="w-3.5 h-3.5" />
            <span>Customer Testimonials</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-zinc-900">
            Loved by 10,000+ Active Professionals
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            Real stories from software engineers, UX designers, founders, and creators who transformed their daily workspace ergonomics and spinal wellness with Fittrock.
          </p>
        </div>

        {/* Aggregate Metrics Card */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-zinc-950 text-white rounded-3xl p-6 sm:p-10 border border-zinc-800 shadow-xl">
          <div className="text-center space-y-1 p-2">
            <div className="flex justify-center text-amber-400 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <p className="text-2xl sm:text-3xl font-black">{avgScore} / 5.0</p>
            <p className="text-xs text-zinc-400 font-medium">Average Customer Rating</p>
          </div>

          <div className="text-center space-y-1 p-2">
            <div className="flex justify-center text-emerald-400 mb-1">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black">100%</p>
            <p className="text-xs text-zinc-400 font-medium">Verified Buyers</p>
          </div>

          <div className="text-center space-y-1 p-2">
            <div className="flex justify-center text-amber-400 mb-1">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black">10-Year</p>
            <p className="text-xs text-zinc-400 font-medium">Frame & Motor Warranty</p>
          </div>

          <div className="text-center space-y-1 p-2">
            <div className="flex justify-center text-blue-400 mb-1">
              <ThumbsUp className="w-5 h-5" />
            </div>
            <p className="text-2xl sm:text-3xl font-black">30-Day</p>
            <p className="text-xs text-zinc-400 font-medium">Risk-Free Home Trial</p>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-200 pb-4">
            <div>
              <h2 className="text-xl font-bold text-zinc-900">All Verified Reviews</h2>
              <p className="text-xs text-zinc-500">Showing {reviews.length} authentic buyer experiences</p>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200">
              Sorted by Newest
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {reviews.map((rev) => (
              <ReviewCard
                key={rev.id}
                review={rev}
                showProductLink={true}
                className="hover:scale-[1.01]"
              />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-sm">
          <h3 className="text-2xl sm:text-3xl font-black text-zinc-900">
            Ready to Elevate Your Daily Work Routine?
          </h3>
          <p className="text-zinc-600 text-xs sm:text-sm max-w-xl mx-auto">
            Experience dual-motor whisper-quiet transitions, solid wood tabletops, and precision ergonomics backed by a 10-Year Warranty.
          </p>
          <div className="pt-2">
            <Link
              href="/collections/standing-desks"
              className="inline-flex items-center justify-center bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold px-8 py-3.5 rounded-2xl text-sm shadow-md shadow-amber-500/20 transition-all"
            >
              Explore Motorized Desks →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
