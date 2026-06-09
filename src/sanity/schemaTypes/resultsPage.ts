import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentsIcon } from "@sanity/icons";

const option = () =>
  defineArrayMember({
    type: "object",
    name: "option",
    fields: [
      defineField({
        name: "label",
        title: "Wat de bezoeker ziet",
        type: "string",
        validation: (r) => r.required(),
      }),
      defineField({
        name: "value",
        title: "Technische waarde",
        type: "string",
        description:
          "Wordt gebruikt om producten te filteren. Wijzig alleen als je weet wat je doet.",
        validation: (r) => r.required(),
      }),
    ],
    preview: { select: { title: "label", subtitle: "value" } },
  });

export const resultsPage = defineType({
  name: "resultsPage",
  title: "Resultaten-pagina",
  type: "document",
  icon: DocumentsIcon,
  groups: [
    { name: "hero", title: "Kop", default: true },
    { name: "filters", title: "Filters" },
    { name: "empty", title: "Geen resultaten" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Titel (H1)",
      type: "string",
      validation: (r) => r.required(),
      group: "hero",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitel / intro",
      type: "text",
      rows: 2,
      description:
        "Gebruik {count} om het aantal resultaten te tonen. Bijv. '{count} resultaten — onze keuze staat bovenaan'.",
      group: "hero",
    }),

    defineField({
      name: "mobileFilterLabel",
      title: "Mobiele filter-knop",
      type: "string",
      group: "filters",
    }),
    defineField({
      name: "filterTitle",
      title: "Titel filterblok",
      type: "string",
      group: "filters",
    }),
    defineField({
      name: "clearLabel",
      title: "Tekst 'wissen'-link",
      type: "string",
      group: "filters",
    }),
    defineField({
      name: "priceLabel",
      title: "Label: prijs",
      type: "string",
      group: "filters",
    }),
    defineField({
      name: "brandLabel",
      title: "Label: merk",
      type: "string",
      group: "filters",
    }),
    defineField({
      name: "skinLabel",
      title: "Label: huidtype",
      type: "string",
      group: "filters",
    }),
    defineField({
      name: "skinOptions",
      title: "Opties: huidtype-filter",
      type: "array",
      of: [option()],
      description:
        "De eerste optie betekent 'toon alles'. De technische waarde wordt gebruikt om te filteren.",
      group: "filters",
    }),

    defineField({
      name: "emptyTitle",
      title: "Titel bij geen resultaten",
      type: "string",
      group: "empty",
    }),
    defineField({
      name: "emptyText",
      title: "Tekst bij geen resultaten",
      type: "text",
      rows: 2,
      group: "empty",
    }),
    defineField({
      name: "emptyButtonLabel",
      title: "Knop bij geen resultaten",
      type: "string",
      group: "empty",
    }),
  ],
  preview: { prepare: () => ({ title: "Resultaten-pagina" }) },
});
