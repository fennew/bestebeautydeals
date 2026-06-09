"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { DealRow } from "@/components/DealRow";
import type { Product, SkinType } from "@/data/types";
import type { ResultsPageContent } from "@/sanity/lib/fetch";

export function ResultatenClient({
  products,
  brands,
  content,
}: {
  products: Product[];
  brands: { id: string; name: string }[];
  content: ResultsPageContent;
}) {
  const params = useSearchParams();
  const skinOptions = content.skinOptions;
  // De eerste optie geldt als 'toon alles' (geen huidtype-filter).
  const allValue = skinOptions[0]?.value ?? "alle";
  const initialSkin = params.get("skin") ?? allValue;

  const all = products;
  const foundationBrands = brands;

  const [maxPrice, setMaxPrice] = useState(100);
  const [skin, setSkin] = useState<string>(initialSkin);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = all.filter((p) => {
    if (p.price > maxPrice) return false;
    if (skin !== allValue && !p.skinTypes.includes(skin as SkinType))
      return false;
    if (selectedBrands.length > 0 && !selectedBrands.includes(p.brandId))
      return false;
    return true;
  });

  function toggleBrand(id: string) {
    setSelectedBrands((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id],
    );
  }

  function reset() {
    setMaxPrice(100);
    setSkin(allValue);
    setSelectedBrands([]);
  }

  return (
    <>
      {/* Gecentreerde titel-band */}
      <section className="bg-brand bg-gradient-to-b from-transparent to-black/12 text-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {content.title}
          </h1>
          <p className="mt-2 text-cream/80">
            {content.subtitle.replace("{count}", String(filtered.length))}
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Mobiele filter-knop (balkje zoals Pricewise/Marktplaats) */}
        <button
          type="button"
          onClick={() => setFiltersOpen((o) => !o)}
          className="mb-5 flex w-full items-center justify-between rounded-xl border border-line bg-white px-4 py-3 font-medium text-charcoal shadow-sm lg:hidden"
          aria-expanded={filtersOpen}
        >
          <span className="flex items-center gap-2">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18M7 12h10M10 18h4" />
            </svg>
            {content.mobileFilterLabel}
          </span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${filtersOpen ? "rotate-180" : ""}`}>
            <path d="m6 9 6 6 6-6" />
          </svg>
        </button>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside
          className={`h-fit rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line lg:block ${
            filtersOpen ? "block" : "hidden"
          }`}
        >
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg">{content.filterTitle}</h2>
            <button
              onClick={reset}
              className="text-sm font-medium text-teal hover:underline"
            >
              {content.clearLabel}
            </button>
          </div>

          {/* Prijs */}
          <div className="mt-6">
            <p className="text-sm font-semibold">{content.priceLabel}</p>
            <div className="mt-2 flex justify-between text-sm text-muted">
              <span>€10</span>
              <span>€{maxPrice}</span>
            </div>
            <input
              type="range"
              min={10}
              max={100}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="mt-1 w-full accent-teal"
            />
          </div>

          {/* Merk */}
          <div className="mt-6">
            <p className="text-sm font-semibold">{content.brandLabel}</p>
            <div className="mt-2 space-y-2">
              {foundationBrands.map((b) => (
                <label key={b.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(b.id)}
                    onChange={() => toggleBrand(b.id)}
                    className="h-4 w-4 accent-teal"
                  />
                  {b.name}
                </label>
              ))}
            </div>
          </div>

          {/* Huidtype */}
          <div className="mt-6">
            <p className="text-sm font-semibold">{content.skinLabel}</p>
            <div className="mt-2 space-y-2">
              {skinOptions.map((o) => (
                <label key={o.value} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="skin"
                    checked={skin === o.value}
                    onChange={() => setSkin(o.value)}
                    className="h-4 w-4 accent-teal"
                  />
                  {o.label}
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* Resultaten */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-5">
            {filtered.map((p, i) => (
              <DealRow key={p.id} product={p} rank={i + 1} featured={i === 0} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center ring-1 ring-line">
            <p className="font-display text-xl">{content.emptyTitle}</p>
            <p className="mt-2 text-muted">{content.emptyText}</p>
            <button
              onClick={reset}
              className="mt-4 rounded-xl bg-teal px-5 py-2.5 font-semibold text-cream"
            >
              {content.emptyButtonLabel}
            </button>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
