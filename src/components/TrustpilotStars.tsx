/* eslint-disable @next/next/no-img-element */

/**
 * Trustpilot-sterren als afbeelding (aangeleverd bestand in /public).
 * `size` = hoogte in px; breedte schaalt mee met de natuurlijke ratio.
 * `max-w-none` + `shrink-0` voorkomen dat een flex-parent de afbeelding indrukt.
 */
export function TrustpilotStars({ size = 24 }: { rating?: number; size?: number }) {
  return (
    <img
      src="/trustpilot-stars.avif"
      alt="5 van 5 sterren"
      height={size}
      style={{ height: size, width: "auto" }}
      className="block max-w-none shrink-0"
    />
  );
}
