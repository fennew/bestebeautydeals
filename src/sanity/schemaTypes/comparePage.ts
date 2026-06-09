import { defineType, defineField, defineArrayMember } from "sanity";
import { SearchIcon } from "@sanity/icons";

// Herbruikbaar keuze-item: wat de bezoeker ziet (label) + technische waarde.
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
          "Wordt intern gebruikt (o.a. in de zoek-URL). Wijzig alleen als je weet wat je doet.",
        validation: (r) => r.required(),
      }),
    ],
    preview: { select: { title: "label", subtitle: "value" } },
  });

export const comparePage = defineType({
  name: "comparePage",
  title: "Vergelijk-pagina",
  type: "document",
  icon: SearchIcon,
  groups: [
    { name: "hero", title: "Kop", default: true },
    { name: "form", title: "Formulier" },
  ],
  fields: [
    defineField({
      name: "eyebrow",
      title: "Label boven de titel",
      type: "string",
      group: "hero",
    }),
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
      rows: 3,
      group: "hero",
    }),

    defineField({
      name: "submitLabel",
      title: "Tekst op de zoekknop",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "selectPlaceholder",
      title: "Placeholder voor keuzevelden",
      type: "string",
      description: "Bijv. 'Selecteer'.",
      group: "form",
    }),
    defineField({
      name: "ageLabel",
      title: "Label: leeftijd",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "ageOptions",
      title: "Opties: leeftijd",
      type: "array",
      of: [option()],
      group: "form",
    }),
    defineField({
      name: "skinLabel",
      title: "Label: huidtype",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "skinOptions",
      title: "Opties: huidtype",
      type: "array",
      of: [option()],
      description:
        "Let op: de technische waarde van huidtype wordt gebruikt om producten te filteren op de resultatenpagina.",
      group: "form",
    }),
    defineField({
      name: "brandLabel",
      title: "Label: foundationmerk-vraag",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "brandOptional",
      title: "Tekst '(optioneel)' bij het merk-veld",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "brandPlaceholder",
      title: "Placeholder: foundationmerk",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "concernLabel",
      title: "Label: wat moet de foundation dekken",
      type: "string",
      group: "form",
    }),
    defineField({
      name: "concernOptions",
      title: "Opties: huidwensen / dekking",
      type: "array",
      of: [option()],
      group: "form",
    }),
  ],
  preview: { prepare: () => ({ title: "Vergelijk-pagina" }) },
});
