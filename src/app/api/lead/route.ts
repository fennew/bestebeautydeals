import { NextResponse } from "next/server";

/**
 * Lead-capture endpoint vanuit de foundation-zoekhulp.
 *
 * TODO Klaviyo-koppeling: zodra de Klaviyo private API key beschikbaar is,
 * profiel aanmaken + abonneren op een lijst. Voor nu loggen we de lead
 * server-side zodat de flow werkt zonder externe afhankelijkheid.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { email } = data ?? {};

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "Ongeldig e-mailadres" }, { status: 400 });
    }

    // Placeholder: hier komt de Klaviyo subscribe-call.
    console.log("[lead] nieuwe foundation-lead:", data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Onverwerkbaar verzoek" }, { status: 400 });
  }
}
