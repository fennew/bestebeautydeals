import type { StructureResolver } from "sanity/structure";
import {
  TagIcon,
  SparklesIcon,
  DocumentIcon,
  StarIcon,
  DocumentTextIcon,
  CogIcon,
} from "@sanity/icons";

// Nederlandse, overzichtelijke zijbalk voor het team.
export const structure: StructureResolver = (S) =>
  S.list()
    .title("Beste Beauty Deals")
    .items([
      S.documentTypeListItem("category").title("Categorieën").icon(TagIcon),
      S.documentTypeListItem("product").title("Producten").icon(SparklesIcon),
      S.documentTypeListItem("rankingPage")
        .title("Vergelijkingspagina's")
        .icon(DocumentIcon),
      S.documentTypeListItem("review").title("Reviews").icon(StarIcon),
      S.documentTypeListItem("article")
        .title("Artikelen / gidsen")
        .icon(DocumentTextIcon),
      S.divider(),
      S.listItem()
        .title("Site-instellingen")
        .icon(CogIcon)
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings"),
        ),
    ]);
