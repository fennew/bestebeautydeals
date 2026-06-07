import { defineType, defineField } from "sanity";
import { StarIcon } from "@sanity/icons";

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({ name: "name", title: "Naam", type: "string", validation: (r) => r.required() }),
    defineField({ name: "location", title: "Plaats", type: "string" }),
    defineField({ name: "rating", title: "Sterren (0–5)", type: "number", validation: (r) => r.min(0).max(5), initialValue: 5 }),
    defineField({ name: "title", title: "Kop", type: "string" }),
    defineField({ name: "quote", title: "Review-tekst", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({ name: "date", title: "Datum-tekst", type: "string", description: "Bijv. '2 dagen geleden'" }),
    defineField({ name: "verified", title: "Geverifieerd", type: "boolean", initialValue: true }),
    defineField({ name: "productName", title: "Product (optioneel)", type: "string" }),
    defineField({ name: "order", title: "Volgorde", type: "number", initialValue: 100 }),
  ],
  preview: {
    select: { title: "title", subtitle: "name" },
  },
});
