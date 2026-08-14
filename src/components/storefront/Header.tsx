'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, X, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/store/use-cart-store';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const items = useCartStore((s) => s.items);
  const setCartOpen = useCartStore((s) => s.setCartOpen);

  const totalItemsCount = items.reduce((sum, i) => sum + i.quantity, 0);

  // Prevent background body scroll when mobile menu is open
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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/collections/standing-desks', label: 'Adjustable Desks' },
    { href: '/collections/ergonomic-chairs', label: 'Ergonomic Chairs' },
    { href: '/collections/desk-accessories', label: 'Accessories' },
    { href: '/testimonials', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
    { href: '/blog', label: 'Blog' },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-zinc-200 text-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-3 -ml-2 text-zinc-700 hover:text-zinc-900 active:scale-95 transition-all rounded-lg focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-amber-600" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-1 group py-2">
            <span className="text-xl sm:text-2xl font-black tracking-tight font-sans text-zinc-900">
              Fitt<span className="text-amber-500 font-extrabold">ROCK</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-zinc-700">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-amber-600 transition-colors py-1 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/account"
              className="p-2.5 text-zinc-700 hover:text-amber-600 transition-colors hidden sm:flex items-center justify-center rounded-lg hover:bg-zinc-100"
              title="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative p-2.5 text-zinc-700 hover:text-amber-600 active:scale-95 transition-all rounded-lg hover:bg-zinc-100"
              aria-label="Open shopping cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItemsCount > 0 && (
                <span className="absolute top-1 right-1 bg-amber-500 text-zinc-950 font-extrabold text-[10px] min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center animate-pulse shadow-md">
                  {totalItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu - Rendered outside <header> so position:fixed covers screen viewport */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[64px] sm:top-[80px] z-40 bg-white border-t border-zinc-200 flex flex-col justify-between overflow-y-auto">
          <div className="px-5 py-6 space-y-2">
            <p className="text-[11px] font-bold uppercase tracking-widest text-amber-600 mb-3 px-3">
              Navigation Menu
            </p>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3.5 px-4 text-base text-zinc-900 hover:text-amber-600 font-semibold rounded-xl bg-zinc-50 hover:bg-zinc-100 active:bg-zinc-200 transition-all border border-zinc-200"
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 text-amber-600" />
              </Link>
            ))}

            <div className="pt-4 border-t border-zinc-200 space-y-2">
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 py-3.5 px-4 text-base text-zinc-900 hover:text-amber-600 font-semibold rounded-xl bg-zinc-50 hover:bg-zinc-100 transition-all border border-zinc-200"
              >
                <User className="w-5 h-5 text-amber-600" />
                <span>My Account</span>
              </Link>
            </div>
          </div>

          {/* Quick Contact Footer inside Mobile Menu */}
          <div className="p-5 border-t border-zinc-200 bg-zinc-50 space-y-2 text-center mt-auto">
            <p className="text-xs text-zinc-600 font-medium">Need setup guidance or custom bulk quote?</p>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="inline-block w-full py-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl text-sm shadow-md transition-colors"
            >
              Talk to Workspace Specialist
            </Link>
          </div>
        </div>
      )}
    </>
  );
}



