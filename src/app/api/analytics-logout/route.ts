import { NextResponse } from "next/server";
import { ANALYTICS_COOKIE } from "@/lib/analytics-auth";

export async function GET(request: Request) {
  const res = NextResponse.redirect(new URL("/analytics", request.url));
  res.cookies.set(ANALYTICS_COOKIE, "", { path: "/", maxAge: 0 });
  return res;
}
