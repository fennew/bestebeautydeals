import type { Product } from "@/data/types";

/**
 * Placeholder foundation-fles op merk-/shadekleur.
 * Tot er echte productfoto's via de CMS binnenkomen, houdt dit de
 * kaarten verzorgd en consistent. Vervang later door <Image> met CMS-url.
 */
export function ProductImage({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-blush-light ${className}`}
    >
      <svg viewBox="0 0 120 160" className="h-40 w-auto" role="img"
        aria-label={`${product.brand} ${product.name}`}>
        {/* dop */}
        <rect x="46" y="6" width="28" height="26" rx="3" fill="#2b2b2b" />
        {/* hals */}
        <rect x="50" y="30" width="20" height="10" fill="#3a3a3a" />
        {/* fles */}
        <rect
          x="32"
          y="40"
          width="56"
          height="108"
          rx="10"
          fill={product.shadeColor}
        />
        {/* glans */}
        <rect x="38" y="48" width="8" height="92" rx="4" fill="#ffffff" opacity="0.35" />
        {/* label */}
        <rect x="40" y="78" width="40" height="44" rx="4" fill="#ffffff" opacity="0.85" />
        <text
          x="60"
          y="98"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#2b2b2b"
          fontFamily="sans-serif"
        >
          {product.brand.toUpperCase().slice(0, 10)}
        </text>
        <text
          x="60"
          y="110"
          textAnchor="middle"
          fontSize="5.5"
          fill="#6b6b6b"
          fontFamily="sans-serif"
        >
          FOUNDATION
        </text>
      </svg>
    </div>
  );
}
