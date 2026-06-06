import Link from "next/link";
import { getFoundations } from "@/data/products";
import { reviews } from "@/data/reviews";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";
import { StarRating } from "@/components/StarRating";
import { ProductImage } from "@/components/ProductImage";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
      {children}
    </span>
  );
}

export default function HomePage() {
  const foundations = getFoundations();
  const top3 = foundations.slice(0, 3);
  const hero = foundations[0];

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-20 lg:px-8">
          <div>
            <Eyebrow>Onafhankelijke foundation-vergelijker</Eyebrow>
            <h1 className="mt-4 font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl">
              Vind de foundation die echt bij jouw huid past
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
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
              <Link
                href="/foundation"
                className="font-medium text-teal underline-offset-4 hover:underline"
              >
                Bekijk alle foundations
              </Link>
            </div>
            <div className="mt-8 flex items-center gap-3 text-sm text-muted">
              <StarRating rating={4.6} />
              <span className="h-4 w-px bg-line" />
              <span>200.000+ vrouwen vergeleken hun foundation</span>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-line bg-white">
              <ProductImage product={hero} className="py-10" />
              <div className="flex items-center justify-between border-t border-line px-5 py-4">
                <div>
                  <p className="text-xs uppercase tracking-wider text-teal">
                    {hero.badge}
                  </p>
                  <p className="font-display text-lg leading-tight">
                    {hero.brand}
                  </p>
                </div>
                <StarRating rating={hero.rating} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Top 3 */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>Onze selectie</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              De best beoordeelde foundations van 2026
            </h2>
            <p className="mt-3 text-muted">
              Onafhankelijk beoordeeld op dekking, huidvriendelijkheid en prijs.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {top3.map((p, i) => (
              <ProductCard key={p.id} product={p} featured={i === 0} />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/foundation"
              className="font-medium text-teal underline-offset-4 hover:underline"
            >
              Bekijk alle foundations →
            </Link>
          </div>
        </div>
      </section>

      {/* Hoe het werkt */}
      <section className="bg-teal text-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cream/70">
              Zo werkt het
            </span>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              In drie stappen naar jouw perfecte match
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
          <div className="mt-10">
            <Link
              href="/foundation/zoeken"
              className="inline-block rounded-lg bg-coral px-6 py-3.5 font-semibold text-white transition-colors hover:bg-coral-dark"
            >
              Start de vergelijking
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <Eyebrow>Ervaringen</Eyebrow>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight">
              Wat onze bezoekers zeggen
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((r) => (
              <figure
                key={r.id}
                className="flex flex-col rounded-xl border border-line bg-white p-6"
              >
                <StarRating rating={r.rating} />
                <blockquote className="mt-4 flex-1 leading-relaxed text-charcoal">
                  “{r.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4 text-sm font-medium text-muted">
                  {r.name} — {r.location}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
