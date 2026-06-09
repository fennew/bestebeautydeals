import { getComparePage } from "@/sanity/lib/fetch";
import { TrustBar } from "@/components/TrustBar";
import { ZoekenForm } from "./ZoekenForm";

export default async function ZoekenPage() {
  const content = await getComparePage();

  return (
    <div className="bg-white">
      {/* Hero met horizontale widget — tekst beheerbaar via Sanity */}
      <section className="bg-brand bg-gradient-to-b from-transparent to-black/12">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 text-center sm:px-6 sm:text-left lg:px-8">
          {content.eyebrow && (
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
              {content.eyebrow}
            </span>
          )}
          <h1 className="mx-auto mt-4 max-w-2xl font-display text-3xl font-semibold text-white sm:mx-0 sm:text-4xl lg:text-5xl">
            {content.title}
          </h1>
          {content.subtitle && (
            <p className="mx-auto mt-3 max-w-xl text-cream/80 sm:mx-0">
              {content.subtitle}
            </p>
          )}
        </div>
      </section>

      <ZoekenForm content={content} />

      {/* Garanties onder de vergelijker */}
      <div className="mt-14">
        <TrustBar variant="vergelijker" />
      </div>
    </div>
  );
}
