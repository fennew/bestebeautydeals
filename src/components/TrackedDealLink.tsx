"use client";

import type { ReactNode } from "react";
import { track } from "./analytics/track";

/** "Bekijk deal"-link die de klik registreert (deal_click) voordat hij opent. */
export function TrackedDealLink({
  href,
  className,
  brand,
  name,
  rank,
  children,
}: {
  href: string;
  className?: string;
  brand: string;
  name: string;
  rank: number;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("deal_click", { brand, name, rank })}
    >
      {children}
    </a>
  );
}
