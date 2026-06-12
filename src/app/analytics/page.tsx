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

export default async function AnalyticsPage() {
  const expected = process.env.ANALYTICS_PASSWORD;
  const jar = await cookies();
  const authed =
    !!expected && jar.get(ANALYTICS_COOKIE)?.value === analyticsToken(expected);

  if (!authed) {
    return <AnalyticsLogin configured={!!expected} />;
  }

  const data = await getAnalytics(30);
  return <AnalyticsDashboard data={data} />;
}
