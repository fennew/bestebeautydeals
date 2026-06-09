import { Suspense } from "react";
import { ResultatenClient } from "./ResultatenClient";
import { getFoundations, getResultsPage } from "@/sanity/lib/fetch";

export const metadata = {
  title: "Jouw foundation-deals",
};

export default async function ResultatenPage() {
  const [products, content] = await Promise.all([
    getFoundations(),
    getResultsPage(),
  ]);
  // Unieke merkenlijst voor het filter.
  const brands = Array.from(new Map(products.map((p) => [p.brandId, p.brand])))
    .map(([id, name]) => ({ id, name }));

  return (
    <Suspense
      fallback={<div className="mx-auto max-w-7xl px-4 py-12">Deals laden…</div>}
    >
      <ResultatenClient products={products} brands={brands} content={content} />
    </Suspense>
  );
}
