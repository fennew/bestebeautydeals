import Link from "next/link";

/**
 * Logo: coral prijskaart-icoon met %, wordmark in Poppins.
 * `variant` bepaalt de tekstkleur (teal op licht, cream op de teal header).
 * Vervang het icoon later door het definitieve logo-bestand in /public.
 */
export function Logo({
  className = "",
  variant = "dark",
}: {
  className?: string;
  variant?: "dark" | "light";
}) {
  const textColor = variant === "light" ? "text-cream" : "text-teal";
  return (
    <Link
      href="/"
      className={`flex items-center gap-2.5 ${className}`}
      aria-label="Beste Beauty Deals — naar de homepage"
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
      >
        {/* prijskaart */}
        <path
          d="M19.5 3.2 36 19.7a3.2 3.2 0 0 1 0 4.5L24.2 36a3.2 3.2 0 0 1-4.5 0L3.2 19.5a3 3 0 0 1-.9-2.3L3 6.1A3 3 0 0 1 6.1 3l11.1-.3a3 3 0 0 1 2.3.5Z"
          fill="#ff6b5c"
        />
        {/* gaatje */}
        <circle cx="10.5" cy="10.5" r="2.2" fill="#fff" />
        {/* procent */}
        <circle cx="17" cy="20" r="2.1" fill="#fff" />
        <circle cx="25" cy="28" r="2.1" fill="#fff" />
        <rect
          x="13"
          y="22.5"
          width="16"
          height="2.6"
          rx="1.3"
          transform="rotate(-45 13 22.5)"
          fill="#fff"
        />
      </svg>
      <span
        className={`text-2xl font-bold lowercase tracking-tight ${textColor}`}
        style={{ fontFamily: "var(--font-poppins)" }}
      >
        bestebeautydeals
      </span>
    </Link>
  );
}
