'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ShoppingCart,
  Star,
  ShieldCheck,
  Truck,
  RotateCcw,
  Check,
  Plus,
  Minus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronRight as Crumb,
  Zap,
  Wrench,
  FileText,
  Building2,
  Clock,
} from 'lucide-react';
import { formatPrice, cn } from '@/lib/utils';
import { useCartStore } from '@/store/use-cart-store';
import { toast } from 'sonner';
import { ProductFeatureShowcase, FeatureShowcaseItem } from '@/components/storefront/ProductFeatureShowcase';
import { ReviewCard, ReviewItem } from '@/components/storefront/ReviewCard';
import { faqsData } from '@/lib/faq-data';

// Swatch colours for common frame / tabletop colour names. Unknown names fall back to a neutral chip.
const SWATCH_HEX: Record<string, string> = {
  black: '#1f1f1f',
  'matte black': '#1f1f1f',
  white: '#f5f5f4',
  'pure white': '#f5f5f4',
  grey: '#8a8a8a',
  gray: '#8a8a8a',
  silver: '#c0c0c0',
  walnut: '#5d3a1a',
  oak: '#c8a165',
  teak: '#9a6b3c',
  maple: '#e3c597',
  wenge: '#3b2a20',
  brown: '#6b4423',
  beige: '#d9c7a7',
  'rustic wood': '#8b5a2b',
};

function swatchFor(name: string): string | null {
  const key = name.toLowerCase().trim();
  if (SWATCH_HEX[key]) return SWATCH_HEX[key];
  const partial = Object.keys(SWATCH_HEX).find((k) => key.includes(k));
  return partial ? SWATCH_HEX[partial] : null;
}

const SECTIONS = [
  { id: 'overview', label: 'Overview' },
  { id: 'specifications', label: 'Specifications' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faqs', label: 'FAQs' },
] as const;

function addBusinessDays(from: Date, days: number) {
  const d = new Date(from);
  d.setDate(d.getDate() + days);
  return d;
}

const fmtDay = (d: Date) => d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });

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

  // Group unique colors & sizes across variants
  const availableColors = Array.from(new Set(safeVariants.map((v) => v.color).filter(Boolean))) as string[];
  const availableSizes = Array.from(new Set(safeVariants.map((v) => v.size).filter(Boolean))) as string[];

  const addItem = useCartStore((s) => s.addItem);

  // Gather and arrange images specifically for the selected FRAME COLOR:
  // Display images matching the selected frame color (plus shared neutral feature images),
  // while excluding images belonging to other frame colors.
  const images = React.useMemo(() => {
    const currentColor = (selectedVariant?.color || '').toLowerCase().trim();

    // Map variant IDs to colors
    const variantColorMap = new Map<string, string>();
    safeVariants.forEach((v) => {
      if (v.id && v.color) {
        variantColorMap.set(v.id, v.color.toLowerCase().trim());
      }
    });

    // Identify other frame colors available for this product (e.g. ['black'] when white is selected)
    const otherColors = availableColors
      .map((c) => c.toLowerCase().trim())
      .filter((c) => c && c !== currentColor);

    const isForOtherColor = (imgObj?: { altText?: string | null; variantId?: string | null; url?: string }) => {
      if (!imgObj || otherColors.length === 0) return false;

      // 1. Check variantId linkage
      if (imgObj.variantId && variantColorMap.has(imgObj.variantId)) {
        const varColor = variantColorMap.get(imgObj.variantId);
        if (varColor && varColor !== currentColor) return true;
      }

      const alt = (imgObj.altText || '').toLowerCase();
      const url = (imgObj.url || '').toLowerCase();

      // If alt explicitly includes current color, it belongs to current color
      if (currentColor && alt.includes(currentColor)) {
        return false;
      }

      // If alt or filename explicitly matches another color (e.g. "black" when white is selected)
      for (const oc of otherColors) {
        const regex = new RegExp(`\\b${oc}\\b`, 'i');
        if (regex.test(alt) || regex.test(url)) {
          return true;
        }
      }

      return false;
    };

    const isForCurrentColor = (imgObj?: { altText?: string | null; variantId?: string | null; url?: string }) => {
      if (!currentColor || !imgObj) return false;
      if (imgObj.variantId && variantColorMap.get(imgObj.variantId) === currentColor) return true;
      const alt = (imgObj.altText || '').toLowerCase();
      const regex = new RegExp(`\\b${currentColor}\\b`, 'i');
      return regex.test(alt);
    };

    const colorMatchingImages: string[] = [];
    const sharedNeutralImages: string[] = [];

    // 1. Current selected variant direct image(s) first
    const variantDirectImg = selectedVariant?.imageUrl || (selectedVariant as any)?.image_url;
    if (variantDirectImg) colorMatchingImages.push(variantDirectImg);
    if (Array.isArray(selectedVariant?.imageUrls)) {
      (selectedVariant.imageUrls as string[]).forEach((url) => {
        if (url) colorMatchingImages.push(url);
      });
    }

    // 2. Images from product.images (contains altText, sortOrder, variantId)
    if (Array.isArray(product.images) && product.images.length > 0) {
      const sorted = [...product.images].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      sorted.forEach((img) => {
        if (!img?.url) return;
        if (isForOtherColor(img)) {
          return;
        }
        if (isForCurrentColor(img)) {
          colorMatchingImages.push(img.url);
        } else {
          sharedNeutralImages.push(img.url);
        }
      });
    } else if (Array.isArray(product.imageUrls)) {
      // Fallback: filter product.imageUrls
      product.imageUrls.forEach((url) => {
        if (!url) return;
        let isOther = false;
        for (const oc of otherColors) {
          if (new RegExp(`\\b${oc}\\b`, 'i').test(url)) {
            isOther = true;
            break;
          }
        }
        if (!isOther) {
          colorMatchingImages.push(url);
        }
      });
    }

    // Combine: frame-color matching images first, followed by neutral shared feature graphics
    const combined = [...colorMatchingImages, ...sharedNeutralImages].filter(
      (url, idx, self) => Boolean(url) && self.indexOf(url) === idx
    );

    return combined.length > 0 ? combined : [product?.imageUrl || fallbackImage];
  }, [product, safeVariants, selectedVariant?.id, selectedVariant?.color, availableColors]);

  // When selected variant changes, reset image index to 0 to show the new variant's photo
  const prevVariantIdRef = React.useRef(selectedVariant?.id);
  React.useEffect(() => {
    if (selectedVariant?.id !== prevVariantIdRef.current) {
      prevVariantIdRef.current = selectedVariant?.id;
      setSelectedImageIndex(0);
    }
  }, [selectedVariant?.id]);

  const currentImage = images[selectedImageIndex] || images[0] || fallbackImage;

  const price = selectedVariant ? parseFloat(selectedVariant.price) : parseFloat(product.basePrice || '0');
  const compareAtPrice = selectedVariant?.compareAtPrice ? parseFloat(selectedVariant.compareAtPrice) : null;
  const variantStock = selectedVariant ? (selectedVariant.stockQuantity ?? (selectedVariant as any).inventory_quantity ?? 10) : 10;
  const isOutOfStock = variantStock <= 0;


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

  const formattedDescription = React.useMemo(() => {
    if (!product.description) return '';
    return product.description
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<img(?![^>]*\bsrc\s*=\s*['"][^'"]+['"])[^>]*>/gi, '')
      .replace(/<p>\s*(?:&nbsp;|\s|<br\s*\/?>)*<\/p>/gi, '')
      .trim();
  }, [product.description]);

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

  const router = useRouter();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [showStickyBar, setShowStickyBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Show the compact sticky purchase bar once the main Add-to-Cart block scrolls out of view.
  useEffect(() => {
    const el = ctaRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Highlight the section tab currently in view.
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(e.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    SECTIONS.forEach((s) => {
      const node = document.getElementById(s.id);
      if (node) obs.observe(node);
    });
    return () => obs.disconnect();
  }, []);

  const handleBuyNow = () => {
    if (!selectedVariant || isOutOfStock) return;
    handleAddToCart();
    router.push('/checkout');
  };

  // Derived product facts (same sources and fallbacks the page has always used)
  const isDual = product.motorType === 'dual';
  const isSingle = product.motorType === 'single';
  const motorLabel = isSingle
    ? 'Single Motor Electric Lift'
    : isDual
    ? 'Dual-Motor Synchronized Lift'
    : null;
  const loadLabel = product.weightCapacityKg
    ? `${product.weightCapacityKg} kg`
    : isSingle
    ? '100 kg'
    : '125 kg';
  const heightLabel = product.heightRangeMm || (isSingle ? '710mm - 1190mm' : '620mm - 1270mm');
  const warrantyYears = product.warrantyMonths ? Math.round(Number(product.warrantyMonths) / 12) : 3;

  const keyPoints = [
    motorLabel ? `${motorLabel}, whisper-quiet under 42 dB` : null,
    `${loadLabel} maximum load capacity`,
    `${heightLabel} height range with 4 memory presets`,
    `${warrantyYears}-Year frame warranty, 1-Year motor warranty`,
  ].filter(Boolean) as string[];

  const discountPct =
    compareAtPrice && compareAtPrice > price ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100) : 0;

  // Price for a size option at the currently selected colour, used on the size cards.
  const priceForSize = (size: string) => {
    const v =
      safeVariants.find((x) => x.size === size && x.color === selectedVariant?.color) ||
      safeVariants.find((x) => x.size === size);
    return v ? parseFloat(v.price) : null;
  };

  const today = new Date();
  const deliveryFrom = fmtDay(addBusinessDays(today, 5));
  const deliveryTo = fmtDay(addBusinessDays(today, 7));

  const specGroups: Array<{ title: string; rows: Array<[string, string]> }> = [
    {
      title: 'General',
      rows: [
        ['Model', product.name],
        ['SKU', selectedVariant?.sku || product.slug],
        ['Brand', product.brand || 'Fittrock'],
        ['Assembly', 'Self-assembly (DIY)'],
        ['Average Assembly Time', '15 – 20 minutes'],
        ['Warranty', `${warrantyYears}-Year frame (structural), 1-Year motor & electronics`],
        ['Returns', '10-Day risk-free trial with doorstep reverse pickup'],
      ],
    },
    {
      title: 'Frame',
      rows: [
        ...(motorLabel ? ([['Motor Type', motorLabel]] as Array<[string, string]>) : []),
        ['Lifting Capacity', loadLabel],
        ['Height Range', heightLabel],
        ['Noise Level', '< 42 dB'],
        ['Memory Presets', '4 presets with LED digital height display'],
        ['Anti-Collision', '6-axis gyro sensor, auto-reverse on contact'],
        ['Material', 'Cold-rolled carbon steel, powder-coated'],
        ...(selectedVariant?.color ? ([['Frame Color', selectedVariant.color]] as Array<[string, string]>) : []),
      ],
    },
    ...(selectedVariant?.size && selectedVariant.size !== 'Standard'
      ? [{ title: 'Tabletop', rows: [['Size', selectedVariant.size]] as Array<[string, string]> }]
      : []),
  ];

  const productFaqs = faqsData.filter((f) => f.category !== 'desks' || /custom tabletop|GST/i.test(f.question));

  // Rating histogram from real reviews
  const ratingBuckets = [5, 4, 3, 2, 1].map((star) => {
    const count = reviewsList.filter((r) => Math.round(Number(r.rating) || 5) === star).length;
    return { star, count, pct: reviewsCount ? Math.round((count / reviewsCount) * 100) : 0 };
  });

  const scrollTo = (id: string) => {
    const node = document.getElementById(id);
    if (!node) return;
    const y = node.getBoundingClientRect().top + window.scrollY - 140;
    window.scrollTo({ top: y, behavior: 'smooth' });
  };

  return (
    <div className="bg-white text-zinc-900 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb (mirrors BreadcrumbList structured data) */}
        <nav aria-label="Breadcrumb" className="pt-5 pb-4 text-xs text-zinc-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-zinc-900">Home</Link>
            </li>
            <Crumb className="w-3 h-3" aria-hidden="true" />
            <li>
              <Link href="/collections/standing-desks" className="hover:text-zinc-900">Standing Desks</Link>
            </li>
            <Crumb className="w-3 h-3" aria-hidden="true" />
            <li aria-current="page" className="text-zinc-900 font-semibold truncate max-w-[60vw]">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ───────── Left: gallery ───────── */}
          <div className="lg:col-span-7">
            <div className="lg:sticky lg:top-24 space-y-3">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-200 group">
                <img
                  src={currentImage}
                  alt={`${product.name}${selectedVariant?.color ? ` in ${selectedVariant.color}` : ''}`}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />

                {discountPct > 0 && (
                  <span className="absolute top-4 left-4 bg-red-600 text-white text-xs font-black px-2.5 py-1 rounded-md shadow">
                    {discountPct}% OFF
                  </span>
                )}

                {images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-zinc-800 border border-zinc-200 flex items-center justify-center shadow-md opacity-90 hover:opacity-100 hover:bg-white"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 text-zinc-800 border border-zinc-200 flex items-center justify-center shadow-md opacity-90 hover:opacity-100 hover:bg-white"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <span className="absolute bottom-3 right-3 bg-black/60 text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      {selectedImageIndex + 1} / {images.length}
                    </span>
                  </>
                )}
              </div>

              {images.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={img + idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      aria-label={`Show image ${idx + 1}`}
                      aria-current={selectedImageIndex === idx}
                      className={cn(
                        'relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 bg-zinc-50 shrink-0 transition-all',
                        selectedImageIndex === idx
                          ? 'border-zinc-900'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      )}
                    >
                      <img
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ───────── Right: buy box ───────── */}
          <div className="lg:col-span-5 space-y-6">
            {/* Title block */}
            <div className="space-y-3">
              <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                Model: {selectedVariant?.sku || product.slug}
              </p>
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-zinc-900 leading-tight">
                {product.name}
              </h1>
              <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">{heroSummary}</p>

              <ul className="space-y-1.5 pt-1">
                {keyPoints.map((pt) => (
                  <li key={pt} className="flex items-start gap-2 text-sm text-zinc-800">
                    <Check className="w-4 h-4 mt-0.5 text-emerald-600 shrink-0" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => scrollTo('reviews')}
                className="flex items-center gap-2 text-sm font-semibold text-zinc-700 hover:text-zinc-900"
              >
                <span className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        'w-4 h-4',
                        i < Math.round(Number(avgRating)) ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'
                      )}
                    />
                  ))}
                </span>
                {reviewsCount > 0 ? (
                  <span className="underline underline-offset-2">
                    {avgRating} ({reviewsCount} {reviewsCount === 1 ? 'Review' : 'Reviews'})
                  </span>
                ) : (
                  <span className="underline underline-offset-2">Be the first to review</span>
                )}
              </button>
            </div>

            {/* Price block */}
            <div className="border-y border-zinc-200 py-4 space-y-1.5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-3xl sm:text-4xl font-black text-zinc-900">{formatPrice(price)}</span>
                {discountPct > 0 && compareAtPrice && (
                  <>
                    <span className="text-lg text-zinc-400 line-through">{formatPrice(compareAtPrice)}</span>
                    <span className="bg-red-50 text-red-700 border border-red-200 text-xs font-black px-2 py-0.5 rounded">
                      {discountPct}% OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-xs text-zinc-500">
                Inclusive of 18% GST
                {discountPct > 0 && compareAtPrice && (
                  <span className="ml-2 font-semibold text-emerald-700">
                    You save {formatPrice(compareAtPrice - price)}
                  </span>
                )}
              </p>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                <Clock className="w-3.5 h-3.5" />
                {isOutOfStock
                  ? 'Currently sold out'
                  : variantStock <= 5
                  ? `Only ${variantStock} left in stock. Dispatched within 24 hours`
                  : 'In stock. Dispatched within 24 hours'}
              </p>
            </div>

            {/* Frame colour swatches */}
            {availableColors.length > 0 && !(availableColors.length === 1 && availableColors[0] === 'Default Color') && (
              <fieldset className="space-y-3">
                <legend className="text-sm font-bold text-zinc-900 mb-3">
                  Frame Color: <span className="font-normal text-zinc-600">{selectedVariant?.color}</span>
                </legend>
                <div className="flex flex-wrap gap-3">
                  {availableColors.map((color) => {
                    const isSelected = selectedVariant?.color === color;
                    const isAvailable = checkColorAvailable(color);
                    const hex = swatchFor(color);
                    return (
                      <button
                        key={color}
                        type="button"
                        onClick={() => handleColorChange(color)}
                        aria-label={`${color}${isAvailable ? '' : ' (unavailable in this size)'}`}
                        aria-pressed={isSelected}
                        title={color}
                        className={cn(
                          'relative w-11 h-11 rounded-full p-0.5 border-2 transition-all',
                          isSelected ? 'border-zinc-900' : 'border-transparent hover:border-zinc-300',
                          !isAvailable && 'opacity-40'
                        )}
                      >
                        <span
                          className="block w-full h-full rounded-full border border-zinc-300"
                          style={{ background: hex || '#e4e4e7' }}
                        >
                          {!hex && (
                            <span className="flex h-full items-center justify-center text-[10px] font-bold text-zinc-700">
                              {color.slice(0, 2).toUpperCase()}
                            </span>
                          )}
                        </span>
                        {!isAvailable && (
                          <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                            <span className="block w-full h-0.5 bg-zinc-500 rotate-45" />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {/* Size option cards */}
            {availableSizes.length > 0 && !(availableSizes.length === 1 && availableSizes[0] === 'Standard') && (
              <fieldset>
                <legend className="text-sm font-bold text-zinc-900 mb-3">
                  Tabletop Size: <span className="font-normal text-zinc-600">{selectedVariant?.size}</span>
                </legend>
                <div className="grid grid-cols-2 gap-2.5">
                  {availableSizes.map((size) => {
                    const isSelected = selectedVariant?.size === size;
                    const isAvailable = checkSizeAvailable(size);
                    const sizePrice = priceForSize(size);
                    const delta = sizePrice !== null ? sizePrice - price : 0;
                    return (
                      <button
                        key={size}
                        type="button"
                        onClick={() => handleSizeChange(size)}
                        aria-pressed={isSelected}
                        className={cn(
                          'text-left rounded-xl border-2 px-3.5 py-3 transition-all',
                          isSelected ? 'border-zinc-900 bg-zinc-50' : 'border-zinc-200 hover:border-zinc-400',
                          !isAvailable && 'opacity-50'
                        )}
                      >
                        <span className="block text-sm font-bold text-zinc-900">{size}</span>
                        <span className="block text-xs text-zinc-500 mt-0.5">
                          {!isAvailable
                            ? 'Unavailable in this colour'
                            : isSelected || delta === 0
                            ? sizePrice !== null
                              ? formatPrice(sizePrice)
                              : ''
                            : `${delta > 0 ? '+' : '−'} ${formatPrice(Math.abs(delta))}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            )}

            {/* Assembly */}
            <fieldset>
              <legend className="text-sm font-bold text-zinc-900 mb-3">
                Assembly: <span className="font-normal text-zinc-600">Self-assembly</span>
              </legend>
              <div className="rounded-xl border-2 border-zinc-900 bg-zinc-50 px-3.5 py-3 flex items-start gap-3">
                <Wrench className="w-5 h-5 text-zinc-700 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-zinc-900">Self-assembly · 15–20 min</p>
                  <p className="text-xs text-zinc-500 mt-0.5">
                    Pre-drilled tabletop, labelled tools and a step-by-step video guide in the box.
                  </p>
                </div>
              </div>
            </fieldset>

            {/* Quantity + CTAs */}
            <div ref={ctaRef} className="space-y-3 pt-1">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-zinc-300 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-zinc-600 hover:text-zinc-900"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-bold text-sm" aria-live="polite">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(variantStock || 1, quantity + 1))}
                    className="p-3 text-zinc-600 hover:text-zinc-900"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className={cn(
                    'flex-1 py-3.5 rounded-xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 border-2 transition-all',
                    isOutOfStock
                      ? 'bg-zinc-100 text-zinc-400 border-zinc-200 cursor-not-allowed'
                      : 'border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white'
                  )}
                >
                  <ShoppingCart className="w-4 h-4" />
                  {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
                </button>
              </div>
              {!isOutOfStock && (
                <button
                  onClick={handleBuyNow}
                  className="w-full py-4 rounded-xl font-black uppercase tracking-wider text-sm bg-amber-500 hover:bg-amber-400 text-zinc-950 shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
                >
                  <Zap className="w-4 h-4" />
                  Buy Now
                </button>
              )}
              <p className="flex items-center gap-2 text-xs text-zinc-600" suppressHydrationWarning>
                <Truck className="w-4 h-4 text-zinc-500" />
                <span>
                  <strong className="text-zinc-900">Free shipping.</strong> Estimated delivery {deliveryFrom} – {deliveryTo}
                </span>
              </p>
            </div>

            {/* Trust row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { icon: Truck, title: 'Free Shipping', sub: 'Pan-India' },
                { icon: ShieldCheck, title: `${warrantyYears}-Yr Warranty`, sub: 'Frame structure' },
                { icon: RotateCcw, title: '10-Day Trial', sub: 'Doorstep pickup' },
                { icon: FileText, title: 'GST Invoice', sub: 'Claim ITC' },
              ].map(({ icon: Icon, title, sub }) => (
                <div key={title} className="border border-zinc-200 rounded-xl p-2.5 text-center">
                  <Icon className="w-5 h-5 text-amber-600 mx-auto" />
                  <p className="text-[11px] font-bold text-zinc-900 mt-1">{title}</p>
                  <p className="text-[10px] text-zinc-500">{sub}</p>
                </div>
              ))}
            </div>

            {/* Bulk / office callout */}
            <Link
              href="/contact"
              className="flex items-center gap-3 rounded-xl bg-zinc-900 text-white px-4 py-3.5 hover:bg-zinc-800"
            >
              <Building2 className="w-5 h-5 text-amber-400 shrink-0" />
              <span className="text-sm">
                <strong>Buying for an office?</strong>{' '}
                <span className="text-zinc-300">Get bulk pricing and GST billing.</span>
              </span>
              <ChevronRight className="w-4 h-4 ml-auto" />
            </Link>
          </div>
        </div>
      </div>

      {/* ───────── Sticky section tabs ───────── */}
      <div className="sticky top-16 sm:top-20 z-30 mt-14 bg-white/95 backdrop-blur border-y border-zinc-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex gap-6 overflow-x-auto">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollTo(s.id)}
              className={cn(
                'py-3.5 text-sm font-bold whitespace-nowrap border-b-2 -mb-px transition-colors',
                activeSection === s.id
                  ? 'border-amber-500 text-zinc-900'
                  : 'border-transparent text-zinc-500 hover:text-zinc-900'
              )}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Overview */}
        <section id="overview" className="pt-14 scroll-mt-36">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6">Overview</h2>
          {displayFeatures && displayFeatures.length > 0 && <ProductFeatureShowcase features={displayFeatures} />}
          {(formattedDescription || heroSummary) && (
            <div className="max-w-4xl mt-6">
              {formattedDescription && formattedDescription.includes('<') ? (
                <div
                  className="product-description-content max-w-none text-[15px] text-zinc-700 leading-relaxed space-y-4"
                  dangerouslySetInnerHTML={{ __html: formattedDescription }}
                />
              ) : (
                <p className="text-[15px] text-zinc-700 leading-relaxed whitespace-pre-line">
                  {formattedDescription || heroSummary}
                </p>
              )}
            </div>
          )}
        </section>

        {/* Specifications */}
        <section id="specifications" className="pt-16 scroll-mt-36">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6">Technical Specifications</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {specGroups.map((group) => (
              <div key={group.title} className="border border-zinc-200 rounded-2xl overflow-hidden">
                <h3 className="bg-zinc-50 px-5 py-3 text-sm font-black uppercase tracking-wider text-zinc-700 border-b border-zinc-200">
                  {group.title}
                </h3>
                <dl className="divide-y divide-zinc-100">
                  {group.rows.map(([k, v]) => (
                    <div key={k} className="grid grid-cols-5 gap-3 px-5 py-3 text-sm">
                      <dt className="col-span-2 text-zinc-500">{k}</dt>
                      <dd className="col-span-3 font-semibold text-zinc-900">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        {/* Reviews */}
        <section id="reviews" className="pt-16 scroll-mt-36">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6">Customer Reviews</h2>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4 border border-zinc-200 rounded-2xl p-6 h-fit">
              <div className="flex items-end gap-2">
                <span className="text-5xl font-black">{reviewsCount > 0 ? avgRating : '–'}</span>
                <span className="text-sm text-zinc-500 mb-1.5">out of 5</span>
              </div>
              <div className="flex mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      'w-5 h-5',
                      reviewsCount > 0 && i < Math.round(Number(avgRating)) ? 'fill-amber-400 text-amber-400' : 'text-zinc-300'
                    )}
                  />
                ))}
              </div>
              <p className="text-xs text-zinc-500 mt-1">
                Based on {reviewsCount} {reviewsCount === 1 ? 'review' : 'reviews'}
              </p>
              <div className="mt-5 space-y-2">
                {ratingBuckets.map((b) => (
                  <div key={b.star} className="flex items-center gap-2 text-xs">
                    <span className="w-6 text-zinc-600">{b.star}★</span>
                    <span className="flex-1 h-2 rounded-full bg-zinc-100 overflow-hidden">
                      <span className="block h-full bg-amber-400" style={{ width: `${b.pct}%` }} />
                    </span>
                    <span className="w-8 text-right text-zinc-500">{b.count}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-8">
              {reviewsList.length === 0 ? (
                <div className="text-center py-12 bg-zinc-50 rounded-2xl border border-zinc-200 space-y-2">
                  <p className="text-sm font-bold text-zinc-800">No customer reviews yet</p>
                  <p className="text-xs text-zinc-500">Be the first to review this product after purchase!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {reviewsList.map((rev, i) => (
                    <ReviewCard key={rev.id || i} review={rev} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section id="faqs" className="pt-16 scroll-mt-36">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-6">Frequently Asked Questions</h2>
          <div className="border-t border-zinc-200">
            {productFaqs.map((faq, i) => {
              const open = openFaq === i;
              return (
                <div key={faq.question} className="border-b border-zinc-200">
                  <button
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    className="w-full flex items-center gap-4 py-5 text-left"
                  >
                    <span className="text-sm font-black text-amber-600 w-6">{String(i + 1).padStart(2, '0')}</span>
                    <span className="flex-1 font-bold text-zinc-900">{faq.question}</span>
                    <ChevronDown className={cn('w-5 h-5 text-zinc-500 transition-transform', open && 'rotate-180')} />
                  </button>
                  {open && <p className="pb-5 pl-10 pr-8 text-sm text-zinc-600 leading-relaxed">{faq.answer}</p>}
                </div>
              );
            })}
          </div>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-amber-50 border border-amber-200 p-6">
            <div>
              <p className="font-black text-zinc-900">Still have questions?</p>
              <p className="text-sm text-zinc-600">Speak with a Fittrock ergonomics expert before you buy.</p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-900 text-white px-5 py-3 text-sm font-bold hover:bg-zinc-800"
            >
              Contact us <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      </div>

      {/* ───────── Sticky purchase bar ───────── */}
      <div
        className={cn(
          'fixed bottom-0 inset-x-0 z-40 bg-white border-t border-zinc-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] transition-transform duration-300',
          showStickyBar ? 'translate-y-0' : 'translate-y-full'
        )}
        aria-hidden={!showStickyBar}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <img src={currentImage} alt="" className="hidden sm:block w-12 h-12 rounded-lg object-cover border border-zinc-200" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold truncate">{product.name}</p>
            <p className="text-xs text-zinc-500 truncate">
              {[selectedVariant?.color, selectedVariant?.size]
                .filter((x) => x && x !== 'Default Color' && x !== 'Standard')
                .join(' · ')}
              <span className="ml-2 font-bold text-zinc-900">{formatPrice(price)}</span>
            </p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={isOutOfStock}
            tabIndex={showStickyBar ? 0 : -1}
            className="hidden sm:inline-flex items-center gap-2 px-5 py-3 rounded-xl border-2 border-zinc-900 text-sm font-black uppercase tracking-wider hover:bg-zinc-900 hover:text-white disabled:opacity-40"
          >
            <ShoppingCart className="w-4 h-4" /> Add to Cart
          </button>
          <button
            onClick={handleBuyNow}
            disabled={isOutOfStock}
            tabIndex={showStickyBar ? 0 : -1}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-black uppercase tracking-wider disabled:opacity-40"
          >
            {isOutOfStock ? 'Sold Out' : 'Buy Now'}
          </button>
        </div>
      </div>
    </div>
  );
}
