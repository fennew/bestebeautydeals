/* eslint-disable @next/next/no-img-element */

/**
 * Trustpilot-sterren als afbeelding (aangeleverd bestand in /public).
 * Vaste bron-ratio 350×77; `size` = hoogte in px, breedte volgt die ratio.
 */
export function TrustpilotStars({ size = 24 }: { rating?: number; size?: number }) {
  const width = Math.round((size * 350) / 77);
  return (
    <img
      src="/trustpilot-stars.avif"
      alt="5 van 5 sterren"
      width={width}
      height={size}
      style={{ width, height: size }}
      className="block max-w-none shrink-0"
    />
  );
}
