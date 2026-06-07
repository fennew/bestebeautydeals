import Link from "next/link";
import { Logo } from "./Logo";

const columns = [
  {
    title: "Categorieën",
    links: [
      { href: "/foundation", label: "Foundation" },
      { href: "/mascara", label: "Mascara" },
      { href: "/blush", label: "Blush" },
    ],
  },
  {
    title: "Over",
    links: [
      { href: "/over-ons", label: "Over ons" },
      { href: "/foundation/zoeken", label: "Vind jouw foundation" },
    ],
  },
  {
    title: "Service",
    links: [
      { href: "#", label: "Klantenservice" },
      { href: "#", label: "Privacybeleid" },
      { href: "#", label: "Algemene voorwaarden" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-teal-dark text-cream/90">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4 lg:px-8">
        <div className="space-y-3">
          <Logo variant="light" />
          <p className="max-w-xs text-sm text-cream/70">
            Onafhankelijk de beste beautydeals vergelijken op prijs, kwaliteit
            en reviews — afgestemd op jouw huid.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="font-display text-lg">{col.title}</h3>
            <ul className="mt-3 space-y-2 text-sm">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-cream/70 transition-colors hover:text-cream"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-cream/60 sm:px-6 lg:px-8">
          © {new Date().getFullYear()} Beste Beauty Deals — onderdeel van MAY
          Cosmetics. Alle prijzen onder voorbehoud.
        </div>
      </div>
    </footer>
  );
}
