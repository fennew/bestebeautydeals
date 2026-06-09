import type { Product } from "@/data/types";
import { StarRating } from "./StarRating";
import { ProductImage } from "./ProductImage";

function formatPrice(price: number) {
  return `€${price.toFixed(2).replace(".", ",")}`;
}

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-verified)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function Cross() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-con)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export function DealRow({
  product,
  rank,
  featured = false,
}: {
  product: Product;
  rank: number;
  featured?: boolean;
}) {
  const usps = product.pros.map((p) => p.trim()).filter(Boolean).slice(0, 4);
  const cons = product.cons.map((c) => c.trim()).filter(Boolean).slice(0, 3);
  const original = product.price + product.savings;

  return (
    <article
      className={`relative rounded-xl bg-white p-5 sm:p-6 ${
        featured
          ? "border-2 border-teal shadow-[0_10px_30px_-12px_rgba(14,92,91,0.45)]"
          : "border border-line shadow-sm"
      }`}
    >
      {/* rang + (optioneel) onze keuze */}
      <div className="absolute -top-3 left-5 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-rank text-sm font-semibold text-white">
          {rank}
        </span>
        {featured && (
          <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Onze keuze
          </span>
        )}
      </div>

      {/* kortinglabel rechtsboven (alleen tonen als er korting is) */}
      {product.savings > 0 && (
        <span className="absolute -top-3 right-5 rounded-md bg-[#1f9d57] px-2.5 py-1 text-xs font-bold text-white">
          gemiddeld €{product.savings} korting
        </span>
      )}

      <div className="grid items-center gap-6 pt-2 md:grid-cols-[160px_1fr_220px]">
        {/* vierkante productfoto */}
        <div className="aspect-square w-full overflow-hidden rounded-lg border border-line">
          <ProductImage product={product} className="h-full w-full" />
        </div>

        {/* titel + USP's */}
        <div>
          <h3 className="mb-2 font-display text-lg font-semibold tracking-tight text-charcoal">
            {product.brand} — {product.name}
          </h3>
          <ul className="space-y-1.5">
            {usps.map((u) => (
            <li key={u} className="flex gap-2 text-sm text-charcoal">
              <Check />
              <span>{u}</span>
            </li>
          ))}
            {cons.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-muted">
                <Cross />
                <span>{c}</span>
              </li>
            ))}
            <li className="pt-1">
              <StarRating rating={product.rating} />
            </li>
          </ul>
        </div>

        {/* prijs + cta */}
        <div className="flex flex-col items-stretch gap-2 md:items-end">
          <div className="md:text-right">
            <span className="text-xs text-muted">onze prijs</span>
            <div className="flex items-baseline gap-2 md:justify-end">
              <span className="font-display text-2xl font-semibold leading-tight text-charcoal">
                {formatPrice(product.price)}
              </span>
              {product.savings > 0 && (
                <span className="text-sm text-muted line-through">
                  {formatPrice(original)}
                </span>
              )}
            </div>
          </div>
          <a
            href={product.dealUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-lg px-6 py-3 text-center font-semibold transition-colors ${
              featured
                ? "bg-coral text-white hover:bg-coral-dark"
                : "border border-line text-charcoal hover:border-teal hover:text-teal"
            }`}
          >
            Bekijk deal
          </a>
        </div>
      </div>
    </article>
  );
}
