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

const COMPARE_PAGE_QUERY = `*[_type == "comparePage"][0]{
  eyebrow, title, subtitle, submitLabel
}`;

export type ComparePageContent = {
  eyebrow: string;
  title: string;
  subtitle: string;
  submitLabel: string;
};

export async function getComparePage(): Promise<ComparePageContent> {
  const data = await client.fetch<Partial<ComparePageContent> | null>(
    COMPARE_PAGE_QUERY,
    {},
    opts,
  );
  return {
    eyebrow: data?.eyebrow ?? "Foundation-vergelijker",
    title: data?.title ?? "Foundation vergelijken? Vind de beste deal voor jou",
    subtitle:
      data?.subtitle ??
      "Vul je huidprofiel in en wij tonen direct de best passende foundation-deals — afgestemd op jouw huid.",
    submitLabel: data?.submitLabel ?? "Vergelijk",
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
