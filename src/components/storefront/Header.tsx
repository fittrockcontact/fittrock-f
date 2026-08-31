'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, User, Search, Menu, X, ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { useCartStore } from '@/store/use-cart-store';

interface SubItem {
  title: string;
  href: string;
  desc: string;
  badge?: string;
}

interface MegaMenuSection {
  heading: string;
  items: SubItem[];
}

interface MegaMenuConfig {
  sections: MegaMenuSection[];
  featured: {
    badge: string;
    title: string;
    desc: string;
    href: string;
    image: string;
  };
}

const MEGA_MENUS: Record<string, MegaMenuConfig> = {
  'adjustable-desk': {
    sections: [
      {
        heading: 'By Motor & Design',
        items: [
          {
            title: 'Dual-Motor Pro Desks',
            href: '/collections/standing-desks',
            desc: '125kg capacity, whisper-quiet dual drives & 4 presets.',
            badge: 'Bestseller',
          },
          {
            title: 'Single-Motor Essential',
            href: '/collections/standing-desks',
            desc: 'Compact & reliable daily workstation with smooth lift.',
          },
          {
            title: 'L-Shaped Corner Desks',
            href: '/collections/standing-desks',
            desc: 'Maximum surface area with synchronized triple-motor frame.',
            badge: 'New',
          },
          {
            title: 'Manual Height Desks',
            href: '/collections/standing-desks',
            desc: 'Zero-power smooth crank mechanism for flexible spaces.',
          },
        ],
      },
      {
        heading: 'By Tabletop Finish',
        items: [
          {
            title: 'Solid Teak & Oak Hardwood',
            href: '/collections/standing-desks',
            desc: 'Natural continuous grain with premium beveled edges.',
            badge: 'Premium',
          },
          {
            title: 'Walnut Dark Finish',
            href: '/collections/standing-desks',
            desc: 'Rich executive aesthetic with stain-resistant coating.',
          },
          {
            title: 'Matte Black Anti-Scratch',
            href: '/collections/standing-desks',
            desc: 'Modern stealth look with anti-fingerprint thermal laminate.',
          },
          {
            title: 'Clean Arctic White',
            href: '/collections/standing-desks',
            desc: 'Minimalist Scandinavian look for bright, airy studios.',
          },
        ],
      },
    ],
    featured: {
      badge: 'TOP CHOICE',
      title: 'Dual-Motor Standing Desk',
      desc: 'Engineered with 6-axis anti-collision gyro and whisper-quiet motors under 42dB.',
      href: '/collections/standing-desks',
      image: '/hero.png',
    },
  },
  yogeek: {
    sections: [
      {
        heading: 'Ergonomic Seating',
        items: [
          {
            title: 'Yogeek High-Back Mesh',
            href: '/collections/ergonomic-chairs',
            desc: 'Adaptive lumbar support with breathable 3D mesh fabric.',
            badge: 'Popular',
          },
          {
            title: 'Executive Leather Recliner',
            href: '/collections/ergonomic-chairs',
            desc: 'Supple PU leather with 135° recline and extendable footrest.',
          },
          {
            title: 'Active Perching Stool',
            href: '/collections/ergonomic-chairs',
            desc: 'Encourages core engagement and sit-stand transitions.',
            badge: 'Health',
          },
        ],
      },
      {
        heading: 'Posture Engineering',
        items: [
          {
            title: '4D Multi-Directional Arms',
            href: '/collections/ergonomic-chairs',
            desc: 'Height, depth, width, and angle adjustable armrests.',
          },
          {
            title: 'Dynamic Synchro-Tilt',
            href: '/collections/ergonomic-chairs',
            desc: 'Smooth 2:1 backrest-to-seat tilt ratio for spinal decompression.',
          },
          {
            title: 'Class-4 Heavy Duty Gas Lift',
            href: '/collections/ergonomic-chairs',
            desc: 'BIFMA-certified pneumatic cylinder tested for 150kg.',
          },
        ],
      },
    ],
    featured: {
      badge: 'NEW LAUNCH',
      title: 'Yogeek Ergonomic Studio Chair',
      desc: 'Self-adjusting dynamic lumbar curve for uninterrupted 10+ hour focus sessions.',
      href: '/collections/ergonomic-chairs',
      image: '/hero.png',
    },
  },
  accessories: {
    sections: [
      {
        heading: 'Workspace Organization',
        items: [
          {
            title: 'Heavy-Duty Monitor Arms',
            href: '/collections/desk-accessories',
            desc: 'Gas-spring counterbalanced arms for single & dual 34" displays.',
            badge: 'Essential',
          },
          {
            title: 'Under-Desk Cable Spine',
            href: '/collections/desk-accessories',
            desc: 'Magnetic channels and steel raceways for zero visible wires.',
          },
          {
            title: 'Clamp-On Power Modules',
            href: '/collections/desk-accessories',
            desc: 'Fast 65W GaN USB-C and AC surge outlets right at desk level.',
          },
        ],
      },
      {
        heading: 'Comfort & Wellness',
        items: [
          {
            title: 'Anti-Fatigue Standing Mat',
            href: '/collections/desk-accessories',
            desc: 'High-density memory foam to relieve knee and ankle pressure.',
          },
          {
            title: 'Felt Desk Pad & Mouse Mat',
            href: '/collections/desk-accessories',
            desc: 'Water-repellent vegan leather and soft wool felt surface.',
          },
          {
            title: 'Under-Desk CPU Mount',
            href: '/collections/desk-accessories',
            desc: 'Heavy-duty steel strap mount that travels up/down with the desk.',
          },
        ],
      },
    ],
    featured: {
      badge: 'SETUP UPGRADE',
      title: 'Zero-Wire Cable Management Kit',
      desc: 'Complete power bar, steel mesh raceway, and magnetic cable organizer set.',
      href: '/collections/desk-accessories',
      image: '/hero.png',
    },
  },
};

export function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const items = useCartStore((s) => s.items);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // Scroll detection to toggle background transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mega menu on route change
  useEffect(() => {
    setActiveMegaMenu(null);
    setMobileMenuOpen(false);
  }, [pathname]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (key: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (MEGA_MENUS[key]) {
      setActiveMegaMenu(key);
    } else {
      setActiveMegaMenu(null);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMegaMenu(null);
    }, 150);
  };

  const isSolid = !isHome || isScrolled || activeMegaMenu !== null || searchOpen;

  const navLinks = [
    { href: '/', label: 'Home', key: 'home' },
    { href: '/collections/standing-desks', label: 'Adjustable Desk', key: 'adjustable-desk' },
    { href: '/collections/ergonomic-chairs', label: 'Yogeek', key: 'yogeek' },
    { href: '/collections/desk-accessories', label: 'Accessories', key: 'accessories' },
    { href: '/contact', label: 'Contact', key: 'contact' },
    { href: '/blog', label: 'Blog', key: 'blog' },
  ];

  return (
    <>
      <header
        onMouseLeave={handleMouseLeave}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isSolid
            ? 'bg-[#032e33]/95 backdrop-blur-md border-b border-[#05464e]/50 text-white shadow-xl'
            : 'bg-transparent border-b border-transparent text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* ========================================= */}
          {/* MOBILE HEADER LAYOUT (md:hidden)          */}
          {/* [Menu, Search] --- [Logo] --- [User, Bag] */}
          {/* ========================================= */}
          <div className="flex md:hidden items-center justify-between w-full">
            {/* Left: Mobile Menu + Search */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-white hover:text-white active:scale-95 transition-all focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <div className="flex flex-col justify-center gap-1.5 w-6 h-6">
                    <span className="h-[2px] w-5 bg-white rounded-full" />
                    <span className="h-[2px] w-5 bg-white rounded-full" />
                  </div>
                )}
              </button>

              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-1.5 text-white hover:text-white active:scale-95 transition-all"
                title="Search"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Center: Brand Logo */}
            <Link href="/" className="flex items-center justify-center py-1">
              <span className="text-2xl font-black tracking-tight font-sans text-white">
                Fittrock
              </span>
            </Link>

            {/* Right: User + Cart */}
            <div className="flex items-center gap-3">
              <Link
                href="/account"
                className="p-1.5 text-white hover:text-white transition-colors"
                title="Account"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-1.5 text-white hover:text-white active:scale-95 transition-all"
                aria-label="Open cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white font-extrabold text-[9px] min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center shadow-md">
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* ========================================= */}
          {/* DESKTOP HEADER LAYOUT (hidden md:flex)    */}
          {/* [Logo + Nav Links] ------------ [Icons]   */}
          {/* ========================================= */}
          <div className="hidden md:flex items-center justify-between w-full gap-6">
            {/* Left: Brand Logo + Desktop Nav Links */}
            <div className="flex items-center gap-6 lg:gap-10">
              <Link href="/" className="flex items-center gap-1 group py-2 shrink-0">
                <span className="text-2xl sm:text-3xl font-black tracking-tight font-sans text-white drop-shadow-sm">
                  Fittrock
                </span>
              </Link>

              <nav className="flex items-center gap-5 lg:gap-8 text-sm font-normal text-white/90">
                {navLinks.map((link) => {
                  const hasMegaMenu = !!MEGA_MENUS[link.key];
                  const isOpen = activeMegaMenu === link.key;

                  return (
                    <div
                      key={link.key}
                      onMouseEnter={() => handleMouseEnter(link.key)}
                      className="relative py-2"
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-1 transition-colors py-1 relative group tracking-normal text-white/90 hover:text-white ${
                          isOpen ? 'text-white font-medium' : ''
                        }`}
                      >
                        <span>{link.label}</span>
                        {hasMegaMenu && (
                          <ChevronDown
                            className={`w-3.5 h-3.5 opacity-70 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 opacity-100 text-amber-400' : 'group-hover:opacity-100'
                            }`}
                          />
                        )}
                        <span
                          className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-200 ${
                            isOpen ? 'w-full bg-amber-400' : 'w-0 group-hover:w-full'
                          }`}
                        />
                      </Link>
                    </div>
                  );
                })}
              </nav>
            </div>

            {/* Right: Desktop Action Icons (Search, User, Cart) */}
            <div className="flex items-center gap-2 sm:gap-4 shrink-0">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-white/90 hover:text-white transition-colors flex items-center justify-center rounded-lg hover:bg-white/10"
                title="Search products"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link
                href="/account"
                className="p-2 text-white/90 hover:text-white transition-colors flex items-center justify-center rounded-lg hover:bg-white/10"
                title="My Account"
                aria-label="User Account"
              >
                <User className="w-5 h-5" />
              </Link>

              <button
                onClick={() => setCartOpen(true)}
                className="relative p-2 text-white/90 hover:text-white active:scale-95 transition-all rounded-lg hover:bg-white/10"
                aria-label="Open shopping cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {totalItemsCount > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-red-600 text-white font-extrabold text-[10px] min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center shadow-md">
                    {totalItemsCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* DROPDOWN MEGA MENU WITH RICH CONTENT & FEATURED IMAGE    */}
        {/* ======================================================== */}
        {activeMegaMenu && MEGA_MENUS[activeMegaMenu] && (
          <div
            onMouseEnter={() => handleMouseEnter(activeMegaMenu)}
            onMouseLeave={handleMouseLeave}
            className="hidden md:block w-full border-t border-[#05464e]/70 bg-[#022327]/98 backdrop-blur-xl text-white shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="grid grid-cols-12 gap-8 items-stretch">
                {/* Columns 1 & 2: Subcategory Navigation Links */}
                <div className="col-span-8 grid grid-cols-2 gap-8 pr-4 border-r border-[#05464e]/50">
                  {MEGA_MENUS[activeMegaMenu].sections.map((sec, idx) => (
                    <div key={idx} className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400/90 flex items-center gap-2">
                        <span>{sec.heading}</span>
                      </h4>
                      <ul className="space-y-3">
                        {sec.items.map((item, itemIdx) => (
                          <li key={itemIdx}>
                            <Link
                              href={item.href}
                              onClick={() => setActiveMegaMenu(null)}
                              className="group block p-2 rounded-xl hover:bg-white/5 transition-all"
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-semibold text-white group-hover:text-amber-400 transition-colors">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-zinc-200 border border-white/10 group-hover:bg-amber-400/20 group-hover:text-amber-300 transition-colors">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <p className="text-xs text-white/60 group-hover:text-white/80 leading-relaxed mt-0.5 line-clamp-1">
                                {item.desc}
                              </p>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>

                {/* Column 3: Featured Menu Image Card */}
                <div className="col-span-4 flex flex-col justify-between">
                  <div className="relative group overflow-hidden rounded-2xl border border-[#05464e] bg-[#032e33] h-full flex flex-col justify-between shadow-lg">
                    {/* Top Image */}
                    <div className="relative h-36 w-full overflow-hidden bg-zinc-900">
                      <img
                        src={MEGA_MENUS[activeMegaMenu].featured.image}
                        alt={MEGA_MENUS[activeMegaMenu].featured.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#032e33] via-transparent to-black/30" />
                      <span className="absolute top-3 left-3 bg-amber-500 text-zinc-950 font-black text-[10px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        {MEGA_MENUS[activeMegaMenu].featured.badge}
                      </span>
                    </div>

                    {/* Content & Action */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <h4 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors">
                          {MEGA_MENUS[activeMegaMenu].featured.title}
                        </h4>
                        <p className="text-xs text-white/70 leading-relaxed mt-1 line-clamp-2">
                          {MEGA_MENUS[activeMegaMenu].featured.desc}
                        </p>
                      </div>

                      <Link
                        href={MEGA_MENUS[activeMegaMenu].featured.href}
                        onClick={() => setActiveMegaMenu(null)}
                        className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-white hover:bg-zinc-100 text-zinc-950 font-bold text-xs shadow transition-colors active:scale-95"
                      >
                        <span>Explore Collection</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quick Search Overlay */}
        {searchOpen && (
          <div className="border-t border-[#05464e] bg-[#022327] px-4 py-3 sm:px-8 animate-in fade-in slide-in-from-top-1 duration-200">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (searchQuery.trim()) {
                  window.location.href = `/collections/standing-desks?q=${encodeURIComponent(searchQuery)}`;
                }
              }}
              className="max-w-3xl mx-auto flex items-center gap-3"
            >
              <Search className="w-5 h-5 text-white/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search standing desks, ergonomic chairs, accessories..."
                autoFocus
                className="w-full bg-transparent text-white placeholder:text-white/50 text-sm sm:text-base focus:outline-none"
              />
              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-xs text-white/60 hover:text-white uppercase font-bold tracking-wider px-2 py-1"
              >
                Close
              </button>
            </form>
          </div>
        )}
      </header>

      {/* Spacer for non-homepage layouts so content is not hidden underneath fixed navbar */}
      {!isHome && <div className="h-16 sm:h-20 shrink-0" aria-hidden="true" />}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] sm:top-[80px] z-40 bg-[#022327] border-t border-[#05464e] text-white flex flex-col justify-between overflow-y-auto">
          <div className="px-5 py-6 space-y-4">
            <p className="text-[11px] font-bold uppercase tracking-widest text-white/60 mb-2 px-3">
              Navigation Menu
            </p>
            {navLinks.map((link) => {
              const hasMega = !!MEGA_MENUS[link.key];

              return (
                <div key={link.key} className="space-y-2">
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-3 px-4 text-base text-white hover:text-white font-semibold rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 transition-all border border-white/10"
                  >
                    <span>{link.label}</span>
                    <ArrowRight className="w-4 h-4 text-white/60" />
                  </Link>

                  {/* Submenu links on mobile */}
                  {hasMega && (
                    <div className="pl-3 pr-1 py-1 space-y-1">
                      {MEGA_MENUS[link.key].sections[0].items.slice(0, 3).map((sub, sIdx) => (
                        <Link
                          key={sIdx}
                          href={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-between py-1.5 px-3 text-xs text-white/75 hover:text-white"
                        >
                          <span>{sub.title}</span>
                          {sub.badge && (
                            <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-white/10 text-amber-300">
                              {sub.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <div className="pt-4 border-t border-[#05464e] space-y-2">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3 px-4 text-base text-white font-semibold rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/10"
              >
                <User className="w-5 h-5 text-white/80" />
                <span>My Account</span>
              </Link>
            </div>
          </div>

          {/* Quick Contact Footer inside Mobile Menu */}
          <div className="p-5 border-t border-[#05464e] bg-[#011a1d] space-y-2 text-center mt-auto">
            <p className="text-xs text-white/70 font-medium">Need setup guidance or custom quote?</p>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block w-full py-3 bg-white hover:bg-zinc-100 text-zinc-950 font-bold rounded-xl text-sm shadow-md transition-colors"
            >
              Talk to Workspace Specialist
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
