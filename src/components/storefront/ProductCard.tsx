'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingBag, Plus } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/use-cart-store';
import { toast } from 'sonner';

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
    isSale?: boolean;
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
  className?: string;
}

const DEFAULT_DESK_IMAGE = '/hero.png';

export function ProductCard({ product, className = '' }: ProductCardProps) {
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
    DEFAULT_DESK_IMAGE;

  const price = defaultVariant ? parseFloat(defaultVariant.price) : parseFloat(product.basePrice || '24990');
  const compareAtPrice = defaultVariant?.compareAtPrice
    ? parseFloat(defaultVariant.compareAtPrice)
    : product.compareAtPrice
    ? parseFloat(product.compareAtPrice)
    : price * 1.6;

  const stockQuantity = defaultVariant
    ? (defaultVariant.stockQuantity ?? defaultVariant.inventoryQuantity ?? 10)
    : 10;
  const isOutOfStock = stockQuantity <= 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
    toast.success(`Added ${product.name} to cart!`);
  };

  return (
    <div
      className={`group relative bg-white border border-zinc-200/90 rounded-2xl overflow-hidden flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 ${className}`}
    >
      <Link href={`/products/${product.slug}`} className="block">
        {/* Large Product Image Container with Sale watermark, Logo, and Quick Add */}
        <div className="relative aspect-square overflow-hidden bg-zinc-100 flex items-center justify-center">
          <img
            src={mainImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Top Left: Sale Tag */}
          <span className="absolute top-4 left-4 text-xs sm:text-sm font-normal text-zinc-500 select-none">
            Sale
          </span>

          {/* Top Right: Fittrock Logo Watermark */}
          <span className="absolute top-4 right-4 text-sm sm:text-base font-semibold tracking-tight font-sans text-zinc-600/90 select-none">
            FİTTROCK
          </span>

          {/* Bottom Right: Circular Quick Add Cart Button */}
          <button
            onClick={handleQuickAdd}
            disabled={isOutOfStock}
            aria-label="Add to cart"
            title="Quick Add to Cart"
            className="absolute bottom-4 right-4 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/95 text-zinc-900 border border-zinc-200 shadow-lg flex items-center justify-center hover:bg-black hover:text-white hover:border-black active:scale-95 transition-all z-10"
          >
            <div className="relative flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
              <Plus className="w-2.5 h-2.5 absolute -top-1 -right-1 stroke-[3]" />
            </div>
          </button>
        </div>

        {/* Product Details with Semibold Maroon Title & Pricing */}
        <div className="p-4 sm:p-5 text-center flex flex-col items-center justify-center space-y-2">
          <h3 className="text-sm sm:text-base font-semibold text-[#a32222] hover:underline line-clamp-2 leading-snug max-w-sm">
            {product.name}
          </h3>

          <div className="flex items-center justify-center gap-2 pt-0.5">
            <span className="text-sm sm:text-base font-semibold text-zinc-950">
              {formatPrice(price)}
            </span>
            {compareAtPrice && compareAtPrice > price && (
              <span className="text-xs sm:text-sm text-zinc-400 line-through font-normal">
                {formatPrice(compareAtPrice)}
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}
