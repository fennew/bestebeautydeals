import Link from "next/link";
import { Logo } from "./Logo";

const nav = [
  { href: "/foundation", label: "Foundation" },
  { href: "/mascara", label: "Mascara" },
  { href: "/blush", label: "Blush" },
  { href: "/over-ons", label: "Over ons" },
];

export function Header() {
  return (
    <header className="bg-teal text-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Logo variant="light" width={240} />
        <nav aria-label="Hoofdmenu">
          <ul className="flex items-center gap-6 text-sm font-medium sm:gap-8 sm:text-base">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="transition-opacity hover:opacity-80"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
