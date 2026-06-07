import { defineType, defineField } from "sanity";
import { TagIcon } from "@sanity/icons";

export const category = defineType({
  name: "category",
  title: "Categorie",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({
      name: "name",
      title: "Naam",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug (URL)",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "tagline",
      title: "Korte omschrijving",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "title",
      title: "Paginatitel (H1)",
      type: "string",
      description: "Bijv. 'De beste foundations van 2026'",
    }),
    defineField({
      name: "intro",
      title: "Intro-tekst",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "isLive",
      title: "Live (zo niet → 'Binnenkort')",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Volgorde",
      type: "number",
      initialValue: 100,
    }),
  ],
  preview: {
    select: { title: "name", media: "image", live: "isLive" },
    prepare: ({ title, media, live }) => ({
      title,
      subtitle: live ? "Live" : "Binnenkort",
      media,
    }),
  },
});
