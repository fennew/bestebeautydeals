import { defineType, defineField } from "sanity";
import { SparklesIcon } from "@sanity/icons";

const skinTypeList = [
  { title: "Droog", value: "droog" },
  { title: "Vet", value: "vet" },
  { title: "Normaal", value: "normaal" },
  { title: "Gevoelig", value: "gevoelig" },
  { title: "Gemengd", value: "gemengd" },
];

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: SparklesIcon,
  groups: [
    { name: "basis", title: "Basis", default: true },
    { name: "deal", title: "Prijs & deal" },
    { name: "review", title: "Beoordeling" },
    { name: "match", title: "Huid-match" },
  ],
  fields: [
    defineField({ name: "name", title: "Productnaam", type: "string", group: "basis", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug (URL)", type: "slug", options: { source: "name" }, group: "basis", validation: (r) => r.required() }),
    defineField({ name: "brand", title: "Merk", type: "string", group: "basis", validation: (r) => r.required() }),
    defineField({ name: "category", title: "Categorie", type: "reference", to: [{ type: "category" }], group: "basis" }),
    defineField({ name: "image", title: "Productfoto", type: "image", options: { hotspot: true }, group: "basis" }),
    defineField({ name: "tagline", title: "Subtitel", type: "string", group: "basis" }),
    defineField({ name: "badge", title: "Badge-label", type: "string", description: "Bijv. 'BESTE VOOR 40+ HUID' (leeg = geen)", group: "basis" }),
    defineField({ name: "summary", title: "Korte samenvatting", type: "text", rows: 2, group: "basis" }),

    defineField({ name: "price", title: "Prijs (€)", type: "number", group: "deal", validation: (r) => r.required().positive() }),
    defineField({
      name: "priceOriginal",
      title: "Van-prijs (€)",
      type: "number",
      group: "deal",
      description: "De korting wordt automatisch berekend: van-prijs − prijs.",
    }),
    defineField({
      name: "savings",
      title: "Besparing (automatisch)",
      type: "number",
      group: "deal",
      deprecated: { reason: "Wordt nu automatisch berekend uit van-prijs − prijs." },
      readOnly: true,
      hidden: ({ value }) => value === undefined,
    }),
    defineField({ name: "dealUrl", title: "Koop-/affiliate-link", type: "url", group: "deal" }),
    defineField({ name: "ctaLabel", title: "Knoptekst", type: "string", initialValue: "Bekijk deal", group: "deal" }),
    defineField({ name: "couponsCount", title: "Aantal coupons", type: "number", group: "deal" }),

    defineField({ name: "score", title: "Onze score (0–10)", type: "number", group: "review", validation: (r) => r.min(0).max(10) }),
    defineField({ name: "rating", title: "Sterren (0–5)", type: "number", group: "review", validation: (r) => r.min(0).max(5) }),
    defineField({ name: "reviewCount", title: "Aantal reviews", type: "number", group: "review" }),
    defineField({ name: "pros", title: "Pluspunten", type: "array", of: [{ type: "string" }], group: "review" }),
    defineField({ name: "cons", title: "Minpunten", type: "array", of: [{ type: "string" }], group: "review", description: "Toon altijd minstens 1 eerlijk nadeel." }),

    defineField({
      name: "panelTint",
      title: "Foto-paneel tint",
      type: "string",
      options: { list: [{ title: "Featured (roze)", value: "featured" }, { title: "Neutraal", value: "neutral" }], layout: "radio" },
      initialValue: "neutral",
      group: "basis",
    }),
    defineField({ name: "isOurChoice", title: "Onze keuze", type: "boolean", initialValue: false, group: "basis" }),
    defineField({ name: "rank", title: "Rang", type: "number", group: "basis", description: "1 = bovenaan" }),
    defineField({ name: "bestForLabel", title: "Segment-label", type: "string", group: "match" }),
    defineField({ name: "skinTypes", title: "Geschikt voor huidtypes", type: "array", of: [{ type: "string" }], options: { list: skinTypeList }, group: "match" }),
    defineField({
      name: "coverage",
      title: "Dekking",
      type: "string",
      options: { list: [{ title: "Licht", value: "licht" }, { title: "Medium", value: "medium" }, { title: "Hoog", value: "hoog" }] },
      group: "match",
    }),
    defineField({
      name: "finish",
      title: "Finish",
      type: "string",
      options: { list: [{ title: "Matte", value: "matte" }, { title: "Natuurlijk", value: "natuurlijk" }, { title: "Dewy", value: "dewy" }] },
      group: "match",
    }),
  ],
  preview: {
    select: { title: "name", brand: "brand", media: "image", rank: "rank" },
    prepare: ({ title, brand, media, rank }) => ({
      title: `${rank ? `#${rank} ` : ""}${brand} — ${title}`,
      media,
    }),
  },
});
