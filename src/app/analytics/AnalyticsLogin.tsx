"use client";

import { useState } from "react";

export function AnalyticsLogin({ configured }: { configured: boolean }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/analytics-login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (res.ok) {
        window.location.reload();
        return;
      }
      const j = await res.json().catch(() => ({}));
      setError(j.error || "Inloggen mislukt");
    } catch {
      setError("Inloggen mislukt");
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-sm flex-col justify-center px-4">
      <h1 className="font-display text-2xl font-semibold text-charcoal">
        Analytics
      </h1>
      <p className="mt-1 text-sm text-muted">
        Log in om het dashboard te bekijken.
      </p>

      {!configured && (
        <p className="mt-4 rounded-lg bg-coral-soft p-3 text-sm text-coral-deep">
          Nog niet geconfigureerd: zet <code>ANALYTICS_PASSWORD</code> in de
          omgevingsvariabelen.
        </p>
      )}

      <form onSubmit={submit} className="mt-6 space-y-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Wachtwoord"
          autoFocus
          className="w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-teal"
        />
        {error && <p className="text-sm text-con">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-xl bg-coral px-5 py-3 font-semibold text-white transition-colors hover:bg-coral-dark disabled:opacity-60"
        >
          {loading ? "Bezig…" : "Inloggen"}
        </button>
      </form>
    </div>
  );
}
