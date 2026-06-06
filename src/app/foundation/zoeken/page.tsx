"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trustStats } from "@/data/reviews";

const fields = [
  {
    name: "skin",
    label: "Huidtype",
    options: [
      ["droog", "Droog"],
      ["vet", "Vet"],
      ["normaal", "Normaal"],
      ["gevoelig", "Gevoelig"],
      ["gemengd", "Gemengd"],
    ],
  },
  {
    name: "age",
    label: "Leeftijd",
    options: [
      ["<40", "Jonger dan 40"],
      ["40-49", "40 – 49 jaar"],
      ["50-59", "50 – 59 jaar"],
      ["60+", "60 jaar en ouder"],
    ],
  },
  {
    // Merkenlijst — later beheerbaar via de CMS.
    name: "currentBrand",
    label: "Welke foundation gebruik je nu?",
    options: [
      ["geen", "Ik gebruik geen foundation"],
      ["may", "MAY Cosmetics"],
      ["loreal", "L'Oréal"],
      ["maybelline", "Maybelline"],
      ["rimmel", "Rimmel"],
      ["maxfactor", "Max Factor"],
      ["esteelauder", "Estée Lauder"],
      ["clinique", "Clinique"],
      ["mac", "MAC"],
      ["catrice", "Catrice"],
      ["anders", "Een ander merk"],
    ],
  },
  {
    name: "concern",
    label: "Wat moet je foundation dekken?",
    options: [
      ["lijntjes", "Fijne lijntjes en rimpels"],
      ["pigment", "Ouderdomsvlekken en ongelijkmatige toon"],
      ["droogte", "Droogte en ruwe textuur"],
      ["verslapping", "Verslapping van de huid"],
      ["porien", "Grote poriën"],
      ["acne", "Acne en puistjes"],
      ["roodheid", "Roodheid en irritatie"],
    ],
  },
] as const;

export default function ZoekenPage() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function set(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    if (email) {
      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, ...values }),
        });
      } catch {
        /* stil falen — gebruiker mag altijd door */
      }
    }

    const params = new URLSearchParams();
    for (const key of ["skin", "age", "currentBrand", "concern"]) {
      if (values[key]) params.set(key, values[key]);
    }
    router.push(`/foundation/resultaten?${params.toString()}`);
  }

  return (
    <div className="bg-white">
      {/* Hero met horizontale widget */}
      <section className="bg-teal-deep">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-blush">
            Foundation-vergelijker
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-3xl font-semibold text-white sm:text-4xl lg:text-5xl">
            Foundation vergelijken? Vind jouw perfecte match
          </h1>
          <p className="mt-3 max-w-xl text-cream/80">
            Vul je huidprofiel in en wij tonen direct de best passende
            foundation-deals — afgestemd op jouw huid.
          </p>
        </div>
      </section>

      <div className="mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-5 shadow-lg ring-1 ring-line sm:p-6"
        >
          <div className="grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {fields.map((f) => (
              <label key={f.name} className="block">
                <span className="text-sm font-semibold text-charcoal">
                  {f.label}
                </span>
                <select
                  value={values[f.name] ?? ""}
                  onChange={(e) => set(f.name, e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-line bg-white px-3 py-3 text-charcoal outline-none focus:border-teal"
                >
                  <option value="">Selecteer</option>
                  {f.options.map(([val, lbl]) => (
                    <option key={val} value={val}>
                      {lbl}
                    </option>
                  ))}
                </select>
              </label>
            ))}

            <button
              type="submit"
              disabled={submitting}
              className="h-[50px] rounded-xl bg-coral px-5 font-semibold text-white transition-colors hover:bg-coral-dark disabled:opacity-60"
            >
              {submitting ? "Zoeken…" : "Vergelijk"}
            </button>
          </div>

          {/* Optionele e-mail (Klaviyo lead) */}
          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
            <label htmlFor="email" className="text-sm text-muted">
              Wil je jouw match én de beste deals ook per e-mail ontvangen?
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouwnaam@email.nl (optioneel)"
              className="w-full rounded-xl border border-line bg-white px-4 py-2.5 outline-none focus:border-teal sm:max-w-xs"
            />
          </div>
        </form>

        {/* Vertrouwenscijfers */}
        <div className="mt-10 grid gap-6 border-b border-line pb-10 sm:grid-cols-3">
          {trustStats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-display text-3xl font-semibold text-teal">
                {s.value}
              </p>
              <p className="mt-1 text-sm text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
