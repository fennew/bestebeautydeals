import Link from "next/link";
import Image from "next/image";

import logoWhite from "../../public/logo-white.png";
import logoFull from "../../public/logo-full.png";

/**
 * Officieel Beste Beauty Deals logo.
 * - variant "light": icoon + witte tekst (transparant) — voor donkere achtergronden
 * - variant "dark": volledige versie met teal vlak — voor lichte achtergronden
 */
export function Logo({
  className = "",
  variant = "dark",
  width = 190,
}: {
  className?: string;
  variant?: "dark" | "light";
  width?: number;
}) {
  const src = variant === "light" ? logoWhite : logoFull;
  const height = Math.round((width * src.height) / src.width);
  return (
    <Link
      href="/"
      className={`inline-flex items-center ${className}`}
      aria-label="Beste Beauty Deals — naar de homepage"
    >
      <Image src={src} alt="Beste Beauty Deals" width={width} height={height} priority />
    </Link>
  );
}
