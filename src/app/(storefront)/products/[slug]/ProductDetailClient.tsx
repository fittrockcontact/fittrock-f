'use client';

import React, { useState } from 'react';
import { ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Check, Plus, Minus, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { formatPrice } from '@/lib/utils';
import { useCartStore } from '@/store/use-cart-store';
import { toast } from 'sonner';
import { ProductFeatureShowcase, FeatureShowcaseItem } from '@/components/storefront/ProductFeatureShowcase';
import { ReviewCard, ReviewItem } from '@/components/storefront/ReviewCard';

export interface ProductDetailProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    shortDescription?: string | null;
    descriptionText?: string | null;
    brand?: string | null;
    weightCapacityKg?: number | string | null;
    heightRangeMm?: string | null;
    warrantyMonths?: number | string | null;
    motorType?: string | null;
    basePrice: string;
    compareAtPrice: string | null;
    imageUrl?: string;
    imageUrls?: string[];
    images?: Array<{
      id: string;
      url: string;
      altText?: string | null;
      sortOrder?: number;
      features?: {
        title?: string;
        subtitle?: string;
        highlights?: Array<{ title: string; description: string }>;
      } | Array<{ title: string; description: string }> | null;
    }>;
    featureShowcases?: FeatureShowcaseItem[];
    features?: FeatureShowcaseItem[];
    variants?: Array<{
      id: string;
      sku: string;
      color: string | null;
      size: string | null;
      price: string;
      compareAtPrice: string | null;
      stockQuantity?: number;
      inventoryQuantity?: number;
      imageUrl?: string;
      imageUrls?: string[] | unknown;
      features?: FeatureShowcaseItem[];
      featureShowcases?: FeatureShowcaseItem[];
      isDefault?: boolean;
    }>;
    reviews?: ReviewItem[];
  };
}

export function ProductDetailClient({ product }: ProductDetailProps) {
  const fallbackImage = product.imageUrl || (Array.isArray(product.imageUrls) ? product.imageUrls[0] : null) || 'https://res.cloudinary.com/strangermingle/image/upload/v1775051643/Pune_Culture_hgjgum.webp';

  const safeVariants = Array.isArray(product?.variants) && product.variants.length > 0
    ? product.variants
    : [
        {
          id: `var-${product.id}`,
          sku: product.slug || 'ft-item',
          color: 'Default Color',
          size: 'Standard',
          price: product.basePrice || '0.00',
          compareAtPrice: product.compareAtPrice || null,
          stockQuantity: 10,
          imageUrl: fallbackImage,
          imageUrls: [fallbackImage],
          isDefault: true,
        },
      ];

  const defaultVar = safeVariants.find((v) => v.isDefault) || safeVariants[0];
  const [selectedVariant, setSelectedVariant] = useState(defaultVar);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Accordion state (Right sidebar)
  const [openSection, setOpenSection] = useState<'shipping' | 'warranty' | null>(null);

  const addItem = useCartStore((s) => s.addItem);

  // 1. Variant-Specific Image Isolation:
  // If the chosen variant has dedicated images, display ONLY those variant images in the preview and side gallery.
  const variantDirectImg = selectedVariant?.imageUrl || (selectedVariant as any)?.image_url;
  const variantImgs = Array.isArray(selectedVariant?.imageUrls)
    ? (selectedVariant.imageUrls as string[]).filter((url) => Boolean(url))
    : [];

  const specificVariantImages = [
    ...(variantDirectImg ? [variantDirectImg] : []),
    ...variantImgs,
  ].filter((url, idx, self) => Boolean(url) && self.indexOf(url) === idx);

  const prodImgs = Array.isArray(product?.imageUrls) ? product.imageUrls : [];
  const directImg = product?.imageUrl ? [product.imageUrl] : [];
  const generalProductImages = [...directImg, ...prodImgs, fallbackImage].filter(
    (url, idx, self) => Boolean(url) && self.indexOf(url) === idx
  );

  // Use specific variant images if available; otherwise fallback to general product images
  const images = specificVariantImages.length > 0 ? specificVariantImages : generalProductImages;

  const currentImage = images[selectedImageIndex] || images[0] || fallbackImage;

  const price = selectedVariant ? parseFloat(selectedVariant.price) : parseFloat(product.basePrice || '0');
  const compareAtPrice = selectedVariant?.compareAtPrice ? parseFloat(selectedVariant.compareAtPrice) : null;
  const variantStock = selectedVariant ? (selectedVariant.stockQuantity ?? (selectedVariant as any).inventory_quantity ?? 10) : 10;
  const isOutOfStock = variantStock <= 0;

  // Group unique colors & sizes across variants
  const availableColors = Array.from(new Set(safeVariants.map((v) => v.color).filter(Boolean))) as string[];
  const availableSizes = Array.from(new Set(safeVariants.map((v) => v.size).filter(Boolean))) as string[];

  // 2. Unavailable Option Matrix Helpers
  const checkSizeAvailable = (size: string) => {
    const matched = safeVariants.find(
      (v) => v.color === selectedVariant?.color && v.size === size
    );
    if (!matched) return false;
    const stock = matched.stockQuantity ?? (matched as any).inventory_quantity ?? 10;
    return stock > 0;
  };

  const checkColorAvailable = (color: string) => {
    const matched = safeVariants.find(
      (v) => v.size === selectedVariant?.size && v.color === color
    );
    if (!matched) return false;
    const stock = matched.stockQuantity ?? (matched as any).inventory_quantity ?? 10;
    return stock > 0;
  };

  const handlePrevImage = () => {
    setSelectedImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleColorChange = (color: string) => {
    // Try to find variant with exact color and currently selected size
    let matched = safeVariants.find(
      (v) => v.color === color && (selectedVariant?.size ? v.size === selectedVariant.size : true)
    );
    // If not available for current size, pick first available variant for this color
    if (!matched) {
      matched = safeVariants.find((v) => v.color === color);
    }

    if (matched) {
      setSelectedVariant(matched);
      setSelectedImageIndex(0);
    }
  };

  const handleSizeChange = (size: string) => {
    // Try to find variant with exact size and currently selected color
    let matched = safeVariants.find(
      (v) => v.size === size && (selectedVariant?.color ? v.color === selectedVariant.color : true)
    );
    // If not available for current color, pick first available variant for this size
    if (!matched) {
      matched = safeVariants.find((v) => v.size === size);
    }

    if (matched) {
      setSelectedVariant(matched);
      setSelectedImageIndex(0);
    }
  };

  const handleAddToCart = () => {
    if (!selectedVariant || isOutOfStock) return;

    addItem({
      variantId: selectedVariant.id,
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      sku: selectedVariant.sku,
      color: selectedVariant.color || null,
      size: selectedVariant.size || null,
      price,
      imageUrl: currentImage,
      stockQuantity: variantStock,
      quantity,
    });

    toast.success(`Added ${product.name} to your cart!`);
  };

  const reviewsList = Array.isArray(product.reviews) ? product.reviews : [];
  const reviewsCount = reviewsList.length;
  const avgRating = reviewsCount > 0
    ? (reviewsList.reduce((acc, r) => acc + (Number(r.rating) || 5), 0) / reviewsCount).toFixed(1)
    : '5.0';

  // Extract feature showcases strictly for the selected variant's images
  const variantUrls = new Set(
    [
      selectedVariant?.imageUrl,
      ...(Array.isArray(selectedVariant?.imageUrls) ? (selectedVariant.imageUrls as string[]) : []),
    ].filter(Boolean)
  );

  const selectedVariantFeatures = (selectedVariant as any)?.featureShowcases || (selectedVariant as any)?.features || [];

  const imageMatchedFeatures: FeatureShowcaseItem[] = Array.isArray(product.images)
    ? product.images
        .filter((img) => {
          const matchesVariantId = (img as any).variantId && (img as any).variantId === selectedVariant?.id;
          const matchesVariantUrl = variantUrls.has(img.url);
          const hasFeatureData =
            img.features &&
            (Array.isArray(img.features)
              ? img.features.length > 0
              : Boolean((img.features as any)?.highlights?.length > 0 || (img.features as any)?.title));
          return (matchesVariantId || matchesVariantUrl) && hasFeatureData;
        })
        .map((img) => ({
          id: img.id,
          imageUrl: img.url,
          title: (img.features as any)?.title || 'Product Feature',
          subtitle: (img.features as any)?.subtitle || '',
          highlights: Array.isArray(img.features) ? img.features : (img.features as any)?.highlights || [],
        }))
    : [];

  const displayFeatures: FeatureShowcaseItem[] =
    selectedVariantFeatures.length > 0 ? selectedVariantFeatures : imageMatchedFeatures;

  const heroSummary =
    product.shortDescription ||
    product.descriptionText ||
    (product.description
      ? product.description
          .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
          .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
          .replace(/<[^>]+>/g, ' ')
          .replace(/&nbsp;/g, ' ')
          .replace(/&amp;/g, '&')
          .replace(/&lt;/g, '<')
          .replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"')
          .replace(/&#39;/g, "'")
          .replace(/\s+/g, ' ')
          .trim()
      : '') ||
    'Premium ergonomic height-adjustable workstation designed for superior posture comfort, stability, and durability.';

  return (
    <div className="py-12 bg-white text-zinc-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-20">
          {/* Left Column: Image Gallery with Side Thumbnail Bar */}
          <div className="lg:col-span-7">
            <div className="flex flex-col-reverse sm:flex-row gap-4">
              {/* Vertical Side Thumbnail Bar (Left Side) */}
              {images.length > 1 && (
                <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[540px] scrollbar-thin scrollbar-thumb-zinc-300 pr-1 shrink-0">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 bg-zinc-50 shrink-0 transition-all ${
                        selectedImageIndex === idx
                          ? 'border-amber-500 ring-2 ring-amber-500/40 scale-95 shadow-md'
                          : 'border-zinc-200 opacity-60 hover:opacity-100 hover:border-zinc-300'
                      }`}
                    >
                      <img src={img} alt={`${product.name} preview ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image Preview Container (Right Side) */}
              <div className="relative flex-1 aspect-4/3 sm:aspect-square rounded-3xl overflow-hidden bg-zinc-50 border border-zinc-200 group shadow-xl">
                <img
                  src={currentImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />

                {/* Watermark Brand Logo on Top Right */}
                <div className="absolute top-4 right-5 pointer-events-none select-none z-10">
                  <span className="text-xl font-black tracking-tight text-zinc-900/90 drop-shadow-sm">
                    Fitt<span className="text-amber-500">ROCK</span>
                  </span>
                </div>

                {/* Stock Badge on Top Left */}
                <div className="absolute top-4 left-4 z-10">
                  {isOutOfStock ? (
                    <span className="bg-red-100 text-red-700 border border-red-200 font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider shadow-sm">
                      Sold Out
                    </span>
                  ) : variantStock <= 5 ? (
                    <span className="bg-amber-100 text-amber-800 border border-amber-200 font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider shadow-sm">
                      Only {variantStock} Left in Stock
                    </span>
                  ) : (
                    <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 font-bold px-3 py-1 rounded-lg text-xs uppercase tracking-wider shadow-sm">
                      In Stock • Ships in 24 Hours
                    </span>
                  )}
                </div>

                {/* Next & Previous Arrow Controls */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-amber-500 text-zinc-800 hover:text-zinc-950 border border-zinc-200 hover:border-amber-400 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-md z-20"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-amber-500 text-zinc-800 hover:text-zinc-950 border border-zinc-200 hover:border-amber-400 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-md z-20"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* 1. Technical Specifications Section (Below Image) */}
            <div className="mt-10 pt-8 border-t border-zinc-200 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="h-5 w-1.5 bg-amber-500 rounded-full" />
                <h2 className="text-xl font-black text-zinc-900 tracking-tight">Technical Specifications</h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-4 space-y-1">
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Motor Drive System</p>
                  <p className="text-sm font-bold text-zinc-900">
                    {product.motorType === 'single'
                      ? 'Single Motor Electric Lift (<42dB)'
                      : product.motorType === 'dual'
                      ? 'Dual-Motor Synchronized Lift (<42dB)'
                      : 'Ergonomic Desk Component'}
                  </p>
                  <p className="text-xs text-zinc-500">Ultra-quiet, smooth motorized height transition</p>
                </div>

                <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-4 space-y-1">
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Load & Weight Capacity</p>
                  <p className="text-sm font-bold text-zinc-900">
                    {product.weightCapacityKg ? `${product.weightCapacityKg} kg` : (product.motorType === 'single' ? '100 kg' : '125 kg')} Maximum Load
                  </p>
                  <p className="text-xs text-zinc-500">Engineered for heavy multi-monitor workstations</p>
                </div>

                <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-4 space-y-1">
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Height Adjustment Range</p>
                  <p className="text-sm font-bold text-zinc-900">
                    {product.heightRangeMm || (product.motorType === 'single' ? '710mm - 1190mm' : '620mm - 1270mm')}
                  </p>
                  <p className="text-xs text-zinc-500">4 Memory height presets with LED digital readout</p>
                </div>

                <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-4 space-y-1">
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Frame Material & Build</p>
                  <p className="text-sm font-bold text-zinc-900">Cold-Rolled Carbon Steel</p>
                  <p className="text-xs text-zinc-500">Anti-scratch powder-coated dual-beam base</p>
                </div>

                <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-4 space-y-1">
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Safety & Anti-Collision</p>
                  <p className="text-sm font-bold text-zinc-900">6-Axis Gyro Sensor</p>
                  <p className="text-xs text-zinc-500">Auto-reverses immediately upon obstacle contact</p>
                </div>

                <div className="bg-zinc-50 border border-zinc-200/90 rounded-2xl p-4 space-y-1">
                  <p className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider">Warranty & Support</p>
                  <p className="text-sm font-bold text-zinc-900">
                    {product.warrantyMonths ? `${Math.round(Number(product.warrantyMonths) / 12)} Years Warranty` : '10-Year Warranty'}
                  </p>
                  <p className="text-xs text-zinc-500">Comprehensive coverage on frame structure & motors</p>
                </div>
              </div>
            </div>

            {/* 2. Product Overview & Details Section (Below Technical Specifications) */}
            <div className="mt-10 pt-8 border-t border-zinc-200 space-y-5">
              <div className="flex items-center gap-2.5">
                <span className="h-5 w-1.5 bg-amber-500 rounded-full" />
                <h2 className="text-xl font-black text-zinc-900 tracking-tight">Product Overview & Details</h2>
              </div>

              <div className="bg-zinc-50/70 border border-zinc-200/80 rounded-3xl p-6 sm:p-8 space-y-4">
                {product.description && product.description.includes('<') ? (
                  <div
                    className="prose prose-zinc max-w-none text-sm text-zinc-700 leading-relaxed space-y-4 [&>h2]:text-lg [&>h2]:font-bold [&>h2]:text-zinc-900 [&>h2]:mt-6 [&>h2]:mb-3 [&>h3]:text-base [&>h3]:font-bold [&>h3]:text-zinc-900 [&>h3]:mt-5 [&>h3]:mb-2 [&>p]:leading-relaxed [&>p]:text-zinc-600 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:mb-1.5 [&>ul>li]:text-zinc-600"
                    dangerouslySetInnerHTML={{ __html: product.description }}
                  />
                ) : (
                  <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-line">
                    {product.description || heroSummary}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Product Details & Variant Selectors */}
          <div className="lg:col-span-5 space-y-8">
            {/* Title & Rating */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-amber-600 text-sm font-semibold">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span>{avgRating} ({reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'})</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900">
                {product.name}
              </h1>
              <p className="text-zinc-600 text-sm leading-relaxed">{heroSummary}</p>
            </div>

            {/* Price Display */}
            <div className="flex items-baseline gap-3 border-y border-zinc-200 py-4">
              <span className="text-3xl sm:text-4xl font-black text-amber-700">
                {formatPrice(price)}
              </span>
              {compareAtPrice && compareAtPrice > price && (
                <span className="text-lg text-zinc-400 line-through">
                  {formatPrice(compareAtPrice)}
                </span>
              )}
            </div>

            {/* Color Selector */}
            {availableColors.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Frame Color + Table Top Color: <span className="text-zinc-900">{selectedVariant?.color || 'Standard'}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map((color) => {
                    const isSelected = selectedVariant?.color === color;
                    const isAvailable = checkColorAvailable(color);
                    return (
                      <button
                        key={color}
                        disabled={!isAvailable}
                        onClick={() => handleColorChange(color)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md'
                            : !isAvailable
                            ? 'bg-zinc-100 border-zinc-200 text-zinc-400 opacity-40 cursor-not-allowed line-through'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:border-zinc-300'
                        }`}
                      >
                        {color}
                        {!isAvailable && <span className="ml-1 text-[10px] no-underline">(N/A)</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Size Selector */}
            {availableSizes.length > 0 && (
              <div className="space-y-3">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-600">
                  Select Dimensions / Size: <span className="text-zinc-900">{selectedVariant?.size || 'Standard'}</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {availableSizes.map((size) => {
                    const isSelected = selectedVariant?.size === size;
                    const isAvailable = checkSizeAvailable(size);
                    return (
                      <button
                        key={size}
                        disabled={!isAvailable}
                        onClick={() => handleSizeChange(size)}
                        className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-zinc-950 border-amber-400 shadow-md'
                            : !isAvailable
                            ? 'bg-zinc-100 border-zinc-200 text-zinc-400 opacity-40 cursor-not-allowed line-through'
                            : 'bg-zinc-50 border-zinc-200 text-zinc-800 hover:border-zinc-300'
                        }`}
                      >
                        {size}
                        {!isAvailable && <span className="ml-1 text-[10px] no-underline">(N/A)</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Add To Cart Button */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-2xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 text-zinc-600 hover:text-zinc-900 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={`flex-1 py-4 rounded-2xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all ${
                    isOutOfStock
                      ? 'bg-zinc-100 text-zinc-400 cursor-not-allowed border border-zinc-200'
                      : 'bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-lg shadow-amber-500/20 active:scale-[0.99]'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {isOutOfStock ? 'Sold Out' : 'Add To Cart'}
                </button>
              </div>
            </div>

            {/* Guarantee Cards */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-zinc-200">
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3 text-center space-y-1">
                <Truck className="w-5 h-5 text-amber-600 mx-auto" />
                <p className="text-[11px] font-bold text-zinc-900">Free Shipping</p>
                <p className="text-[10px] text-zinc-500">Pan India delivery</p>
              </div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3 text-center space-y-1">
                <ShieldCheck className="w-5 h-5 text-amber-600 mx-auto" />
                <p className="text-[11px] font-bold text-zinc-900">10-Year Warranty</p>
                <p className="text-[10px] text-zinc-500">Frame & motors</p>
              </div>
              <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-3 text-center space-y-1">
                <RotateCcw className="w-5 h-5 text-amber-600 mx-auto" />
                <p className="text-[11px] font-bold text-zinc-900">30-Day Trial</p>
                <p className="text-[10px] text-zinc-500">Risk-free return</p>
              </div>
            </div>

            {/* Collapsible Product Details Accordion */}
            <div className="border border-zinc-200 rounded-2xl overflow-hidden divide-y divide-zinc-200">
              {/* Section 1: Shipping */}
              <div>
                <button
                  onClick={() => setOpenSection(openSection === 'shipping' ? null : 'shipping')}
                  className="w-full px-5 py-4 flex items-center justify-between font-bold text-sm text-zinc-900 bg-zinc-50 hover:bg-zinc-100 transition-colors"
                >
                  <span>Shipping & Delivery</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${openSection === 'shipping' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'shipping' && (
                  <div className="px-5 py-4 text-xs text-zinc-600 space-y-2 bg-white">
                    <p>Orders dispatched within 24-48 hours. Delivered in 3-7 business days across metro cities.</p>
                  </div>
                )}
              </div>

              {/* Section 2: Warranty */}
              <div>
                <button
                  onClick={() => setOpenSection(openSection === 'warranty' ? null : 'warranty')}
                  className="w-full px-5 py-4 flex items-center justify-between font-bold text-sm text-zinc-900 bg-zinc-50 hover:bg-zinc-100 transition-colors"
                >
                  <span>Warranty & Support</span>
                  <ChevronDown className={`w-4 h-4 text-zinc-500 transition-transform ${openSection === 'warranty' ? 'rotate-180' : ''}`} />
                </button>
                {openSection === 'warranty' && (
                  <div className="px-5 py-4 text-xs text-zinc-600 space-y-2 bg-white">
                    <p>Includes full 10-Year Warranty covering steel frame structure and electric motors.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Product Feature Infographic / Showcase Section */}
        {displayFeatures && displayFeatures.length > 0 && (
          <ProductFeatureShowcase features={displayFeatures} />
        )}

        {/* Customer Reviews Section */}
        <div className="border-t border-zinc-200 pt-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-zinc-900">Customer Verified Reviews</h2>
              <p className="text-xs text-zinc-500 mt-1">Read what standing desk owners say about Fittrock ergonomics.</p>
            </div>
            {reviewsList.length > 0 && (
              <div className="inline-flex items-center gap-2.5 bg-amber-50 border border-amber-200 px-4 py-2 rounded-2xl self-start sm:self-auto">
                <div className="flex text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-amber-950">{avgRating} out of 5 ({reviewsCount} {reviewsCount === 1 ? 'Review' : 'Reviews'})</span>
              </div>
            )}
          </div>

          {reviewsList.length === 0 ? (
            <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
              <p className="text-sm font-bold text-zinc-800">No customer reviews yet</p>
              <p className="text-xs text-zinc-500">Be the first to review this product after purchase!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviewsList.map((rev) => (
                <ReviewCard key={rev.id} review={rev} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
