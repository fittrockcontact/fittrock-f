'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, ExternalLink, Film, ChevronRight, ChevronLeft } from 'lucide-react';

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

interface YouTubeShortItem {
  id: string;
  title: string;
  thumbnail: string;
  duration?: string;
  views?: string;
}

export function YouTubeSection() {
  const [hoveredVideoId, setHoveredVideoId] = useState<string | null>(null);
  const [clickedVideoId, setClickedVideoId] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Exact vertical shorts from https://www.youtube.com/@FITTROCK/shorts
  const defaultShorts: YouTubeShortItem[] = [
    {
      id: 'ZjxVxJks2so',
      title: 'This Standing Desk Looks PREMIUM 💼⚡',
      thumbnail: 'https://i.ytimg.com/vi/ZjxVxJks2so/hqdefault.jpg',
      views: '1.2K views',
    },
    {
      id: '8tRBbeB45qk',
      title: 'Rati Single Motor But SUPER Smooth ⚡😱 @FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/8tRBbeB45qk/hqdefault.jpg',
      views: '2.4K views',
    },
    {
      id: 'law7ZaQqPGg',
      title: 'RATI Single Motor = Productivity Boost @FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/law7ZaQqPGg/hqdefault.jpg',
      views: '1.8K views',
    },
    {
      id: 'HdCK_mcsw0U',
      title: 'From AM to PM Without Back Pain @FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/HdCK_mcsw0U/hqdefault.jpg',
      views: '3.1K views',
    },
    {
      id: '0XE_UlfLVc0',
      title: 'Dual Motor Power 😳🔥 | Kuber Desk by @FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/0XE_UlfLVc0/hqdefault.jpg',
      views: '4.5K views',
    },
    {
      id: '2Srn48EX9FM',
      title: 'India’s Most Flexible Desk? 🔥 | Yogeek Floor to Standing Setup',
      thumbnail: 'https://i.ytimg.com/vi/2Srn48EX9FM/hqdefault.jpg',
      views: '5.2K views',
    },
    {
      id: '8UDj4KClbgA',
      title: 'Floor to Standing in Seconds 😳🔥 | Yogeek Desk by @FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/8UDj4KClbgA/hqdefault.jpg',
      views: '2.9K views',
    },
    {
      id: 'U8ALhboHBTA',
      title: '₹17K Desk That FIXES Your Back 😳🔥',
      thumbnail: 'https://i.ytimg.com/vi/U8ALhboHBTA/hqdefault.jpg',
      views: '6.7K views',
    },
    {
      id: '_7Hm0oH_TrI',
      title: 'Don’t Buy a Desk Before Watching This 😱 | Yogeek by Fittrock',
      thumbnail: 'https://i.ytimg.com/vi/_7Hm0oH_TrI/hqdefault.jpg',
      views: '3.8K views',
    },
    {
      id: 'ZhvjQjAS6cI',
      title: 'Electric Height Adjustable Standing Desk | @fittrock',
      thumbnail: 'https://i.ytimg.com/vi/ZhvjQjAS6cI/hqdefault.jpg',
      views: '4.1K views',
    },
    {
      id: 'zGXRfvsNAtk',
      title: 'Game-Changer for WFH Setup! FITTROCK 😍',
      thumbnail: 'https://i.ytimg.com/vi/zGXRfvsNAtk/hqdefault.jpg',
      views: '2.3K views',
    },
    {
      id: '2WlSpOy0DeY',
      title: 'Turn Your Work Into Comfort! #FITTROCK',
      thumbnail: 'https://i.ytimg.com/vi/2WlSpOy0DeY/hqdefault.jpg',
      views: '1.9K views',
    },
    {
      id: 'f4gJUHlST88',
      title: 'FITTROCK Future of Ergonomics',
      thumbnail: 'https://i.ytimg.com/vi/f4gJUHlST88/hqdefault.jpg',
      views: '2.1K views',
    },
  ];

  const [shorts, setShorts] = useState<YouTubeShortItem[]>(defaultShorts);

  useEffect(() => {
    async function loadLiveFeed() {
      try {
        const res = await fetch('/api/youtube');
        const data = await res.json();
        if (data.success && data.shorts && data.shorts.length > 0) {
          setShorts(data.shorts);
        }
      } catch (e) {
        console.error('Error loading YouTube live list:', e);
      }
    }
    loadLiveFeed();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Hover play handling (plays on hover, stops immediately on mouse leave)
  const handleMouseEnter = (id: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredVideoId(id);
    }, 200);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredVideoId(null); // Stops playing when hover is done
  };

  // Click play handling (locks play state until clicked again)
  const handleCardClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setClickedVideoId((prev) => (prev === id ? null : id));
  };

  const activePlayingId = clickedVideoId || hoveredVideoId;

  return (
    <section className="py-20 sm:py-28 bg-zinc-950 text-white border-b border-zinc-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10 sm:space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 bg-red-600/15 text-red-400 border border-red-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
              <Film className="w-3.5 h-3.5" />
              <span>@FITTROCK YouTube Shorts</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white">
              Watch Fittrock In Action
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm md:text-base max-w-2xl font-normal">
              Hover to preview or click the play button to watch standing desk setups and posture tips.
            </p>
          </div>

          {/* Channel Link */}
          <div>
            <a
              href="https://www.youtube.com/@FITTROCK/shorts"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-zinc-200 text-zinc-950 font-bold text-xs sm:text-sm shadow-md transition-colors"
            >
              <YouTubeIcon className="w-4 h-4 text-red-600" />
              <span>View All Shorts on YouTube</span>
              <ExternalLink className="w-3.5 h-3.5 text-zinc-500" />
            </a>
          </div>
        </div>

        {/* Slidable Single Row Shorts Carousel with Hover & Click-to-Play */}
        <div className="relative group">
          {/* Left Navigation Arrow */}
          <button
            onClick={() => scroll('left')}
            aria-label="Previous shorts"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 sm:-translate-x-5 w-11 h-11 rounded-full bg-black/85 text-white border border-zinc-700 shadow-2xl flex items-center justify-center hover:bg-black hover:scale-110 active:scale-95 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 z-20"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>

          {/* Single Row Horizontal Scroll Container */}
          <div
            ref={sliderRef}
            className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth no-scrollbar py-2 px-1 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {shorts.map((short) => {
              const isPlaying = activePlayingId === short.id;
              const isLocked = clickedVideoId === short.id;

              return (
                <div
                  key={short.id}
                  onMouseEnter={() => handleMouseEnter(short.id)}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => handleCardClick(short.id, e)}
                  className={`group/card relative cursor-pointer rounded-2xl overflow-hidden bg-zinc-900 border ${
                    isPlaying
                      ? 'border-red-500 shadow-red-950/40 ring-2 ring-red-500/30'
                      : 'border-zinc-800 hover:border-zinc-700'
                  } shadow-xl transition-all duration-300 shrink-0 snap-start flex flex-col justify-between w-[230px] sm:w-[260px] md:w-[280px] aspect-[9/16] p-4`}
                >
                  {isPlaying ? (
                    <div className="absolute inset-0 bg-black z-10">
                      <iframe
                        src={`https://www.youtube-nocookie.com/embed/${short.id}?autoplay=1&mute=${isLocked ? 0 : 1}&controls=1&rel=0&loop=1&playlist=${short.id}`}
                        title={short.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    </div>
                  ) : (
                    <>
                      {/* Background Thumbnail */}
                      <img
                        src={short.thumbnail}
                        alt={short.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-700 opacity-85 group-hover/card:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-black/40" />

                      {/* Top Row Badge */}
                      <div className="relative z-10 flex items-center justify-between">
                        <span className="inline-flex items-center gap-1 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-md shadow">
                          <Film className="w-3 h-3" />
                          Shorts
                        </span>
                      </div>

                      {/* Center Play Button Overlay */}
                      <div className="relative z-10 self-center w-12 h-12 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl group-hover/card:scale-115 group-hover/card:bg-red-600 transition-all duration-300">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>

                      {/* Bottom Row Title & Views */}
                      <div className="relative z-10 space-y-1">
                        <h4 className="text-xs sm:text-sm font-semibold text-white group-hover/card:text-red-400 transition-colors line-clamp-2 leading-snug">
                          {short.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 font-medium">{short.views}</p>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Navigation Arrow */}
          <button
            onClick={() => scroll('right')}
            aria-label="Next shorts"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 sm:translate-x-5 w-11 h-11 rounded-full bg-black/85 text-white border border-zinc-700 shadow-2xl flex items-center justify-center hover:bg-black hover:scale-110 active:scale-95 transition-all z-20"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>
      </div>
    </section>
  );
}
