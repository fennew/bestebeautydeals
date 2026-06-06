"use client";

import { useRef } from "react";
import type { Review } from "@/data/types";

function TrustStars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} van 5 sterren`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`flex h-6 w-6 items-center justify-center ${
            i < rating ? "bg-[#00b67a]" : "bg-[#dcdce6]"
          }`}
        >
          <svg width="14" height="14" viewBox="0 0 20 20" fill="#fff">
            <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
          </svg>
        </span>
      ))}
    </div>
  );
}

export function ReviewsCarousel({ reviews }: { reviews: Review[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(dir: 1 | -1) {
    const el = trackRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.85 * dir;
    el.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <div>
      {/* Trustpilot-achtige kop */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <TrustStars rating={5} />
          <span className="text-sm">
            <span className="font-semibold">Uitstekend</span>
            <span className="text-muted">
              {" "}
              · 9,3 gemiddeld op basis van 200.000+ ervaringen
            </span>
          </span>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scroll(-1)}
            aria-label="Vorige reviews"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-teal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => scroll(1)}
            aria-label="Volgende reviews"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white transition-colors hover:border-teal"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carrousel */}
      <div
        ref={trackRef}
        className="mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {reviews.map((r) => (
          <figure
            key={r.id}
            className="flex w-[300px] shrink-0 snap-start flex-col rounded-xl border border-line bg-white p-6 sm:w-[340px]"
          >
            <TrustStars rating={r.rating} />
            {r.title && (
              <p className="mt-4 font-semibold text-charcoal">{r.title}</p>
            )}
            <blockquote className="mt-2 flex-1 text-sm leading-relaxed text-charcoal">
              “{r.quote}”
            </blockquote>
            <figcaption className="mt-5 border-t border-line pt-4 text-sm">
              <span className="font-medium text-charcoal">{r.name}</span>
              <span className="text-muted"> — {r.location}</span>
              <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                {r.verified && (
                  <span className="inline-flex items-center gap-1 text-[#00b67a]">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    Geverifieerd
                  </span>
                )}
                {r.date && <span>· {r.date}</span>}
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
