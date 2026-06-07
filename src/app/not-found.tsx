import Link from "next/link";

export default function NotFound() {
  return (
    <section className="bg-brand bg-gradient-to-b from-transparent to-black/12 text-cream">
      <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6">
        <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
          Oeps — pagina niet gevonden
        </span>
        <p className="mt-4 font-display text-7xl font-semibold leading-none tracking-tight text-white sm:text-8xl">
          404
        </p>
        <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
          Deze deal is helaas uitverkocht
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg leading-relaxed text-cream/85">
          De pagina die je zoekt bestaat niet (meer). Geen zorgen — we helpen je
          graag aan de beste beautydeals.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-lg bg-white px-6 py-3.5 font-semibold text-brand-text transition-colors hover:bg-cream"
          >
            Terug naar home
          </Link>
          <Link
            href="/foundation"
            className="font-medium text-cream underline underline-offset-4"
          >
            Bekijk foundation-deals
          </Link>
        </div>
      </div>
    </section>
  );
}
