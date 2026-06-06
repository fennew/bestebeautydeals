import Link from "next/link";
import { getFoundations } from "@/data/products";
import { reviews, trustStats } from "@/data/reviews";
import { ProductCard } from "@/components/ProductCard";
import { TrustBar } from "@/components/TrustBar";
import { StarRating } from "@/components/StarRating";
import { ProductImage } from "@/components/ProductImage";

export default function HomePage() {
  const foundations = getFoundations();
  const top3 = foundations.slice(0, 3);
  const hero = foundations[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blush-light to-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
          <div>
            <h1 className="font-display text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Dit zijn de beste foundation-deals voor jou
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Vergelijk top foundations op prijs, kwaliteit en reviews en vind
              altijd de deal die bij jouw huid past.
            </p>
            <Link
              href="/foundation/zoeken"
              className="mt-8 inline-block rounded-xl bg-coral px-7 py-4 text-lg font-semibold text-white shadow-sm transition-colors hover:bg-coral-dark"
            >
              Vind jouw perfecte foundation
            </Link>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3">
              {trustStats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-2xl font-semibold text-teal">
                    {s.value}
                  </p>
                  <p className="max-w-[12rem] text-xs text-muted">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative flex justify-center">
            <div className="absolute h-72 w-72 rounded-full bg-blush/40 blur-2xl" />
            <ProductImage
              product={hero}
              className="relative w-72 scale-125 bg-transparent"
            />
          </div>
        </div>
      </section>

      <TrustBar />

      {/* Top 3 */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="font-display text-3xl font-semibold">
              Onze top 3 foundations van 2026
            </h2>
            <p className="mt-2 text-muted">
              Onafhankelijk beoordeeld op dekking, huidvriendelijkheid en prijs.
            </p>
          </div>
          <Link
            href="/foundation"
            className="font-semibold text-teal underline-offset-4 hover:underline"
          >
            Bekijk alle foundations →
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {top3.map((p, i) => (
            <ProductCard key={p.id} product={p} featured={i === 0} />
          ))}
        </div>
      </section>

      {/* Hoe het werkt */}
      <section className="bg-teal text-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center font-display text-3xl font-semibold">
            Zo vind je jouw perfecte foundation
          </h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {[
              {
                step: "1",
                title: "Vul je huidprofiel in",
                text: "Vertel ons je huidtype, leeftijd en voorkeuren — duurt 1 minuut.",
              },
              {
                step: "2",
                title: "Vergelijk de deals",
                text: "Wij tonen de best passende foundations, gesorteerd op match en prijs.",
              },
              {
                step: "3",
                title: "Kies en bespaar",
                text: "Ga direct naar de beste deal en bestel jouw perfecte match.",
              },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-cream font-display text-xl font-semibold text-teal">
                  {s.step}
                </div>
                <h3 className="mt-4 font-display text-xl">{s.title}</h3>
                <p className="mt-2 text-cream/80">{s.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/foundation/zoeken"
              className="inline-block rounded-xl bg-coral px-7 py-4 text-lg font-semibold text-white transition-colors hover:bg-coral-dark"
            >
              Start de vergelijking
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-3xl font-semibold">
          Wat onze bezoekers zeggen
        </h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {reviews.map((r) => (
            <figure
              key={r.id}
              className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-line"
            >
              <StarRating rating={r.rating} />
              <blockquote className="mt-3 text-charcoal">“{r.quote}”</blockquote>
              <figcaption className="mt-4 text-sm font-medium text-muted">
                {r.name} — {r.location}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}
