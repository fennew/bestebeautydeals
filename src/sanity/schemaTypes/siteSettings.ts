import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site-instellingen",
  type: "document",
  icon: CogIcon,
  fields: [
    defineField({
      name: "announcements",
      title: "Announcement-bar USP's",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "pressLogos",
      title: "'Bekend van' logo's",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", title: "Naam", type: "string" }),
            defineField({ name: "image", title: "Logo", type: "image" }),
          ],
          preview: { select: { title: "name", media: "image" } },
        }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Site-instellingen" }) },
});
