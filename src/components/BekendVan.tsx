/* eslint-disable @next/next/no-img-element */

// "Bekend van"-logo's in /public/logos — later beheerbaar via de CMS.
const outlets = [
  { name: "LINDA.", src: "/logos/linda.avif", h: 34 },
  { name: "Cosmopolitan", src: "/logos/cosmopolitan.avif", h: 24 },
  { name: "Women's Health", src: "/logos/womenshealth.jpg", h: 40 },
];

export function BekendVan() {
  return (
    <section className="border-b border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-muted">
          Bekend van
        </p>
        <div className="mx-auto mt-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-20 gap-y-8 sm:justify-between">
          {outlets.map((o) => (
            <img
              key={o.name}
              src={o.src}
              alt={o.name}
              style={{ height: o.h }}
              className="w-auto opacity-80"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
