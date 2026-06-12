import { cookies } from "next/headers";
import type { Metadata } from "next";
import { getAnalytics } from "@/lib/analytics";
import { analyticsToken, ANALYTICS_COOKIE } from "@/lib/analytics-auth";
import { AnalyticsLogin } from "./AnalyticsLogin";
import { AnalyticsDashboard } from "./AnalyticsDashboard";

export const metadata: Metadata = {
  title: "Analytics",
  robots: { index: false, follow: false },
};

const PRESETS = [7, 30, 90];

function fmt(d: Date) {
  return d.toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

const isDate = (s?: string) => !!s && /^\d{4}-\d{2}-\d{2}$/.test(s);

export default async function AnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const expected = process.env.ANALYTICS_PASSWORD;
  const jar = await cookies();
  const authed =
    !!expected && jar.get(ANALYTICS_COOKIE)?.value === analyticsToken(expected);

  if (!authed) {
    return <AnalyticsLogin configured={!!expected} />;
  }

  const sp = await searchParams;
  const fromStr = typeof sp.from === "string" ? sp.from : undefined;
  const toStr = typeof sp.to === "string" ? sp.to : undefined;
  const rangeStr = typeof sp.range === "string" ? sp.range : undefined;

  let from: Date;
  let to: Date;
  let label: string;

  if (isDate(fromStr) && isDate(toStr)) {
    from = new Date(`${fromStr}T00:00:00`);
    to = new Date(`${toStr}T23:59:59`);
    label = `${fmt(from)} – ${fmt(to)}`;
  } else {
    const days = PRESETS.includes(Number(rangeStr)) ? Number(rangeStr) : 30;
    to = new Date();
    from = new Date(to.getTime() - days * 86400000);
    label = `Afgelopen ${days} dagen`;
  }

  const data = await getAnalytics(from, to);
  return <AnalyticsDashboard data={data} rangeLabel={label} />;
}
