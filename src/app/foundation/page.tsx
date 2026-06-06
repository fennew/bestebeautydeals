import type { Metadata } from "next";
import Link from "next/link";
import { getFoundations } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";

export const metadata: Metadata = {
  title: "Beste foundations 2026 vergelijken",
  description:
    "Vergelijk de beste foundations van 2026 op prijs, dekking en huidtype. Vind de foundation die echt bij jouw huid past — inclusief koopgids en FAQ.",
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

export default function FoundationPage() {
  const foundations = getFoundations();

  return (
    <>
      {/* Hero met volledige foto */}
      <section
        className="relative flex min-h-[460px] items-center bg-teal bg-cover bg-center"
        style={{ backgroundImage: "url('/hero-foundation.jpg')" }}
      >
        {/* leesbaarheids-scrim */}
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/70 via-charcoal/40 to-transparent" />
        <div className="relative mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="max-w-xl text-cream">
            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Vind de foundation die echt bij jouw huid past
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-cream/90">
              Wij vergelijken de beste foundations op dekking, finish en prijs —
              afgestemd op jouw huidtype. Zo kies je in een minuut met
              vertrouwen.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/foundation/zoeken"
                className="rounded-lg bg-coral px-6 py-3.5 font-semibold text-white transition-colors hover:bg-coral-dark"
              >
                Vind jouw foundation
              </Link>
              <a
                href="#alle-foundations"
                className="font-medium text-cream underline-offset-4 hover:underline"
              >
                Bekijk alle foundations
              </a>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Alle foundations */}
      <section id="alle-foundations" className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                Onze selectie
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                De best beoordeelde foundations van 2026
              </h2>
              <p className="mt-3 text-muted">
                Onafhankelijk beoordeeld op dekking, huidvriendelijkheid en
                prijs. Onze keuze staat bovenaan.
              </p>
            </div>
            <Link
              href="/foundation/zoeken"
              className="font-medium text-teal underline-offset-4 hover:underline"
            >
              Doe de zoekhulp →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {foundations.map((p, i) => (
              <ProductCard key={p.id} product={p} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Zo werkt het */}
      <section className="bg-teal text-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/70">
              Zo werkt het
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              In drie stappen naar jouw perfecte foundation
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-cream/15 bg-cream/15 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Vul je huidprofiel in",
                text: "Vertel ons je huidtype, leeftijd en voorkeuren. Duurt minder dan een minuut.",
              },
              {
                step: "02",
                title: "Vergelijk de deals",
                text: "Wij tonen de best passende foundations, gesorteerd op match en prijs.",
              },
              {
                step: "03",
                title: "Kies en bespaar",
                text: "Ga direct naar de beste deal en bestel jouw perfecte foundation.",
              },
            ].map((s) => (
              <div key={s.step} className="bg-teal p-8">
                <span className="font-display text-2xl font-semibold text-cream/50">
                  {s.step}
                </span>
                <h3 className="mt-3 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-cream/80">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / koopgids */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
            Koopgids
          </span>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
            Veelgestelde vragen over foundation
          </h2>
          <dl className="mt-8 divide-y divide-line border-t border-line">
            {faqs.map((f) => (
              <div key={f.q} className="py-6">
                <dt className="font-display text-lg font-semibold">{f.q}</dt>
                <dd className="mt-2 leading-relaxed text-muted">{f.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
