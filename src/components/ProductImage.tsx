import type { Product } from "@/data/types";

/**
 * Rustige, premium placeholder-weergave van een foundation-fles.
 * Neutrale studio-look met subtiele shade-tint i.p.v. felle kleuren.
 * Vervang later door <Image> met echte CMS-productfoto's.
 */
export function ProductImage({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  // Echte productfoto uit de CMS, indien aanwezig.
  if (product.image) {
    return (
      <div className={`flex items-center justify-center bg-white ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          className="h-full max-h-full w-full object-contain"
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-center justify-center bg-white ${className}`}
    >
      <svg
        viewBox="0 0 120 170"
        className="h-full max-h-44 w-auto"
        role="img"
        aria-label={`${product.brand} ${product.name}`}
      >
        {/* pompje / dop */}
        <rect x="52" y="8" width="16" height="14" rx="2" fill="#cfc6ba" />
        <rect x="54" y="20" width="12" height="8" fill="#bcb2a4" />
        {/* fles — frosted glass */}
        <rect x="36" y="28" width="48" height="128" rx="8" fill="#ffffff" />
        <rect x="36" y="28" width="48" height="128" rx="8" fill={product.shadeColor} fillOpacity="0.28" />
        <rect x="36" y="28" width="48" height="128" rx="8" fill="none" stroke="#e4dccf" strokeWidth="1" />
        {/* subtiele glans */}
        <rect x="42" y="36" width="5" height="112" rx="2.5" fill="#ffffff" opacity="0.5" />
        {/* minimalistisch label */}
        <line x1="36" y1="92" x2="84" y2="92" stroke="#e4dccf" strokeWidth="1" />
        <text
          x="60"
          y="84"
          textAnchor="middle"
          fontSize="8"
          letterSpacing="1.5"
          fill="#2b2b2b"
          fontFamily="var(--font-inter), sans-serif"
          fontWeight="600"
        >
          {product.brand.toUpperCase().slice(0, 12)}
        </text>
        <text
          x="60"
          y="104"
          textAnchor="middle"
          fontSize="5"
          letterSpacing="2"
          fill="#8a8076"
          fontFamily="var(--font-inter), sans-serif"
        >
          FOUNDATION
        </text>
      </svg>
    </div>
  );
}
