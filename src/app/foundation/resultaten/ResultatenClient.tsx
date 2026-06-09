import { DealRow } from "@/components/DealRow";
import type { Product } from "@/data/types";
import type { ResultsPageContent } from "@/sanity/lib/fetch";

export function ResultatenClient({
  products,
  content,
}: {
  products: Product[];
  content: ResultsPageContent;
}) {
  return (
    <>
      {/* Gecentreerde titel-band */}
      <section className="bg-brand bg-gradient-to-b from-transparent to-black/12 text-cream">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {content.title}
          </h1>
          <p className="mx-auto mt-2 max-w-2xl text-cream/80">
            {content.subtitle.replace("{count}", String(products.length))}
          </p>
        </div>
      </section>

      {/* Gecureerde top — gecentreerde lijst, geen filters */}
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        {products.length > 0 ? (
          <div className="flex flex-col gap-6">
            {products.map((p, i) => (
              <DealRow key={p.id} product={p} rank={i + 1} featured={i === 0} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white p-12 text-center ring-1 ring-line">
            <p className="font-display text-xl">{content.emptyTitle}</p>
            <p className="mt-2 text-muted">{content.emptyText}</p>
          </div>
        )}
      </div>
    </>
  );
}
