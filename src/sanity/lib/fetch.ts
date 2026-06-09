import { client } from "./client";
import type { Product, Review } from "@/data/types";
import type { Category } from "@/data/categories";

// Altijd verse data ophalen, zodat edits in de Studio direct live komen.
// (Later voor productie evt. terug naar ISR + webhook voor performance.)
const opts = { cache: "no-store" } as const;

// Lokale fallback-afbeeldingen per categorie (tot er foto's via de CMS komen).
const localCategoryImages: Record<string, string> = {
  foundation: "/category-foundation.png",
};

type SanityProduct = {
  _id: string;
  name: string;
  slug: string;
  brand: string;
  tagline?: string;
  price: number;
  priceOriginal?: number;
  score?: number;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  bestForLabel?: string;
  skinTypes?: string[];
  coverage?: Product["coverage"];
  finish?: Product["finish"];
  pros?: string[];
  cons?: string[];
  dealUrl?: string;
  rank?: number;
  image?: string;
};

function mapProduct(p: SanityProduct): Product {
  // Besparing automatisch: van-prijs minus huidige prijs (afgerond op hele euro).
  const savings =
    p.priceOriginal && p.priceOriginal > p.price
      ? Math.round(p.priceOriginal - p.price)
      : 0;
  return {
    id: p._id,
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    brandId: p.brand,
    tagline: p.tagline ?? "",
    category: "foundation",
    price: p.price,
    score: p.score ?? 0,
    rating: p.rating ?? 0,
    reviewCount: p.reviewCount ?? 0,
    badge: p.badge ?? null,
    bestForLabel: p.bestForLabel ?? "",
    skinTypes: (p.skinTypes ?? []) as Product["skinTypes"],
    coverage: p.coverage ?? "medium",
    finish: p.finish ?? "natuurlijk",
    undertones: [],
    pros: p.pros ?? [],
    cons: p.cons ?? [],
    dealUrl: p.dealUrl ?? "#",
    savings,
    shadeColor: "#e7c4a0",
    sortOrder: p.rank ?? 100,
    image: p.image,
  };
}

const PRODUCTS_QUERY = `*[_type == "product" && category->slug.current == $cat]{
  _id, name, "slug": slug.current, brand, tagline, price, priceOriginal, score, rating,
  reviewCount, badge, bestForLabel, skinTypes, coverage, finish, pros, cons,
  dealUrl, rank, "image": image.asset->url
} | order(rank asc)`;

export async function getFoundations(): Promise<Product[]> {
  const data = await client.fetch<SanityProduct[]>(
    PRODUCTS_QUERY,
    { cat: "foundation" },
    opts,
  );
  return data.map(mapProduct);
}

const CATEGORIES_QUERY = `*[_type == "category"] | order(order asc){
  _id, name, "slug": slug.current, tagline, isLive, "image": image.asset->url
}`;

type SanityCategory = {
  name: string;
  slug: string;
  tagline?: string;
  isLive?: boolean;
  image?: string;
};

export async function getCategories(): Promise<Category[]> {
  const data = await client.fetch<SanityCategory[]>(CATEGORIES_QUERY, {}, opts);
  return data.map((c) => ({
    name: c.name,
    slug: c.slug,
    tagline: c.tagline ?? "",
    image: c.image ?? localCategoryImages[c.slug],
    compareHref: c.isLive ? `/${c.slug}/zoeken` : `/${c.slug}`,
    dealsHref: `/${c.slug}`,
    available: !!c.isLive,
  }));
}

export type SelectOption = { value: string; label: string };

export type ComparePageContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  submitLabel: string;
  selectPlaceholder: string;
  ageLabel: string;
  ageOptions: SelectOption[];
  skinLabel: string;
  skinOptions: SelectOption[];
  brandLabel: string;
  brandOptional: string;
  brandPlaceholder: string;
  concernLabel: string;
  concernOptions: SelectOption[];
};

const COMPARE_PAGE_QUERY = `*[_type == "comparePage"][0]{
  eyebrow, title, subtitle, submitLabel, selectPlaceholder,
  ageLabel, ageOptions[]{value, label},
  skinLabel, skinOptions[]{value, label},
  brandLabel, brandOptional, brandPlaceholder,
  concernLabel, concernOptions[]{value, label}
}`;

const DEFAULT_COMPARE_PAGE: ComparePageContent = {
  eyebrow: "Foundation-vergelijker",
  title: "Foundation vergelijken? Vind de beste deal voor jou",
  subtitle:
    "Vul je huidprofiel in en wij tonen direct de best passende foundation-deals — afgestemd op jouw huid.",
  submitLabel: "Vergelijk",
  selectPlaceholder: "Selecteer",
  ageLabel: "Leeftijd",
  ageOptions: [
    { value: "<30", label: "Jonger dan 30" },
    { value: "30-39", label: "30 – 39 jaar" },
    { value: "40-49", label: "40 – 49 jaar" },
    { value: "50-59", label: "50 – 59 jaar" },
    { value: "60+", label: "60 jaar en ouder" },
  ],
  skinLabel: "Huidtype",
  skinOptions: [
    { value: "droog", label: "Droog" },
    { value: "vet", label: "Vet" },
    { value: "normaal", label: "Normaal" },
    { value: "gevoelig", label: "Gevoelig" },
    { value: "gemengd", label: "Gemengd" },
  ],
  brandLabel: "Welk foundationmerk gebruik je nu?",
  brandOptional: "(optioneel)",
  brandPlaceholder: "Bijv. L'Oréal, Maybelline, MAC",
  concernLabel: "Wat moet je foundation dekken?",
  concernOptions: [
    { value: "lijntjes", label: "Fijne lijntjes en rimpels" },
    { value: "pigment", label: "Ouderdomsvlekken en ongelijkmatige toon" },
    { value: "droogte", label: "Droogte en ruwe textuur" },
    { value: "verslapping", label: "Verslapping van de huid" },
    { value: "porien", label: "Grote poriën" },
    { value: "acne", label: "Acne en puistjes" },
    { value: "roodheid", label: "Roodheid en irritatie" },
  ],
};

function optionsOr(
  arr: SelectOption[] | undefined | null,
  fallback: SelectOption[],
): SelectOption[] {
  return Array.isArray(arr) && arr.length > 0
    ? arr.filter((o) => o?.value && o?.label).map((o) => ({ value: o.value, label: o.label }))
    : fallback;
}

export async function getComparePage(): Promise<ComparePageContent> {
  const data = await client.fetch<Partial<ComparePageContent> | null>(
    COMPARE_PAGE_QUERY,
    {},
    opts,
  );
  const d = DEFAULT_COMPARE_PAGE;
  return {
    eyebrow: data?.eyebrow ?? d.eyebrow,
    title: data?.title ?? d.title,
    subtitle: data?.subtitle ?? d.subtitle,
    submitLabel: data?.submitLabel ?? d.submitLabel,
    selectPlaceholder: data?.selectPlaceholder ?? d.selectPlaceholder,
    ageLabel: data?.ageLabel ?? d.ageLabel,
    ageOptions: optionsOr(data?.ageOptions, d.ageOptions),
    skinLabel: data?.skinLabel ?? d.skinLabel,
    skinOptions: optionsOr(data?.skinOptions, d.skinOptions),
    brandLabel: data?.brandLabel ?? d.brandLabel,
    brandOptional: data?.brandOptional ?? d.brandOptional,
    brandPlaceholder: data?.brandPlaceholder ?? d.brandPlaceholder,
    concernLabel: data?.concernLabel ?? d.concernLabel,
    concernOptions: optionsOr(data?.concernOptions, d.concernOptions),
  };
}

export type ResultsPageContent = {
  title: string;
  subtitle: string;
  mobileFilterLabel: string;
  filterTitle: string;
  clearLabel: string;
  priceLabel: string;
  brandLabel: string;
  skinLabel: string;
  skinOptions: SelectOption[];
  emptyTitle: string;
  emptyText: string;
  emptyButtonLabel: string;
};

const RESULTS_PAGE_QUERY = `*[_type == "resultsPage"][0]{
  title, subtitle, mobileFilterLabel, filterTitle, clearLabel, priceLabel,
  brandLabel, skinLabel, skinOptions[]{value, label},
  emptyTitle, emptyText, emptyButtonLabel
}`;

const DEFAULT_RESULTS_PAGE: ResultsPageContent = {
  title: "Dit zijn jouw beste foundation-deals",
  subtitle:
    "{count} resultaten — onze keuze staat bovenaan, afgestemd op jouw huidprofiel.",
  mobileFilterLabel: "Filteren & sorteren",
  filterTitle: "Filter resultaten",
  clearLabel: "Wissen",
  priceLabel: "Prijs",
  brandLabel: "Merk",
  skinLabel: "Huidtype",
  skinOptions: [
    { value: "alle", label: "Alle huidtypes" },
    { value: "droog", label: "Droge huid" },
    { value: "vet", label: "Vette huid" },
    { value: "gevoelig", label: "Gevoelige huid" },
    { value: "gemengd", label: "Gemengde huid" },
  ],
  emptyTitle: "Geen deals gevonden",
  emptyText: "Pas je filters aan om meer foundations te zien.",
  emptyButtonLabel: "Filters wissen",
};

export async function getResultsPage(): Promise<ResultsPageContent> {
  const data = await client.fetch<Partial<ResultsPageContent> | null>(
    RESULTS_PAGE_QUERY,
    {},
    opts,
  );
  const d = DEFAULT_RESULTS_PAGE;
  return {
    title: data?.title ?? d.title,
    subtitle: data?.subtitle ?? d.subtitle,
    mobileFilterLabel: data?.mobileFilterLabel ?? d.mobileFilterLabel,
    filterTitle: data?.filterTitle ?? d.filterTitle,
    clearLabel: data?.clearLabel ?? d.clearLabel,
    priceLabel: data?.priceLabel ?? d.priceLabel,
    brandLabel: data?.brandLabel ?? d.brandLabel,
    skinLabel: data?.skinLabel ?? d.skinLabel,
    skinOptions: optionsOr(data?.skinOptions, d.skinOptions),
    emptyTitle: data?.emptyTitle ?? d.emptyTitle,
    emptyText: data?.emptyText ?? d.emptyText,
    emptyButtonLabel: data?.emptyButtonLabel ?? d.emptyButtonLabel,
  };
}

const REVIEWS_QUERY = `*[_type == "review"] | order(order asc){
  _id, name, location, rating, title, quote, date, verified, productName
}`;

type SanityReview = {
  _id: string;
  name: string;
  location?: string;
  rating?: number;
  title?: string;
  quote: string;
  date?: string;
  verified?: boolean;
  productName?: string;
};

export async function getReviews(): Promise<Review[]> {
  const data = await client.fetch<SanityReview[]>(REVIEWS_QUERY, {}, opts);
  return data.map((r) => ({
    id: r._id,
    name: r.name,
    location: r.location ?? "",
    rating: r.rating ?? 5,
    quote: r.quote,
    title: r.title,
    date: r.date,
    verified: r.verified,
    productName: r.productName,
  }));
}
