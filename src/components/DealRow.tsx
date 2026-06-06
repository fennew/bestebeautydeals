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

  return (
    <article
      className={`relative rounded-xl bg-white p-5 sm:p-6 ${
        featured ? "border-2 border-teal" : "border border-line"
      }`}
    >
      {/* rang / badge */}
      <div className="absolute -top-3 left-5">
        {featured ? (
          <span className="rounded-full bg-teal px-3 py-1 text-xs font-semibold text-cream">
            Onze keuze
          </span>
        ) : (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-charcoal text-sm font-semibold text-cream">
            {rank}
          </span>
        )}
      </div>

      <div className="grid items-center gap-6 pt-2 md:grid-cols-[200px_1fr_220px]">
        {/* merk + besparing */}
        <div>
          <div className="flex h-16 items-center justify-center rounded-lg border border-line bg-cream px-4">
            <span className="font-display text-lg font-semibold tracking-tight">
              {product.brand}
            </span>
          </div>
          <div className="mt-2 inline-block rounded-md bg-teal-light px-2.5 py-1 text-xs font-semibold text-teal">
            gem. €{product.savings} goedkoper
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
            <p className="font-display text-2xl font-semibold leading-tight">
              {formatPrice(product.price)}
            </p>
          </div>
          <a
            href={product.dealUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-coral px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-coral-dark"
          >
            Bekijk deal
          </a>
        </div>
      </div>
    </article>
  );
}
