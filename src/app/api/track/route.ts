import { NextResponse } from "next/server";
import { trackEvent, type EventType } from "@/lib/analytics";

const ALLOWED: EventType[] = ["pageview", "quiz_submit", "deal_click"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const type = body?.type as EventType;
    if (!ALLOWED.includes(type)) {
      return NextResponse.json({ error: "ongeldig type" }, { status: 400 });
    }
    const path =
      typeof body?.path === "string" ? body.path.slice(0, 200) : null;
    const props =
      body?.props && typeof body.props === "object" && !Array.isArray(body.props)
        ? (body.props as Record<string, unknown>)
        : {};
    await trackEvent(type, path, props);
    return new NextResponse(null, { status: 204 });
  } catch {
    return NextResponse.json({ error: "onverwerkbaar" }, { status: 400 });
  }
}
