/* eslint-disable @next/next/no-img-element */

/**
 * Trustpilot-sterren als afbeelding (aangeleverd bestand in /public).
 * `size` = hoogte in px; breedte volgt de natuurlijke ratio van de afbeelding
 * (browser leest de echte ratio uit de gedecodeerde afbeelding).
 */
export function TrustpilotStars({ size = 32 }: { rating?: number; size?: number }) {
  return (
    <img
      src="/trustpilot-stars.avif"
      alt="5 van 5 sterren"
      style={{ height: size, width: "auto" }}
      className="block max-w-none shrink-0"
    />
  );
}
