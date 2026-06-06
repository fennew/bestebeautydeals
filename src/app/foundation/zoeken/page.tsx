"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const skinTypes = [
  { value: "droog", label: "Droog" },
  { value: "vet", label: "Vet" },
  { value: "normaal", label: "Normaal" },
  { value: "gevoelig", label: "Gevoelig" },
  { value: "gemengd", label: "Gemengd" },
];

const ageGroups = [
  { value: "40-49", label: "40 – 49 jaar" },
  { value: "50-59", label: "50 – 59 jaar" },
  { value: "60+", label: "60 jaar en ouder" },
  { value: "<40", label: "Jonger dan 40" },
];

const coverages = [
  { value: "licht", label: "Licht — natuurlijk" },
  { value: "medium", label: "Medium — egaal" },
  { value: "hoog", label: "Hoog — volledig dekkend" },
];

const finishes = [
  { value: "dewy", label: "Dewy / stralend" },
  { value: "natuurlijk", label: "Natuurlijk" },
  { value: "matte", label: "Matte" },
];

const undertones = [
  { value: "koel", label: "Koel (rozig)" },
  { value: "neutraal", label: "Neutraal" },
  { value: "warm", label: "Warm (goudgeel)" },
];

function Field({
  label,
  options,
  value,
  onChange,
  name,
}: {
  label: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  name: string;
}) {
  return (
    <fieldset>
      <legend className="font-display text-lg">{label}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.value;
          return (
            <button
              key={o.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(active ? "" : o.value)}
              className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                active
                  ? "border-teal bg-teal text-cream"
                  : "border-line bg-white text-charcoal hover:border-teal"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
      <input type="hidden" name={name} value={value} />
    </fieldset>
  );
}

export default function ZoekenPage() {
  const router = useRouter();
  const [skin, setSkin] = useState("");
  const [age, setAge] = useState("");
  const [coverage, setCoverage] = useState("");
  const [finish, setFinish] = useState("");
  const [undertone, setUndertone] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // E-mail vastleggen voor latere Klaviyo-koppeling (lead capture).
    if (email) {
      try {
        await fetch("/api/lead", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, skin, age, coverage, finish, undertone }),
        });
      } catch {
        // stil falen — de gebruiker mag altijd door naar de resultaten
      }
    }

    const params = new URLSearchParams();
    if (skin) params.set("skin", skin);
    if (coverage) params.set("coverage", coverage);
    if (finish) params.set("finish", finish);
    if (undertone) params.set("undertone", undertone);
    router.push(`/foundation/resultaten?${params.toString()}`);
  }

  return (
    <div className="bg-gradient-to-b from-blush-light to-cream">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <header className="text-center">
          <h1 className="font-display text-4xl font-semibold">
            Vind jouw perfecte foundation
          </h1>
          <p className="mt-3 text-muted">
            Beantwoord een paar korte vragen over je huid. Wij vergelijken
            direct de best passende deals voor jou.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-8 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-line sm:p-8"
        >
          <Field label="Wat is jouw huidtype?" name="skin" options={skinTypes} value={skin} onChange={setSkin} />
          <Field label="In welke leeftijdsgroep val je?" name="age" options={ageGroups} value={age} onChange={setAge} />
          <Field label="Welke dekking zoek je?" name="coverage" options={coverages} value={coverage} onChange={setCoverage} />
          <Field label="Welke finish heeft je voorkeur?" name="finish" options={finishes} value={finish} onChange={setFinish} />
          <Field label="Wat is jouw ondertoon?" name="undertone" options={undertones} value={undertone} onChange={setUndertone} />

          <div>
            <label htmlFor="email" className="font-display text-lg">
              Ontvang jouw match ook per e-mail (optioneel)
            </label>
            <p className="mt-1 text-sm text-muted">
              We sturen je jouw persoonlijke foundation-advies en de beste deals.
            </p>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouwnaam@email.nl"
              className="mt-3 w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-teal"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-coral px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-coral-dark disabled:opacity-60"
          >
            {submitting ? "Even zoeken…" : "Toon mijn beste deals"}
          </button>
          <p className="text-center text-xs text-muted">
            Gratis en vrijblijvend. Je gegevens worden vertrouwelijk behandeld.
          </p>
        </form>
      </div>
    </div>
  );
}
