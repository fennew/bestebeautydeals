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
    q: "Hoeveel dekking geeft een goede foundation?",
    a: "Foundations zijn er in lichte, medium en hoge dekking. Een opbouwbare formule is het veelzijdigst: je begint met een dunne laag voor een natuurlijke look en bouwt op waar je meer dekking wilt. Voor de dagelijkse look kies je meestal licht tot medium; voor speciale gelegenheden of een egalere teint een hogere dekking.",
  },
  {
    q: "Dekt foundation sproeten en pigmentvlekken?",
    a: "Een medium tot hoge dekking camoufleert sproeten en lichte pigmentvlekken goed. Voor donkere plekjes of sterkere pigmentatie werk je de foundation bij met een concealer op die specifieke plekken — zo houd je de rest van je huid natuurlijk en voorkom je een maskerend effect.",
  },
  {
    q: "Welke foundation is het beste voor een rijpere huid met fijne lijntjes?",
    a: "Voor een huid met rimpels of fijne lijntjes kies je een lichte, hydraterende formule met een natuurlijke tot dewy finish. Die trekt niet in lijntjes en laat de huid stralen in plaats van dof. Vermijd zeer matte, droge poederformules; die kunnen lijntjes juist benadrukken.",
  },
  {
    q: "Hoe kies ik de juiste foundationkleur en ondertoon?",
    a: "Bepaal eerst je ondertoon: koel (rozige adertjes), warm (goudgeel) of neutraal. Test een tint op je kaaklijn bij daglicht — de juiste kleur verdwijnt vrijwel in je huid. Twijfel je tussen twee tinten, kies dan de iets warmere. In onze zoekhulp houden we rekening met je ondertoon.",
  },
  {
    q: "Wat is de beste manier om foundation aan te brengen?",
    a: "Voor een egaal en langhoudend resultaat breng je foundation het beste aan met een kwast: zo verdeel je het product gelijkmatig en dring je het lichtjes in de huid. Een vochtige make-upspons geeft een natuurlijkere, dunnere laag. Werk altijd van het midden van je gezicht naar buiten toe.",
  },
  {
    q: "Wat is het verschil tussen dekking en finish?",
    a: "Dekking gaat over hoeveel van je huid bedekt wordt (licht, medium of hoog). Finish gaat over de uitstraling: matte (geen glans), natuurlijk (huidachtig) of dewy (stralend). Beide kies je los van elkaar op basis van je huidtype en de look die je wilt.",
  },
];

export default function FoundationPage() {
  const foundations = getFoundations();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      {/* Hero met volledige foto */}
      <section
        className="relative flex min-h-[460px] items-center bg-teal bg-cover bg-right"
        style={{ backgroundImage: "url('/hero-foundation.png')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/55 to-charcoal/10" />
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

      {/* Alle foundations — direct onder de hero */}
      <section id="alle-foundations" className="border-b border-line bg-white">
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

      {/* Garanties / USP's */}
      <TrustBar />

      {/* FAQ / koopgids */}
      <section className="border-t border-line bg-white">
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
