type Props = Record<string, unknown>;

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
      body: JSON.stringify({ type, path: window.location.pathname, props }),
      keepalive: true,
    }).catch(() => {});
  } catch {
    /* stil falen — analytics mag de UX nooit blokkeren */
  }
}
