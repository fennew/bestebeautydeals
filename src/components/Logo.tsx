import Link from "next/link";

/**
 * Tijdelijk wordmark-logo (sparkle + "bestebeautydeals").
 * Vervang later door het aangeleverde logo-bestand in /public.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-2 font-display text-2xl font-semibold tracking-tight ${className}`}
      aria-label="Beste Beauty Deals — naar de homepage"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
        className="text-blush"
      >
        <path
          d="M12 1.5l2.2 6.3 6.3 2.2-6.3 2.2L12 18.5l-2.2-6.3L3.5 10l6.3-2.2L12 1.5z"
          fill="currentColor"
        />
        <path
          d="M19 14l1 2.8L23 18l-3 1.2L19 22l-1-2.8L15 18l3-1.2L19 14z"
          fill="currentColor"
          opacity="0.7"
        />
      </svg>
      <span>bestebeautydeals</span>
    </Link>
  );
}
