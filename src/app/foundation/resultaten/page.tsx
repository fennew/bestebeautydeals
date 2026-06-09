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

  return <ResultatenClient products={products} content={content} />;
}
