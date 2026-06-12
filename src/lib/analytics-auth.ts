import { createHash } from "crypto";

/** Afgeleide cookie-token op basis van het analytics-wachtwoord. */
export function analyticsToken(password: string): string {
  return createHash("sha256").update("bbd-analytics:" + password).digest("hex");
}

export const ANALYTICS_COOKIE = "bbd_analytics";
