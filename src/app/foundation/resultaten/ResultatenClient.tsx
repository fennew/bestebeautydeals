"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getFoundations, brands } from "@/data/products";
import { DealRow } from "@/components/DealRow";
import type { SkinType } from "@/data/types";

const skinOptions: { value: SkinType | "alle"; label: string }[] = [
  { value: "alle", label: "Alle huidtypes" },
  { value: "droog", label: "Droge huid" },
  { value: "vet", label: "Vette huid" },
  { value: "gevoelig", label: "Gevoelige huid" },
  { value: "gemengd", label: "Gemengde huid" },
];

export function ResultatenClient() {
  const params = useSearchParams();
  const initialSkin = (params.get("skin") as SkinType | null) ?? "alle";

  const all = useMemo(() => getFoundations(), []);
  const foundationBrands = useMemo(
    () => brands.filter((b) => all.some((p) => p.brandId === b.id)),
    [all],
  );

  const [maxPrice, setMaxPrice] = useState(100);
  const [skin, setSkin] = useState<SkinType | "alle">(initialSkin);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const filtered = all.filter((p) => {
    if (p.price > maxPrice) return false;
    if (skin !== "alle" && !p.skinTypes.includes(skin)) return false;
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
    setSkin("alle");
    setSelectedBrands([]);
  }

  return (
    <>
      {/* Gecentreerde titel-band */}
      <section className="bg-brand bg-gradient-to-b from-transparent to-black/20 text-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Dit zijn jouw beste foundation-deals
          </h1>
          <p className="mt-2 text-cream/80">
            {filtered.length} resultaten — onze keuze staat bovenaan, afgestemd
            op jouw huidprofiel.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-2xl bg-white p-5 shadow-sm ring-1 ring-line">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg">Filter resultaten</h2>
            <button
              onClick={reset}
              className="text-sm font-medium text-teal hover:underline"
            >
              Wissen
            </button>
          </div>

          {/* Prijs */}
          <div className="mt-6">
            <p className="text-sm font-semibold">Prijs</p>
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
            <p className="text-sm font-semibold">Merk</p>
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
            <p className="text-sm font-semibold">Huidtype</p>
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
            <p className="font-display text-xl">Geen deals gevonden</p>
            <p className="mt-2 text-muted">
              Pas je filters aan om meer foundations te zien.
            </p>
            <button
              onClick={reset}
              className="mt-4 rounded-xl bg-teal px-5 py-2.5 font-semibold text-cream"
            >
              Filters wissen
            </button>
          </div>
        )}
        </div>
      </div>
    </>
  );
}
