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
  const original = product.price + product.savings;
  const discountPct = Math.round((product.savings / original) * 100);

  return (
    <article
      className={`relative flex flex-col rounded-xl bg-white ${
        featured
          ? "border-2 border-teal shadow-[0_10px_30px_-12px_rgba(14,92,91,0.45)]"
          : "border border-line shadow-sm"
      }`}
    >
      {/* ONZE KEUZE badge — half over de bovenrand */}
      {featured && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-teal px-4 py-1 text-xs font-semibold uppercase tracking-wider text-white">
          Onze keuze
        </span>
      )}

      <div className="relative px-5 pt-6">
        {/* kortingsbadge op concurrent-kaarten */}
        {!featured && discountPct > 0 && (
          <span className="absolute right-4 top-4 z-10 rounded-md bg-coral-soft px-2 py-1 text-xs font-bold text-coral-deep">
            -{discountPct}%
          </span>
        )}
        <ProductImage product={product} className="rounded-lg py-4" />
      </div>

      <div className="flex flex-1 flex-col p-5 pt-4">
        <h3 className="font-display text-xl font-semibold leading-tight text-charcoal">
          {product.brand} — {product.name}
        </h3>

        <div className="mt-3">
          <StarRating rating={product.rating} size="md" />
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-line pt-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-semibold text-charcoal">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-muted line-through">
                {formatPrice(original)}
              </span>
            </div>
            <span className="text-xs font-medium text-teal">
              gem. €{product.savings} goedkoper
            </span>
          </div>
        </div>

        <a
          href={product.dealUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`mt-4 block rounded-lg px-4 py-3 text-center text-sm font-semibold transition-colors ${
            featured
              ? "bg-coral text-white hover:bg-coral-dark"
              : "border border-line text-charcoal hover:border-teal hover:text-teal"
          }`}
        >
          Bekijk deal
        </a>
      </div>
    </article>
  );
}
