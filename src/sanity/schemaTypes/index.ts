import type { SchemaTypeDefinition } from "sanity";

import { category } from "./category";
import { product } from "./product";
import { rankingPage } from "./rankingPage";
import { review } from "./review";
import { article } from "./article";
import { siteSettings } from "./siteSettings";
import { comparePage } from "./comparePage";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [category, product, rankingPage, review, article, siteSettings, comparePage],
};
