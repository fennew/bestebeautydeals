import Link from "next/link";

export function ComingSoon({ category }: { category: string }) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
        Binnenkort
      </span>
      <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">
        {category} vergelijken komt eraan
      </h1>
      <p className="mt-4 text-lg text-muted">
        We werken hard aan de beste {category.toLowerCase()}-deals. Bekijk
        ondertussen onze foundation-vergelijking.
      </p>
      <Link
        href="/foundation/zoeken"
        className="mt-8 inline-block rounded-lg bg-coral px-6 py-3.5 font-semibold text-white transition-colors hover:bg-coral-dark"
      >
        Vergelijk foundations
      </Link>
    </div>
  );
}
