"use client";

import { useEffect, useState } from "react";

const usps = [
  "Altijd korting op make-up",
  "Vergelijk & bespaar direct",
  "Honderden exclusieve deals",
];

function Check() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--color-coral)"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="shrink-0"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export function AnnouncementBar() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % usps.length), 3500);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="border-b border-line bg-white">
      <div className="mx-auto max-w-7xl px-4 py-2 text-xs font-medium text-charcoal sm:text-sm">
        {/* Desktop: 3 naast elkaar */}
        <div className="hidden items-center justify-center gap-10 md:flex">
          {usps.map((u) => (
            <span key={u} className="flex items-center gap-2">
              <Check />
              {u}
            </span>
          ))}
        </div>

        {/* Mobiel: auto-slider */}
        <div className="flex items-center justify-center md:hidden">
          <span
            key={i}
            className="flex animate-[fadeIn_0.4s_ease] items-center gap-2"
          >
            <Check />
            {usps[i]}
          </span>
        </div>
      </div>
    </div>
  );
}
