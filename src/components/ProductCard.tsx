import type { Product } from "@/data/types";
import { StarRating } from "./StarRating";
import { ProductImage } from "./ProductImage";

function formatPrice(price: number) {
  return `€${price.toFixed(2).replace(".", ",")}`;
}

export function ProductCard({
  product,
  featured = false,
}: {
  product: Product;
  featured?: boolean;
}) {
  return (
    <article
      className={`relative flex flex-col rounded-2xl bg-white p-5 shadow-sm transition-shadow hover:shadow-md ${
        featured ? "ring-2 ring-coral" : "ring-1 ring-line"
      }`}
    >
      {product.badge && (
        <span className="absolute left-4 top-4 z-10 rounded-full bg-teal px-3 py-1 text-xs font-semibold text-cream">
          {product.badge}
        </span>
      )}

      <ProductImage product={product} className="mb-4 py-2" />

      <span className="text-xs font-medium uppercase tracking-wide text-coral">
        {product.bestForLabel}
      </span>
      <h3 className="mt-1 font-display text-xl leading-tight">{product.brand}</h3>
      <p className="text-sm text-muted">{product.tagline}</p>

      <div className="mt-3">
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-2xl font-semibold">
          {formatPrice(product.price)}
        </span>
      </div>

      <a
        href={product.dealUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 block rounded-xl bg-coral px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-coral-dark"
      >
        Bekijk deal
      </a>
    </article>
  );
}
