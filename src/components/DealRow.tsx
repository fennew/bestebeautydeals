import type { Product } from "@/data/types";
import { StarRating } from "./StarRating";

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
      stroke="var(--color-teal)"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0"
    >
      <path d="M20 6 9 17l-5-5" />
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
  const usps = product.pros.slice(0, 4);
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
        <span
          className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold text-white ${
            featured ? "bg-teal" : "bg-charcoal"
          }`}
        >
          {rank}
        </span>
        {featured && (
          <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white">
            Onze keuze
          </span>
        )}
      </div>

      {/* kortinglabel rechtsboven */}
      <span className="absolute -top-3 right-5 rounded-md bg-gold px-2.5 py-1 text-xs font-bold text-charcoal">
        gemiddeld € {product.savings} korting
      </span>

      <div className="grid items-center gap-6 pt-2 md:grid-cols-[200px_1fr_220px]">
        {/* merk */}
        <div>
          <div className="flex h-16 items-center justify-center rounded-lg border border-line bg-mist px-4">
            <span className="font-display text-lg font-semibold tracking-tight text-charcoal">
              {product.brand}
            </span>
          </div>
        </div>

        {/* USP's */}
        <ul className="space-y-1.5">
          {usps.map((u) => (
            <li key={u} className="flex gap-2 text-sm text-charcoal">
              <Check />
              <span>{u}</span>
            </li>
          ))}
          <li className="pt-1">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </li>
        </ul>

        {/* prijs + cta */}
        <div className="flex flex-col items-stretch gap-2 md:items-end">
          <div className="md:text-right">
            <span className="text-xs text-muted">onze prijs</span>
            <div className="flex items-baseline gap-2 md:justify-end">
              <span className="font-display text-2xl font-semibold leading-tight text-charcoal">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-muted line-through">
                {formatPrice(original)}
              </span>
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
