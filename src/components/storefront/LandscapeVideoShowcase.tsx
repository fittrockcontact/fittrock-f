'use client';

import React, { useState, useRef } from 'react';
import { Play, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

interface LandscapeVideoItem {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  views?: string;
}

export function LandscapeVideoShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Exact landscape videos from https://www.youtube.com/@FITTROCK/videos
  const landscapeVideos: LandscapeVideoItem[] = [
    {
      id: '1TA8liAn65o',
      title: 'Why FittRock Standing Desk is Best in the Market | 2026 | Premium',
      thumbnail: 'https://i.ytimg.com/vi/1TA8liAn65o/hqdefault.jpg',
      duration: '1:27',
    },
    {
      id: 'a9StXdhUPFc',
      title: 'RATI Desk = Next Level Productivity 🚀 @FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/a9StXdhUPFc/hqdefault.jpg',
      duration: '1:15',
    },
    {
      id: 'uZgrLFYURzA',
      title: 'Yogeek - A true sit to standing desk By Fittrock',
      thumbnail: 'https://i.ytimg.com/vi/uZgrLFYURzA/hqdefault.jpg',
      duration: '2:10',
    },
    {
      id: '89dikLl3rVI',
      title: 'Yogeek - A true sit to standing desk By Fittrock Overview',
      thumbnail: 'https://i.ytimg.com/vi/89dikLl3rVI/hqdefault.jpg',
      duration: '1:50',
    },
    {
      id: 'mMZ-nTriKPg',
      title: 'Height Adjustable Desk | Assembly (Dual Motor) - Fittrock',
      thumbnail: 'https://i.ytimg.com/vi/mMZ-nTriKPg/hqdefault.jpg',
      duration: '8:45',
    },
    {
      id: 'ahizMScrct0',
      title: 'FITTROCK Brand Shoot 2025 | Premium Standing Desks | Behind the Scenes',
      thumbnail: 'https://i.ytimg.com/vi/ahizMScrct0/hqdefault.jpg',
      duration: '3:20',
    },
  ];

  const currentVideo = landscapeVideos[currentIndex];

  const handlePrev = () => {
    setIsHovered(false);
    setIsClicked(false);
    setCurrentIndex((prev) => (prev === 0 ? landscapeVideos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setIsHovered(false);
    setIsClicked(false);
    setCurrentIndex((prev) => (prev === landscapeVideos.length - 1 ? 0 : prev + 1));
  };

  // Hover play logic
  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(false); // Instantly stops playback on hover out
  };

  // Click play logic (locks play state until clicked again)
  const handleToggleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsClicked((prev) => !prev);
  };

  const isPlaying = isClicked || isHovered;

  return (
    <section className="py-20 sm:py-28 bg-zinc-950 text-white border-t border-zinc-800 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-zinc-900 text-zinc-300 border border-zinc-700/60 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider">
              <YouTubeIcon className="w-3.5 h-3.5 text-zinc-300" />
              <span>Product Demonstrations</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Watch Walkthroughs &amp; Guides
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-2xl font-normal">
              Hover to preview or click the play button to watch full unboxing, DIY assembly guides, and ergonomic tutorials.
            </p>
          </div>

          {/* Channel Link */}
          <div>
            <a
              href="https://www.youtube.com/@FITTROCK/videos"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-xs sm:text-sm border border-zinc-700 shadow-md transition-colors"
            >
              <YouTubeIcon className="w-4 h-4 text-white" />
              <span>Watch on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-400" />
            </a>
          </div>
        </div>

        {/* Single Featured Video Stage */}
        <div className="relative group">
          {/* Main 16:9 Video Player Container */}
          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleToggleClick}
            className={`relative aspect-video w-full rounded-3xl overflow-hidden bg-zinc-900 border ${
              isPlaying
                ? 'border-white/60 shadow-2xl ring-2 ring-white/20'
                : 'border-zinc-800 hover:border-zinc-700 shadow-2xl'
            } transition-all duration-300 cursor-pointer`}
          >
            {isPlaying ? (
              <div className="w-full h-full bg-black">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${currentVideo.id}?autoplay=1&mute=${isClicked ? 0 : 1}&controls=1&rel=0`}
                  title={currentVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>
            ) : (
              <>
                {/* Video High-Res Thumbnail */}
                <img
                  src={currentVideo.thumbnail}
                  alt={currentVideo.title}
                  className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />

                {/* Big Center Play Button (Gray / White) */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-zinc-900/85 text-white border border-zinc-700/80 backdrop-blur-sm flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:bg-white group-hover:text-zinc-950 group-hover:border-white transition-all duration-300">
                    <Play className="w-7 h-7 sm:w-9 sm:h-9 fill-current ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                {currentVideo.duration && (
                  <span className="absolute top-4 right-4 bg-black/80 text-white text-xs font-bold px-3 py-1 rounded-lg backdrop-blur-sm shadow-md">
                    {currentVideo.duration}
                  </span>
                )}
              </>
            )}
          </div>

          {/* Left Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label="Previous video"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-900/90 text-white border border-zinc-700 shadow-2xl flex items-center justify-center hover:bg-zinc-800 hover:scale-110 active:scale-95 transition-all z-20"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label="Next video"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-900/90 text-white border border-zinc-700 shadow-2xl flex items-center justify-center hover:bg-zinc-800 hover:scale-110 active:scale-95 transition-all z-20"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex items-center justify-center pt-2">
          <div className="flex items-center gap-2">
            {landscapeVideos.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setIsHovered(false);
                  setIsClicked(false);
                  setCurrentIndex(idx);
                }}
                aria-label={`Go to video ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx ? 'w-8 bg-white' : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
