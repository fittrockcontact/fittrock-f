'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, Star } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/use-cart-store';

export interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    basePrice: string;
    compareAtPrice?: string | null;
    imageUrl?: string;
    imageUrls?: string[];
    variants?: Array<{
      id: string;
      sku: string;
      color?: string | null;
      size?: string | null;
      price: string;
      compareAtPrice?: string | null;
      stockQuantity?: number;
      inventoryQuantity?: number;
      imageUrls?: string[] | unknown;
      isDefault?: boolean;
    }>;
  };
}

const DEFAULT_PUNE_IMAGE = 'https://res.cloudinary.com/strangermingle/image/upload/v1775051643/Pune_Culture_hgjgum.webp';

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  const safeVariants = Array.isArray(product?.variants) && product.variants.length > 0 ? product.variants : [];
  const defaultVariant = safeVariants.find((v) => v.isDefault) || safeVariants[0];

  const variantImages = Array.isArray(defaultVariant?.imageUrls) && (defaultVariant.imageUrls as string[]).length > 0
    ? (defaultVariant.imageUrls as string[])
    : [];

  const mainImage =
    product.imageUrl ||
    (Array.isArray(product.imageUrls) && product.imageUrls[0]) ||
    variantImages[0] ||
    DEFAULT_PUNE_IMAGE;

  const price = defaultVariant ? parseFloat(defaultVariant.price) : parseFloat(product.basePrice || '0');
  const compareAtPrice = defaultVariant?.compareAtPrice
    ? parseFloat(defaultVariant.compareAtPrice)
    : product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : null;

  const stockQuantity = defaultVariant
    ? (defaultVariant.stockQuantity ?? defaultVariant.inventoryQuantity ?? 10)
    : 10;
  const isOutOfStock = stockQuantity <= 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;

    addItem({
      variantId: defaultVariant?.id || `var-${product.id}`,
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      sku: defaultVariant?.sku || product.slug,
      color: defaultVariant?.color || null,
      size: defaultVariant?.size || null,
      price,
      imageUrl: mainImage,
      stockQuantity,
      quantity: 1,
    });
  };

  return (
    <div className="group relative bg-white border border-zinc-200 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-zinc-300 hover:shadow-md transition-all duration-300">
      <Link href={`/products/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-zinc-100">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Badges */}
          <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex flex-col gap-1.5 z-10">
            {compareAtPrice && compareAtPrice > price && (
              <span className="bg-amber-500 text-zinc-950 text-[10px] sm:text-[11px] font-extrabold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md uppercase tracking-wider shadow-sm">
                SAVE {Math.round(((compareAtPrice - price) / compareAtPrice) * 100)}%
              </span>
            )}
            {isOutOfStock ? (
              <span className="bg-red-100 text-red-700 border border-red-200 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                Sold Out
              </span>
            ) : stockQuantity <= 5 ? (
              <span className="bg-amber-100 text-amber-800 border border-amber-200 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-md">
                Only {stockQuantity} Left
              </span>
            ) : null}
          </div>
        </div>

        {/* Info */}
        <div className="p-4 sm:p-5 space-y-2 sm:space-y-3">
          <div className="flex items-center gap-1 text-amber-600 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>4.9 (48)</span>
          </div>

          <h3 className="font-bold text-zinc-900 text-base sm:text-lg group-hover:text-amber-600 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-zinc-600 text-xs line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-baseline gap-2 pt-1">
            <span className="text-lg sm:text-xl font-black text-zinc-900">{formatPrice(price)}</span>
            {compareAtPrice && (
              <span className="text-xs text-zinc-400 line-through font-medium">
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>

      {/* Quick Add Button with Min 44px touch target */}
      <div className="p-4 sm:p-5 pt-0">
        <button
          onClick={handleQuickAdd}
          disabled={isOutOfStock}
          className={`w-full min-h-[44px] py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            isOutOfStock
              ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
              : 'bg-zinc-100 hover:bg-amber-500 hover:text-zinc-950 text-zinc-800 border border-zinc-200 hover:border-amber-500'
          }`}
        >
          <ShoppingCart className="w-4 h-4" />
          <span>{isOutOfStock ? 'Sold Out' : 'Quick Add'}</span>
        </button>
      </div>
    </div>
  );
}
