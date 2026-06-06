import Link from "next/link";
import { reviews } from "@/data/reviews";
import { TrustBar } from "@/components/TrustBar";
import { StarRating } from "@/components/StarRating";

const categories = [
  { name: "Foundation", href: "/foundation", status: "Vergelijk nu", active: true },
  { name: "Mascara", href: "/mascara", status: "Binnenkort", active: false },
  { name: "Blush", href: "/blush", status: "Binnenkort", active: false },
  { name: "Concealer", href: "/concealer", status: "Binnenkort", active: false },
  { name: "Lippen", href: "/lippen", status: "Binnenkort", active: false },
  { name: "Huidverzorging", href: "/huidverzorging", status: "Binnenkort", active: false },
];

function CategoryTile({
  name,
  href,
  status,
  active,
}: {
  name: string;
  href: string;
  status: string;
  active: boolean;
}) {
  const content = (
    <div
      className={`flex h-full flex-col justify-between rounded-xl border p-6 transition-colors ${
        active
          ? "border-line bg-white hover:border-teal"
          : "border-line bg-white/60"
      }`}
    >
      <span className="font-display text-xl font-semibold tracking-tight">
        {name}
      </span>
      <span
        className={`mt-8 text-sm font-medium ${
          active ? "text-teal" : "text-muted"
        }`}
      >
        {status} {active && "→"}
      </span>
    </div>
  );
  return active ? (
    <Link href={href} className="block">
      {content}
    </Link>
  ) : (
    <div className="cursor-default">{content}</div>
  );
}

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              Vergelijk de beste beautyproducten en bespaar
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              Onafhankelijk de beste deals vinden op make-up en
              huidverzorging — afgestemd op jouw huid en wensen. Kies een
              categorie en start de vergelijking.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <CategoryTile key={c.name} {...c} />
            ))}
          </div>

          <div className="mt-8 flex items-center gap-3 text-sm text-muted">
            <StarRating rating={4.6} />
            <span className="h-4 w-px bg-line" />
            <span>200.000+ vrouwen vergeleken hun beautyproducten</span>
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
              In drie stappen naar jouw perfecte match
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

      {/* Reviews */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
          <div className="mb-10 max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
              Ervaringen
            </span>
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
