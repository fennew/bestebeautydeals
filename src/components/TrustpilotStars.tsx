/* eslint-disable @next/next/no-img-element */

/**
 * Trustpilot-sterren als afbeelding (aangeleverd bestand in /public).
 * `size` is de hoogte in pixels; breedte schaalt mee.
 */
export function TrustpilotStars({
  rating = 5,
  size = 28,
}: {
  rating?: number;
  size?: number;
}) {
  return (
    <img
      src="/trustpilot-stars.avif"
      alt={`${rating} van 5 sterren`}
      style={{ height: size, width: "auto" }}
      className="block"
    />
  );
}
