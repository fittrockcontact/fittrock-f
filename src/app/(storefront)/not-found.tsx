import React from 'react';
import Link from 'next/link';
import { ArrowRight, PackageX } from 'lucide-react';

export default function StorefrontNotFound() {
  return (
    <div className="py-24 bg-white text-zinc-900 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full mx-auto bg-zinc-50 border border-zinc-200 rounded-3xl p-8 text-center space-y-6 shadow-xl">
        <div className="w-20 h-20 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-600 flex items-center justify-center mx-auto">
          <PackageX className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black text-zinc-900">404 - Product Not Found</h1>
          <p className="text-zinc-600 text-sm">
            We couldn&apos;t find the product or page you were looking for.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-extrabold py-3.5 rounded-xl text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md"
          >
            <span>Back to Storefront</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
