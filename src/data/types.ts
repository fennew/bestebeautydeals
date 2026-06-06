/**
 * Datamodel voor Beste Beauty Deals.
 * Bewust plat en CMS-vriendelijk gemodelleerd: elk veld mapt straks 1-op-1
 * naar een Sanity-schema (zie /studio later). Nu nog lokale data.
 */

export type SkinType = "droog" | "vet" | "normaal" | "gevoelig" | "gemengd";
export type Coverage = "licht" | "medium" | "hoog";
export type Finish = "matte" | "natuurlijk" | "dewy";
export type Undertone = "koel" | "neutraal" | "warm";

export interface Brand {
  id: string;
  name: string;
  /** True voor MAY Cosmetics — bepaalt prioriteit in de ranglijst. */
  isOwnBrand: boolean;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  /** Merknaam, getoond op de kaart (bijv. "MAY"). */
  brand: string;
  brandId: string;
  /** Subtitel, bijv. "Flawless Foundation SPF 20". */
  tagline: string;
  category: "foundation" | "mascara" | "blush";
  price: number;
  /** Onze redactionele score, 0–10. Bepaalt de ranglijst. */
  score: number;
  /** Sterren 0–5 (afgeleid van reviews). */
  rating: number;
  reviewCount: number;
  /** Bijv. "Onze keuze" — null = geen badge. */
  badge: string | null;
  /** Korte segmentlabel voor SEO-koppen, bijv. "Beste budget". */
  bestForLabel: string;
  skinTypes: SkinType[];
  coverage: Coverage;
  finish: Finish;
  undertones: Undertone[];
  pros: string[];
  cons: string[];
  /** Externe koop-/affiliate-link. */
  dealUrl: string;
  /** Gemiddelde besparing in euro's via onze vergelijking. */
  savings: number;
  /** Hex-kleur voor de placeholder-fles tot er echte foto's via CMS komen. */
  shadeColor: string;
  /** Forceert volgorde: lager = hoger in de lijst. MAY krijgt 0. */
  sortOrder: number;
}

export interface Review {
  id: string;
  name: string;
  location: string;
  rating: number;
  quote: string;
  productName?: string;
}
