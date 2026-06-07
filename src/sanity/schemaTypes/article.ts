import { defineType, defineField } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";

export const article = defineType({
  name: "article",
  title: "Artikel / SEO-gids",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({ name: "title", title: "Titel", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug (URL)", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Samenvatting", type: "text", rows: 2 }),
    defineField({ name: "category", title: "Categorie", type: "reference", to: [{ type: "category" }] }),
    defineField({ name: "body", title: "Inhoud", type: "array", of: [{ type: "block" }] }),
  ],
  preview: { select: { title: "title", subtitle: "category.name" } },
});
