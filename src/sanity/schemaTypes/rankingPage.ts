import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentIcon } from "@sanity/icons";

export const rankingPage = defineType({
  name: "rankingPage",
  title: "Vergelijkingspagina",
  type: "document",
  icon: DocumentIcon,
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug (URL)", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "category", title: "Categorie", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "intro", title: "Intro-paragraaf", type: "text", rows: 3 }),
    defineField({ name: "authorName", title: "Auteur — naam", type: "string" }),
    defineField({ name: "authorRole", title: "Auteur — rol", type: "string" }),
    defineField({ name: "authorInitials", title: "Auteur — initialen", type: "string" }),
    defineField({
      name: "products",
      title: "Producten (op volgorde)",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "product" }] })],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "category.name" },
  },
});
