import Link from "next/link";
import { categories } from "@/data/categories";
import { getFoundations } from "@/data/products";
import { reviews } from "@/data/reviews";
import { StarRating } from "@/components/StarRating";
import { ProductCard } from "@/components/ProductCard";
import { BekendVan } from "@/components/BekendVan";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { Starburst } from "@/components/Starburst";

function CategoryCard({ c }: { c: (typeof categories)[number] }) {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-line bg-white p-6 text-charcoal">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="font-display text-xl font-semibold tracking-tight">
            {c.name}
          </h3>
          {!c.available && (
            <span className="rounded-full bg-cream px-2.5 py-1 text-xs font-medium text-muted">
              Binnenkort
            </span>
          )}
        </div>
        <p className="mt-1 text-sm text-muted">{c.tagline}</p>
      </div>
      <div className="mt-6 flex items-center gap-4">
        <Link
          href={c.compareHref}
          className="rounded-lg bg-coral px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-dark"
        >
          Vergelijk
        </Link>
        <Link
          href={c.dealsHref}
          className="text-sm font-medium text-teal underline-offset-4 hover:underline"
        >
          Beste deals →
        </Link>
      </div>
    </div>
  );
}

const reasons = [
  {
    title: "100% onafhankelijk",
    text: "We vergelijken objectief op kwaliteit, prijs en reviews — niet op wie het meest betaalt.",
    icon: (
      <>
        <path d="M12 2l8 3v6c0 5-3.4 8.5-8 11-4.6-2.5-8-6-8-11V5l8-3z" />
        <path d="m9 12 2 2 4-4" />
      </>
    ),
  },
  {
    title: "Afgestemd op jouw huid",
    text: "Onze zoekhulp houdt rekening met huidtype, leeftijd, dekking en ondertoon.",
    icon: (
      <path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.8 6.8 19.1l1-5.8L3.5 9.2l5.9-.9L12 3z" />
    ),
  },
  {
    title: "Altijd de scherpste prijs",
    text: "We tonen waar je het voordeligst uit bent, zodat je nooit te veel betaalt.",
    icon: (
      <>
        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
        <circle cx="7.5" cy="7.5" r="1.5" />
      </>
    ),
  },
  {
    title: "Door vrouwen, voor vrouwen",
    text: "Samengesteld op basis van echte ervaringen van 200.000+ gebruiksters.",
    icon: (
      <>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </>
    ),
  },
];

export default function HomePage() {
  const topDeals = getFoundations().slice(0, 3);

  return (
    <>
      {/* Hero met categorieën */}
      <section className="border-b border-line bg-teal text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
            Vergelijk en vind de beste beautydeals
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/85">
            Bespaar op je favoriete make-up en huidverzorging. Wij vergelijken
            de beste producten op prijs, kwaliteit en reviews — afgestemd op
            jouw huid.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-cream/85">
            <StarRating rating={4.7} />
            <span className="font-semibold">9,3</span>
            <span className="h-4 w-px bg-cream/30" />
            <span>200.000+ vrouwen vergeleken hun beautyproducten</span>
          </div>

          <div className="mt-12 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <CategoryCard key={c.slug} c={c} />
            ))}
          </div>
        </div>
      </section>

      {/* De beste deals van deze maand */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
                Uitgelicht
              </span>
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
                De beste deals van deze maand
              </h2>
            </div>
            <Link
              href="/foundation"
              className="font-medium text-teal underline-offset-4 hover:underline"
            >
              Bekijk alle foundations →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {topDeals.map((p, i) => (
              <ProductCard key={p.id} product={p} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Waarom bestebeautydeals */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
          <h2 className="font-display text-3xl font-semibold tracking-tight">
            Waarom bestebeautydeals?
          </h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {reasons.map((r) => (
              <div key={r.title} className="flex flex-col items-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-teal-light">
                  <svg
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--color-teal)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {r.icon}
                  </svg>
                </div>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {r.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bekend van (onder Waarom) */}
      <BekendVan />

      {/* Reviews */}
      <section className="border-b border-line bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <ReviewsCarousel
            reviews={reviews}
            eyebrow="Ervaringen"
            title="Wat onze bezoekers zeggen"
          />
        </div>
      </section>

      {/* Bespaar / herkenbare frustraties (onderaan, links uitgelijnd, hoog contrast) */}
      <section className="bg-teal text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_auto] md:py-20 lg:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
              Bespaar tot wel €120 per jaar op jouw make-up
            </h2>
            <p className="mt-5 max-w-2xl leading-relaxed text-cream/85">
              Te veel keuze, onduidelijke prijzen en telkens de verkeerde tint
              kopen — make-up uitkiezen is een gedoe en je betaalt al snel te
              veel. In onze vergelijker zie je in één oogopslag welk product
              écht bij jouw huid past en waar je het voordeligst uit bent. Zo
              kies je met vertrouwen en houd je geld over.
            </p>
            <a
              href="/foundation/zoeken"
              className="mt-8 inline-block rounded-lg bg-coral px-6 py-3.5 font-semibold text-white transition-colors hover:bg-coral-dark"
            >
              Bekijk de deals
            </a>
          </div>
          <div className="hidden justify-center md:flex">
            <Starburst size={170} />
          </div>
        </div>
      </section>
    </>
  );
}
