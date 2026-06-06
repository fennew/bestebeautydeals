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
      className={`group flex flex-col overflow-hidden rounded-xl bg-white transition-colors ${
        featured ? "border-2 border-teal" : "border border-line"
      }`}
    >
      <div className="relative">
        <ProductImage product={product} className="py-6" />
        {product.badge && (
          <span className="absolute left-3 top-3 rounded-full bg-teal px-3 py-1 text-xs font-medium tracking-wide text-cream">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col border-t border-line p-5">
        <span className="text-xs font-medium uppercase tracking-wider text-muted">
          {product.bestForLabel}
        </span>
        <h3 className="mt-1.5 font-display text-xl leading-tight">
          {product.brand}
        </h3>
        <p className="mt-0.5 text-sm text-muted">{product.tagline}</p>

        <div className="mt-3">
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <span className="font-display text-2xl font-semibold">
            {formatPrice(product.price)}
          </span>
          <a
            href={product.dealUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-coral px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-coral-dark"
          >
            Bekijk deal
          </a>
        </div>
      </div>
    </article>
  );
}
