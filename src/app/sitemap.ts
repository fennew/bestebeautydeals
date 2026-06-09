import type { MetadataRoute } from "next";

const SITE_URL = "https://www.bestebeautydeals.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const routes: {
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }[] = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/foundation", changeFrequency: "weekly", priority: 0.9 },
    { path: "/foundation/zoeken", changeFrequency: "monthly", priority: 0.8 },
    { path: "/mascara", changeFrequency: "monthly", priority: 0.5 },
    { path: "/blush", changeFrequency: "monthly", priority: 0.5 },
    { path: "/concealer", changeFrequency: "monthly", priority: 0.5 },
    { path: "/lippen", changeFrequency: "monthly", priority: 0.5 },
    { path: "/huidverzorging", changeFrequency: "monthly", priority: 0.5 },
    { path: "/over-ons", changeFrequency: "yearly", priority: 0.4 },
  ];

  return routes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));
}
