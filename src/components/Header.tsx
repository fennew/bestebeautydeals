"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";

const nav = [
  { href: "/foundation", label: "Foundation" },
  { href: "/mascara", label: "Mascara" },
  { href: "/blush", label: "Blush" },
  { href: "/over-ons", label: "Over ons" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-teal text-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 sm:px-6 lg:px-8">
        <Logo variant="light" width={220} />

        {/* Desktop nav */}
        <nav aria-label="Hoofdmenu" className="hidden md:block">
          <ul className="flex items-center gap-8 text-base font-medium">
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

        {/* Hamburger (mobiel) */}
        <button
          type="button"
          aria-label={open ? "Menu sluiten" : "Menu openen"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
          className="md:hidden"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? (
              <path d="M18 6 6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobiel uitklapmenu */}
      {open && (
        <nav
          aria-label="Mobiel menu"
          className="border-t border-cream/15 md:hidden"
        >
          <ul className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-cream/10 py-3 text-base font-medium last:border-b-0"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
