"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const PRESETS = [
  { days: 7, label: "7 dagen" },
  { days: 30, label: "30 dagen" },
  { days: 90, label: "90 dagen" },
];

function today() {
  return new Date().toISOString().slice(0, 10);
}
function daysAgo(n: number) {
  return new Date(Date.now() - n * 86400000).toISOString().slice(0, 10);
}

export function DateRangePicker() {
  const router = useRouter();
  const sp = useSearchParams();
  const customActive = !!(sp.get("from") && sp.get("to"));
  const activeRange = customActive ? null : Number(sp.get("range") ?? 30);

  const [from, setFrom] = useState(sp.get("from") ?? daysAgo(30));
  const [to, setTo] = useState(sp.get("to") ?? today());

  function applyCustom(e: React.FormEvent) {
    e.preventDefault();
    if (!from || !to) return;
    router.push(`/analytics?from=${from}&to=${to}`);
  }

  return (
    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-2">
        {PRESETS.map((p) => (
          <button
            key={p.days}
            type="button"
            onClick={() => router.push(`/analytics?range=${p.days}`)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              activeRange === p.days
                ? "bg-coral text-white"
                : "border border-line text-charcoal hover:border-teal"
            }`}
          >
            {p.label}
          </button>
        ))}
      </div>

      <form onSubmit={applyCustom} className="flex items-center gap-2">
        <input
          type="date"
          value={from}
          max={to}
          onChange={(e) => setFrom(e.target.value)}
          className="rounded-lg border border-line bg-white px-2 py-1.5 text-sm text-charcoal outline-none focus:border-teal"
        />
        <span className="text-muted">–</span>
        <input
          type="date"
          value={to}
          max={today()}
          onChange={(e) => setTo(e.target.value)}
          className="rounded-lg border border-line bg-white px-2 py-1.5 text-sm text-charcoal outline-none focus:border-teal"
        />
        <button
          type="submit"
          className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
            customActive
              ? "bg-coral text-white"
              : "border border-line text-charcoal hover:border-teal"
          }`}
        >
          Toepassen
        </button>
      </form>
    </div>
  );
}
