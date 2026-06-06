import Link from "next/link";
import { categories } from "@/data/categories";
import { getFoundations } from "@/data/products";
import { reviews } from "@/data/reviews";
import { TrustBar } from "@/components/TrustBar";
import { StarRating } from "@/components/StarRating";
import { ProductImage } from "@/components/ProductImage";
import { BekendVan } from "@/components/BekendVan";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";

function formatPrice(price: number) {
  return `€${price.toFixed(2).replace(".", ",")}`;
}

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

export default function HomePage() {
  const deal = getFoundations()[0]; // MAY = deal van de maand

  return (
    <>
      {/* Bekend van */}
      <BekendVan />

      {/* Bespaar / herkenbare frustraties */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
          <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
            Bespaar tot{" "}
            <span className="text-teal">€120 per jaar</span> op jouw make-up
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            Te veel keuze, onduidelijke prijzen en telkens de verkeerde tint
            kopen — make-up uitkiezen is een gedoe en je betaalt al snel te
            veel. Wij vergelijken het voor je, zodat je in één oogopslag ziet
            welk product écht bij jou past en waar je het voordeligst uit bent.
          </p>
          <div className="mt-10 grid gap-8 sm:grid-cols-3">
            {[
              { stat: "Geen miskopen", sub: "altijd de juiste tint en finish" },
              { stat: "Geen te hoge prijs", sub: "wij vinden de scherpste deal" },
              { stat: "Geen eindeloos zoeken", sub: "in 1 minuut jouw match" },
            ].map((b) => (
              <div key={b.stat}>
                <p className="font-display text-xl font-semibold text-teal">
                  {b.stat}
                </p>
                <p className="mt-1 text-sm text-muted">{b.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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

      {/* Deal van de maand */}
      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="overflow-hidden rounded-2xl border border-line bg-white md:grid md:grid-cols-[300px_1fr]">
            <div className="border-b border-line md:border-b-0 md:border-r">
              <ProductImage product={deal} className="h-full py-10" />
            </div>
            <div className="flex flex-col justify-center p-8">
              <div className="flex items-center gap-3">
                <span className="rounded-full bg-teal px-3 py-1 text-xs font-medium text-cream">
                  Deal van de maand
                </span>
                <StarRating rating={deal.rating} reviewCount={deal.reviewCount} />
              </div>
              <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight">
                {deal.brand} — {deal.tagline}
              </h2>
              <p className="mt-2 text-muted">
                Onze best beoordeelde foundation. Gemiddeld{" "}
                <span className="font-semibold text-teal">
                  €{deal.savings} goedkoper
                </span>{" "}
                via onze vergelijking.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-5">
                <span className="font-display text-3xl font-semibold">
                  {formatPrice(deal.price)}
                </span>
                <Link
                  href="/foundation/zoeken"
                  className="rounded-lg bg-coral px-6 py-3.5 font-semibold text-white transition-colors hover:bg-coral-dark"
                >
                  Vergelijk foundations
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Zo werkt het */}
      <section className="border-t border-line bg-teal text-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/70">
              Zo werkt het
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              In drie stappen naar de beste deal
            </h2>
          </div>
          <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-cream/15 bg-cream/15 md:grid-cols-3">
            {[
              {
                step: "01",
                title: "Kies een categorie",
                text: "Selecteer waar je naar op zoek bent, van foundation tot huidverzorging.",
              },
              {
                step: "02",
                title: "Vul je profiel in",
                text: "Vertel ons je huidtype en voorkeuren, zodat we de juiste match tonen.",
              },
              {
                step: "03",
                title: "Vergelijk en bespaar",
                text: "Bekijk de best passende producten en ga direct naar de beste deal.",
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

      {/* Waarom bestebeautydeals */}
      <section className="border-t border-line bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
              Waarom bestebeautydeals
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              Slimmer kiezen, zonder gedoe
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "100% onafhankelijk",
                text: "We vergelijken objectief op kwaliteit, prijs en reviews — niet op wie het meest betaalt.",
              },
              {
                title: "Afgestemd op jouw huid",
                text: "Onze zoekhulp houdt rekening met huidtype, leeftijd, dekking en ondertoon.",
              },
              {
                title: "Altijd de scherpste prijs",
                text: "We tonen waar je het voordeligst uit bent, zodat je nooit te veel betaalt.",
              },
              {
                title: "Door vrouwen, voor vrouwen",
                text: "Samengesteld op basis van echte ervaringen van 200.000+ gebruiksters.",
              },
            ].map((w) => (
              <div
                key={w.title}
                className="rounded-xl border border-line bg-white p-6"
              >
                <h3 className="font-display text-lg font-semibold tracking-tight text-charcoal">
                  {w.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {w.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-8 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
              Ervaringen
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              Wat onze bezoekers zeggen
            </h2>
          </div>
          <ReviewsCarousel reviews={reviews} />
        </div>
      </section>
    </>
  );
}
