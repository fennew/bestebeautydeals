import type { Metadata } from "next";
import Link from "next/link";
import { getFoundations } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Beste foundations 2026 vergelijken",
  description:
    "Vergelijk de beste foundations van 2026 op prijs, dekking en huidtype. Inclusief koopgids en veelgestelde vragen.",
};

const faqs = [
  {
    q: "Welke foundation is het beste voor de rijpere huid (40+)?",
    a: "Voor een huid vanaf 40 jaar kies je een hydraterende foundation met een natuurlijke tot dewy finish die fijne lijntjes niet benadrukt. De MAY Radiance Foundation is hier speciaal voor ontwikkeld en staat daarom bovenaan onze lijst.",
  },
  {
    q: "Hoe weet ik welke kleur foundation bij mij past?",
    a: "Bepaal eerst je ondertoon: koel (rozige adertjes), warm (goudgeel) of neutraal. Kies vervolgens een tint die op je kaaklijn verdwijnt. In onze zoekhulp houden we hier rekening mee.",
  },
  {
    q: "Wat is het verschil tussen dekking en finish?",
    a: "Dekking gaat over hoeveel je huid bedekt wordt (licht, medium of hoog). Finish gaat over de uitstraling: matte, natuurlijk of dewy (stralend).",
  },
];

export default function FoundationOverviewPage() {
  const foundations = getFoundations();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <nav className="text-sm text-muted">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        / <span className="text-charcoal">Foundation</span>
      </nav>

      <header className="mt-4 max-w-2xl">
        <h1 className="font-display text-4xl font-semibold">
          Beste foundations van 2026
        </h1>
        <p className="mt-3 text-lg text-muted">
          We vergeleken de populairste foundations op dekking,
          huidvriendelijkheid, finish en prijs. Liever een persoonlijk advies?{" "}
          <Link
            href="/foundation/zoeken"
            className="font-semibold text-teal underline-offset-4 hover:underline"
          >
            Doe de zoekhulp →
          </Link>
        </p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {foundations.map((p, i) => (
          <ProductCard key={p.id} product={p} featured={i === 0} />
        ))}
      </div>

      {/* Koopgids / FAQ voor SEO */}
      <section className="mt-16 max-w-3xl">
        <h2 className="font-display text-2xl font-semibold">
          Veelgestelde vragen over foundation
        </h2>
        <dl className="mt-6 divide-y divide-line">
          {faqs.map((f) => (
            <div key={f.q} className="py-5">
              <dt className="font-display text-lg">{f.q}</dt>
              <dd className="mt-2 text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}
