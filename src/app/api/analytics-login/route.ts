import { NextResponse } from "next/server";
import { analyticsToken, ANALYTICS_COOKIE } from "@/lib/analytics-auth";

export async function POST(request: Request) {
  const expected = process.env.ANALYTICS_PASSWORD;
  if (!expected) {
    return NextResponse.json(
      { error: "Analytics is nog niet geconfigureerd." },
      { status: 500 },
    );
  }

  let password = "";
  try {
    const body = await request.json();
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return NextResponse.json({ error: "onverwerkbaar" }, { status: 400 });
  }

  if (password !== expected) {
    return NextResponse.json({ error: "Onjuist wachtwoord" }, { status: 401 });
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ANALYTICS_COOKIE, analyticsToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return res;
}
