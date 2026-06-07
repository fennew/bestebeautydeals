import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

/**
 * Sanity-webhook: ververst de CMS-gestuurde pagina's direct na publiceren.
 * Webhook instellen in sanity.io/manage → API → Webhooks:
 *   URL:    https://<jouw-domein>/api/revalidate
 *   Secret: zelfde waarde als SANITY_REVALIDATE_SECRET
 *   Trigger: Create / Update / Delete
 */
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true,
    );

    if (!isValidSignature) {
      return new Response("Ongeldige handtekening", { status: 401 });
    }

    // Alle CMS-gestuurde pagina's verversen.
    for (const path of ["/", "/foundation", "/foundation/resultaten"]) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
