import { Suspense } from "react";
import type { AnalyticsData, Bucket } from "@/lib/analytics";
import { DateRangePicker } from "./DateRangePicker";

function pct(n: number, d: number) {
  if (!d) return "0%";
  return Math.round((n / d) * 100) + "%";
}

const PATH_LABELS: Record<string, string> = {
  "/": "Home",
  "/foundation": "Foundation-pagina",
  "/foundation/zoeken": "Vergelijk-pagina",
  "/foundation/resultaten": "Resultaten-pagina",
  "/over-ons": "Over ons",
  "/mascara": "Mascara",
  "/blush": "Blush",
  "/concealer": "Concealer",
  "/lippen": "Lippen",
  "/huidverzorging": "Huidverzorging",
};

function pageLabel(path: string) {
  return PATH_LABELS[path] ?? path;
}

function StatCard({
  label,
  value,
  sub,
}: {
  label: string;
  value: string | number;
  sub?: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-1 font-display text-3xl font-semibold text-charcoal">
        {value}
      </p>
      {sub && <p className="mt-0.5 text-xs text-muted">{sub}</p>}
    </div>
  );
}

function BarList({ title, items }: { title: string; items: Bucket[] }) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-charcoal">
        {title}
      </h3>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-muted">Nog geen data.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((i) => (
            <li key={i.label}>
              <div className="flex items-center justify-between text-sm">
                <span className="text-charcoal">{i.label}</span>
                <span className="font-medium text-muted">{i.count}</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-panel-featured">
                <div
                  className="h-full rounded-full bg-coral"
                  style={{ width: `${(i.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FunnelCard({ funnel }: { funnel: AnalyticsData["funnel"] }) {
  const steps = [
    { label: "Vergelijk-pagina", count: funnel.vergelijkViews },
    { label: "Quiz ingevuld", count: funnel.quizSubmits },
    { label: "Resultaten-pagina", count: funnel.resultatenViews },
    { label: "Deal geklikt", count: funnel.dealClicks },
  ];
  const top = Math.max(1, steps[0].count);
  const endConv = steps[0].count > 0
    ? Math.round((steps[3].count / steps[0].count) * 100)
    : 0;

  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-charcoal">
        Funnel — vergelijker → deal
      </h3>
      <ul className="mt-4">
        {steps.map((s, i) => {
          const prev = i > 0 ? steps[i - 1].count : null;
          const conv = prev !== null && prev > 0
            ? Math.round((s.count / prev) * 100)
            : prev === null
              ? null
              : 0;
          return (
            <li key={s.label}>
              {i > 0 && (
                <div className="py-1 text-center text-xs text-muted">
                  ↓ {conv}% door · {100 - (conv ?? 0)}% drop-off
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-charcoal">{s.label}</span>
                <span className="text-muted">{s.count}</span>
              </div>
              <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-panel-featured">
                <div
                  className="h-full rounded-full bg-coral"
                  style={{ width: `${(s.count / top) * 100}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs text-muted">
        Eindconversie: {endConv}% van de vergelijk-bezoekers klikt uiteindelijk
        een deal. (Unieke bezoekers.)
      </p>
    </div>
  );
}

function DealClicksCard({
  items,
}: {
  items: { label: string; count: number; linked: boolean }[];
}) {
  const max = Math.max(1, ...items.map((i) => i.count));
  return (
    <div className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <h3 className="font-display text-lg font-semibold text-charcoal">
        Deal-kliks per product
      </h3>
      {items.length === 0 ? (
        <p className="mt-3 text-sm text-muted">Nog geen data.</p>
      ) : (
        <ul className="mt-3 space-y-2">
          {items.map((i) => (
            <li key={i.label}>
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="text-charcoal">
                  {i.label}
                  {!i.linked && (
                    <span className="ml-2 rounded-full bg-coral-soft px-2 py-0.5 text-[11px] font-medium text-coral-deep">
                      nog geen link
                    </span>
                  )}
                </span>
                <span className="font-medium text-muted">{i.count}</span>
              </div>
              <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-panel-featured">
                <div
                  className={`h-full rounded-full ${i.linked ? "bg-coral" : "bg-muted/40"}`}
                  style={{ width: `${(i.count / max) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function AnalyticsDashboard({
  data,
  rangeLabel,
}: {
  data: AnalyticsData | null;
  rangeLabel: string;
}) {
  if (!data) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold text-charcoal">
          Analytics
        </h1>
        <p className="mt-2 text-muted">
          Geen data beschikbaar — controleer de Supabase-configuratie.
        </p>
        <a
          href="/api/analytics-logout"
          className="mt-4 inline-block text-sm text-teal hover:underline"
        >
          Uitloggen
        </a>
      </div>
    );
  }

  const { overview } = data;

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-charcoal">
            Analytics
          </h1>
          <p className="text-sm text-muted">
            {rangeLabel} · unieke bezoekers (refreshes tellen niet dubbel)
          </p>
        </div>
        <a
          href="/api/analytics-logout"
          className="text-sm text-teal hover:underline"
        >
          Uitloggen
        </a>
      </div>

      <Suspense fallback={null}>
        <DateRangePicker />
      </Suspense>

      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Unieke bezoekers" value={overview.visitors} />
        <StatCard label="Quiz-invullingen" value={overview.quizSubmits} />
        <StatCard label="Deal-kliks" value={overview.dealClicks} />
        <StatCard
          label="Deal-CTR"
          value={pct(overview.dealClicks, overview.quizSubmits)}
          sub="kliks per quiz-invulling"
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <FunnelCard funnel={data.funnel} />
        <BarList
          title="Bezoekers per pagina"
          items={data.pagesByPath.map((p) => ({
            label: pageLabel(p.path),
            count: p.count,
          }))}
        />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <BarList title="Leeftijd" items={data.distributions.age} />
        <BarList title="Huidtype" items={data.distributions.skin} />
        <BarList title="Huidig foundationmerk" items={data.distributions.brand} />
        <BarList title="Wat moet het dekken" items={data.distributions.concern} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <BarList
          title="Quiz-invullingen per dag"
          items={data.submitsByDay.map((d) => ({
            label: d.day,
            count: d.count,
          }))}
        />
        <DealClicksCard items={data.dealClicks} />
      </div>
    </div>
  );
}
