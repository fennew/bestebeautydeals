"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { track } from "./track";

/** Registreert een pageview bij eerste load én bij elke client-side navigatie. */
export function PageViewTracker() {
  const pathname = usePathname();
  useEffect(() => {
    track("pageview");
  }, [pathname]);
  return null;
}
