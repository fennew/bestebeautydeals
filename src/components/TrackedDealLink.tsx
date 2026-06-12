"use client";

import type { ReactNode } from "react";
import { track } from "./analytics/track";

/**
 * "Bekijk deal"-link die de klik registreert (deal_click) met het exacte
 * product. Ook producten zónder link (linked=false) worden geregistreerd —
 * dan opent er niets, maar de klik wordt wél geteld.
 */
export function TrackedDealLink({
  href,
  className,
  brand,
  name,
  rank,
  linked,
  children,
}: {
  href: string;
  className?: string;
  brand: string;
  name: string;
  rank: number;
  linked: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target={linked ? "_blank" : undefined}
      rel="noopener noreferrer"
      className={className}
      onClick={(e) => {
        track("deal_click", {
          product: `${brand} — ${name}`.trim(),
          brand,
          name,
          rank,
          linked,
        });
        // Geen echte deal-link: voorkom dat er een lege tab opent.
        if (!linked) e.preventDefault();
      }}
    >
      {children}
    </a>
  );
}
