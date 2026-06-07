"use client";

import { useRef } from "react";
import Link from "next/link";
import { categories } from "@/data/categories";

function CategoryCard({ c }: { c: (typeof categories)[number] }) {
  return (
    <div className="w-[28rem] max-w-[85vw] shrink-0 snap-start overflow-hidden rounded-xl border border-line bg-white text-charcoal shadow-sm">
      <div className="relative aspect-[5/2] bg-panel-featured">
        {c.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={c.image} alt={c.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-2xl font-semibold text-brand/40">
              {c.name}
            </span>
          </div>
        )}
        {!c.available && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-muted shadow-sm">
            Binnenkort
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-display text-xl font-semibold tracking-tight">
          {c.name}
        </h3>
        <div className="mt-4 flex items-center gap-4">
          <Link
            href={c.compareHref}
            className="rounded-lg bg-coral px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-dark"
          >
            Vergelijk
          </Link>
          <Link
            href={c.dealsHref}
            className="text-sm font-medium text-brand-text underline-offset-4 hover:underline"
          >
            Beste deals →
          </Link>
        </div>
      </div>
    </div>
  );
}

export function CategoryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8 * dir, behavior: "smooth" });
  }

  return (
    <div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {categories.map((c) => (
          <CategoryCard key={c.slug} c={c} />
        ))}
      </div>

      {/* Clean pijltjes onder de carrousel */}
      <div className="mt-6 flex justify-center gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Vorige"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-text shadow-sm transition-transform hover:scale-105"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Volgende"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-brand-text shadow-sm transition-transform hover:scale-105"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
