"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MultiSelect } from "@/components/MultiSelect";
import { TrustBar } from "@/components/TrustBar";

// Native single-select velden.
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
    // Merkenlijst (door elkaar) — later beheerbaar via de CMS.
    name: "currentBrand",
    label: "Welke foundation gebruik je nu?",
    options: [
      ["geen", "Ik gebruik geen foundation"],
      ["maybelline", "Maybelline"],
      ["esteelauder", "Estée Lauder"],
      ["loreal", "L'Oréal"],
      ["mac", "MAC"],
      ["catrice", "Catrice"],
      ["may", "MAY Cosmetics"],
      ["rimmel", "Rimmel"],
      ["clinique", "Clinique"],
      ["maxfactor", "Max Factor"],
      ["anders", "Een ander merk"],
    ],
  },
] as const;

const concernOptions = [
  { value: "lijntjes", label: "Fijne lijntjes en rimpels" },
  { value: "pigment", label: "Ouderdomsvlekken en ongelijkmatige toon" },
  { value: "droogte", label: "Droogte en ruwe textuur" },
  { value: "verslapping", label: "Verslapping van de huid" },
  { value: "porien", label: "Grote poriën" },
  { value: "acne", label: "Acne en puistjes" },
  { value: "roodheid", label: "Roodheid en irritatie" },
];

export default function ZoekenPage() {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>({});
  const [concerns, setConcerns] = useState<string[]>([]);
  const [email, setEmail] = useState("");
  const [emailDone, setEmailDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function set(name: string, value: string) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function sendLead() {
    if (!email || !email.includes("@")) return;
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, ...values, concerns }),
      });
    } catch {
      /* stil falen */
    }
    setEmailDone(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    if (email && !emailDone) await sendLead();

    const params = new URLSearchParams();
    for (const key of ["skin", "age", "currentBrand"]) {
      if (values[key]) params.set(key, values[key]);
    }
    if (concerns.length) params.set("concern", concerns.join(","));
    router.push(`/foundation/resultaten?${params.toString()}`);
  }

  return (
    <div className="bg-white">
      {/* Hero met horizontale widget */}
      <section className="bg-gradient-to-br from-brand to-brand-deep">
        <div className="mx-auto max-w-7xl px-4 pb-24 pt-14 sm:px-6 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/80">
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

            <label className="block">
              <span className="text-sm font-semibold text-charcoal">
                Wat moet je foundation dekken?
              </span>
              <div className="mt-1.5">
                <MultiSelect
                  options={concernOptions}
                  value={concerns}
                  onChange={setConcerns}
                />
              </div>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="h-[50px] rounded-xl bg-coral px-5 font-semibold text-white transition-colors hover:bg-coral-dark disabled:opacity-60"
            >
              {submitting ? "Zoeken…" : "Vergelijk"}
            </button>
          </div>

          {/* Optionele e-mail (Klaviyo lead) met aanmeldknop */}
          <div className="mt-4 flex flex-col gap-3 border-t border-line pt-4 sm:flex-row sm:items-center sm:justify-between">
            <label htmlFor="email" className="text-base text-muted">
              Wil je jouw match én de beste deals ook per e-mail ontvangen?
            </label>
            {emailDone ? (
              <span className="inline-flex items-center gap-2 text-sm font-medium text-teal">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
                Aangemeld — je hoort van ons!
              </span>
            ) : (
              <div className="flex w-full gap-2 sm:max-w-md">
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jouwnaam@email.nl"
                  className="w-full rounded-xl border border-line bg-white px-4 py-2.5 outline-none focus:border-teal"
                />
                <button
                  type="button"
                  onClick={sendLead}
                  className="shrink-0 rounded-xl border border-teal px-4 py-2.5 text-sm font-semibold text-teal transition-colors hover:bg-teal hover:text-white"
                >
                  Ontvangen
                </button>
              </div>
            )}
          </div>
          <p className="mt-3 max-w-xl text-[10px] leading-relaxed text-muted">
            Door je e-mailadres achter te laten ga je akkoord dat we je
            persoonlijke foundation-advies en relevante aanbiedingen mogen
            sturen. We delen je gegevens nooit met derden en je kunt je op elk
            moment uitschrijven. Zie ons privacybeleid.
          </p>
        </form>

      </div>

      {/* Garanties onder de vergelijker */}
      <div className="mt-14">
        <TrustBar variant="vergelijker" />
      </div>
    </div>
  );
}
