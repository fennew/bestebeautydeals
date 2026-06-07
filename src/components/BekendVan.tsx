// Placeholder "Bekend van"-logo's (tekstueel). Vervang later door echte
// persmedia-logo's in /public en render ze als <Image>.
const outlets = ["LINDA.", "Cosmopolitan", "Women's Health"];

export function BekendVan() {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Bekend van
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 opacity-70">
          {outlets.map((o) => (
            <span
              key={o}
              className="font-display text-xl font-semibold tracking-tight text-charcoal/70"
            >
              {o}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
