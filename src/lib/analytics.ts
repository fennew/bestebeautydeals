import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY;

// Server-side client; de key blijft op de server (nooit naar de client).
// Null wanneer de env-vars ontbreken, zodat de app niet crasht als analytics
// (nog) niet geconfigureerd is.
export const supabase =
  url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;

export type EventType = "pageview" | "quiz_submit" | "deal_click";

export async function trackEvent(
  type: EventType,
  path: string | null,
  props: Record<string, unknown>,
) {
  if (!supabase) return;
  await supabase.from("bbd_events").insert({ type, path, props });
}

export type Bucket = { label: string; count: number };

export type AnalyticsData = {
  days: number;
  // Alle tellingen zijn unieke bezoekers (vid) — refreshes/herhaalbezoeken
  // tellen niet dubbel.
  overview: { visitors: number; quizSubmits: number; dealClicks: number };
  distributions: {
    age: Bucket[];
    skin: Bucket[];
    brand: Bucket[];
    concern: Bucket[];
  };
  submitsByDay: { day: string; count: number }[];
  dealClicks: { label: string; count: number; linked: boolean }[];
  pagesByPath: { path: string; count: number }[];
  funnel: {
    vergelijkViews: number;
    quizSubmits: number;
    resultatenViews: number;
    dealClicks: number;
  };
};

export async function getAnalytics(days = 30): Promise<AnalyticsData | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.rpc("bbd_analytics", { p_days: days });
  if (error || !data) return null;
  return data as AnalyticsData;
}
