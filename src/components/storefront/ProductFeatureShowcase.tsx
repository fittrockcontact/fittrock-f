import React from 'react';
import { Sparkles } from 'lucide-react';

export interface FeatureHighlight {
  title: string;
  description: string;
}

export interface FeatureShowcaseItem {
  id?: string;
  imageUrl: string;
  title: string;
  subtitle?: string;
  highlights: FeatureHighlight[];
  imagePosition?: 'left' | 'right';
}

export interface ProductFeatureShowcaseProps {
  features?: FeatureShowcaseItem[];
}

export function ProductFeatureShowcase({ features }: ProductFeatureShowcaseProps) {
  if (!features || features.length === 0) {
    return null;
  }

  return (
    <section className="my-16 sm:my-24 space-y-12 sm:space-y-16">
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-700 border border-amber-500/20 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Product Engineering & Features</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 tracking-tight">
          Engineered for Daily Excellence
        </h2>
        <p className="text-sm text-zinc-500">
          Discover the technology, precision controls, and premium components built into every detail.
        </p>
      </div>

      <div className="space-y-10 sm:space-y-12">
        {features.map((item, idx) => {
          const isImageRight = item.imagePosition === 'right' || idx % 2 === 1;

          return (
            <div
              key={item.id || idx}
              className="bg-zinc-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-zinc-800/80 shadow-2xl overflow-hidden transition-all duration-300 hover:border-zinc-700"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                {/* Image Section */}
                <div
                  className={`lg:col-span-6 ${
                    isImageRight ? 'lg:order-2' : 'lg:order-1'
                  }`}
                >
                  <div className="relative rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800 shadow-inner group">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-auto max-h-[480px] object-cover transition-transform duration-500 group-hover:scale-102"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* Structured Feature Content Section */}
                <div
                  className={`lg:col-span-6 space-y-6 ${
                    isImageRight ? 'lg:order-1' : 'lg:order-2'
                  }`}
                >
                  <div className="space-y-2 border-b border-zinc-800 pb-5">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p className="text-zinc-400 text-sm sm:text-base font-normal">
                        {item.subtitle}
                      </p>
                    )}
                  </div>

                  <div className="space-y-5">
                    {item.highlights && item.highlights.map((highlight, hIdx) => (
                      <div key={hIdx} className="space-y-1">
                        <h4 className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                          <span>{highlight.title}</span>
                        </h4>
                        <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed pl-4">
                          {highlight.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
