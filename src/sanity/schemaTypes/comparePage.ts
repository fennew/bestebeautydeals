import { defineType, defineField } from "sanity";
import { SearchIcon } from "@sanity/icons";

export const comparePage = defineType({
  name: "comparePage",
  title: "Vergelijk-pagina",
  type: "document",
  icon: SearchIcon,
  fields: [
    defineField({
      name: "eyebrow",
      title: "Label boven de titel",
      type: "string",
      description: "Klein label boven de titel, bijv. 'Foundation-vergelijker'.",
    }),
    defineField({
      name: "title",
      title: "Titel (H1)",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitel / intro",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "submitLabel",
      title: "Tekst op de zoekknop",
      type: "string",
      description: "Bijv. 'Vergelijk'.",
    }),
  ],
  preview: { prepare: () => ({ title: "Vergelijk-pagina" }) },
});
