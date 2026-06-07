import Link from "next/link";
import { categories } from "@/data/categories";
import { getFoundations } from "@/data/products";
import { reviews } from "@/data/reviews";
import { StarRating } from "@/components/StarRating";
import { ProductCard } from "@/components/ProductCard";
import { BekendVan } from "@/components/BekendVan";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { TrustBar } from "@/components/TrustBar";
import { Starburst } from "@/components/Starburst";

function CategoryCard({ c }: { c: (typeof categories)[number] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-white text-charcoal shadow-sm">
      {/* foto */}
      <div className="relative aspect-square bg-blush-light">
        {c.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={c.image}
            alt={c.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-display text-2xl font-semibold text-teal/40">
              {c.name}
            </span>
          </div>
        )}
        {!c.available && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-muted shadow-sm">
            Binnenkort
          </span>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-xl font-semibold tracking-tight">
          {c.name}
        </h3>
        <div className="mt-4 flex items-center gap-4">
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
    </div>
  );
}

export default function HomePage() {
  const topDeals = getFoundations().slice(0, 3);

  return (
    <>
      {/* Hero met categorieën — donkere anker-sectie */}
      <section className="border-b border-line bg-gradient-to-br from-brand to-brand-deep text-cream">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
          <h1 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
            Vergelijk en vind de beste beautydeals
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-cream/85">
            Bespaar op je favoriete make-up en huidverzorging. Wij vergelijken
            de beste producten op prijs, kwaliteit en reviews — afgestemd op
            jouw huid.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 text-sm text-cream/85">
            <StarRating rating={4.7} showNumber={false} />
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
              <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-charcoal">
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
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {topDeals.map((p, i) => (
              <ProductCard key={p.id} product={p} featured={i === 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Garanties / USP's */}
      <TrustBar />

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

      {/* Bespaar — donkere anker-sectie, links uitgelijnd */}
      <section className="bg-ink text-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_auto] md:py-20 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blush">
              Slim besparen
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
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

      {/* Bekend van — onderaan */}
      <BekendVan />
    </>
  );
}
