export function StarRating({
  rating,
  reviewCount,
  size = "sm",
}: {
  rating: number;
  reviewCount?: number;
  size?: "sm" | "md";
}) {
  const full = Math.round(rating);
  const px = size === "md" ? 18 : 15;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex" aria-hidden="true">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            width={px}
            height={px}
            viewBox="0 0 20 20"
            fill={i < full ? "var(--color-gold)" : "var(--color-line)"}
          >
            <path d="M10 1.5l2.47 5.01 5.53.8-4 3.9.94 5.5L10 14.1l-4.94 2.6.94-5.5-4-3.9 5.53-.8L10 1.5z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-muted">
        <span className="sr-only">Beoordeling </span>
        {rating.toFixed(1).replace(".", ",")}
        {typeof reviewCount === "number" && (
          <span className="text-muted"> ({reviewCount})</span>
        )}
      </span>
    </div>
  );
}
