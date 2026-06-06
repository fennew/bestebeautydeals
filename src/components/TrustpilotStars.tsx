import Image from "next/image";
import stars from "../../public/trustpilot-stars.avif";

/**
 * Trustpilot-sterren als afbeelding via next/image.
 * De statische import levert de echte pixel-afmetingen, zodat de ratio
 * exact klopt. `size` = hoogte in px; breedte wordt naar verhouding berekend.
 */
export function TrustpilotStars({ size = 24 }: { rating?: number; size?: number }) {
  const width = Math.round((size * stars.width) / stars.height);
  return (
    <Image
      src={stars}
      alt="5 van 5 sterren"
      width={width}
      height={size}
      priority
      className="block"
    />
  );
}
