"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";

/** Snelheid van de mobiele auto-carrousel (ms tussen slides). Pas hier aan. */
const SLIDE_INTERVAL_MS = 3500;

const icons = {
  tag: (
    <>
      <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
      <circle cx="7.5" cy="7.5" r="1.5" />
    </>
  ),
  award: (
    <>
      <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
      <circle cx="12" cy="8" r="6" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>
  ),
  check: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  euro: (
    <path d="M4 10h12M4 14h9M19 6a7.7 7.7 0 0 0-5.2-2A7.9 7.9 0 0 0 6 12c0 4.4 3.5 8 7.8 8 2 0 3.8-.8 5.2-2" />
  ),
  thumbs: (
    <path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
  ),
};

type Item = { title: string; sub: string; icon: ReactNode };

const defaultItems: Item[] = [
  { title: "Altijd de scherpste deals", sub: "voor jouw beauty", icon: icons.tag },
  { title: "Altijd de beste producten", sub: "zorgvuldig geselecteerd", icon: icons.award },
  { title: "Vertrouwd door 200.000+", sub: "vrouwen gingen je voor", icon: icons.users },
  { title: "Zo geregeld", sub: "in 1 minuut jouw match", icon: icons.check },
];

const vergelijkerItems: Item[] = [
  { title: "Altijd de scherpste deals", sub: "voor jouw beauty", icon: icons.tag },
  { title: "123.000+", sub: "vrouwen gingen je voor", icon: icons.users },
  { title: "Bespaar gemiddeld €120", sub: "per jaar op je make-up", icon: icons.euro },
  { title: "9,3", sub: "gemiddelde klantwaardering", icon: icons.thumbs },
];

function UspItem({ item }: { item: Item }) {
  return (
    <div className="flex flex-col items-center text-center">
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--color-teal)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {item.icon}
      </svg>
      <p className="mt-4 font-display text-lg font-semibold leading-tight text-teal">
        {item.title}
      </p>
      <p className="mt-0.5 text-sm text-muted">{item.sub}</p>
    </div>
  );
}

export function TrustBar({
  variant = "default",
}: {
  variant?: "default" | "vergelijker";
}) {
  const items = variant === "vergelijker" ? vergelijkerItems : defaultItems;
  const [index, setIndex] = useState(0);

  // Mobiele carrousel: automatisch doorschuiven, oneindig herhalend.
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, SLIDE_INTERVAL_MS);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section className="border-y border-line bg-soft-pink">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <h2 className="text-center font-display text-2xl font-semibold tracking-tight text-teal">
          Jij verdient de beste deal
        </h2>

        {/* Tablet/desktop: vast grid */}
        <div className="mt-10 hidden gap-8 sm:grid sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <UspItem key={item.title} item={item} />
          ))}
        </div>

        {/* Mobiel: auto-slidende carrousel zonder pijltjes */}
        <div className="mt-10 sm:hidden">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${index * 100}%)` }}
            >
              {items.map((item) => (
                <div key={item.title} className="w-full shrink-0">
                  <UspItem item={item} />
                </div>
              ))}
            </div>
          </div>

          {/* Positie-indicator (dots) */}
          <div className="mt-6 flex justify-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.title}
                type="button"
                aria-label={`Toon: ${item.title}`}
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${
                  i === index ? "w-5 bg-teal" : "w-2 bg-teal/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
