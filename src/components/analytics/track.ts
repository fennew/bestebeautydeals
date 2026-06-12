type Props = Record<string, unknown>;

/**
 * Persistent bezoekers-id (localStorage). Overleeft refreshes én meerdere
 * bezoeken, zodat dezelfde persoon nooit als losse views/kliks telt — in de
 * statistieken tellen we op unieke bezoekers (vid).
 */
function visitorId(): string {
  try {
    let vid = localStorage.getItem("bbd_vid");
    if (!vid) {
      vid =
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem("bbd_vid", vid);
    }
    return vid;
  } catch {
    return "";
  }
}

/**
 * Stuurt een analytics-event naar /api/track (fire-and-forget).
 * Alleen client-side aanroepen.
 *
 * NB: zodra de cookie-consent live staat, moet deze functie pas vuren ná
 * toestemming (bijv. een check op een consent-vlag).
 */
export function track(
  type: "pageview" | "quiz_submit" | "deal_click",
  props: Props = {},
) {
  if (typeof window === "undefined") return;
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        path: window.location.pathname,
        props: { ...props, vid: visitorId() },
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* stil falen — analytics mag de UX nooit blokkeren */
  }
}
