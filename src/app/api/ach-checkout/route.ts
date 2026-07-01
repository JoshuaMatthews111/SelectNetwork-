import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { getJpmorganAccessToken, hasJpmorganOAuthConfig } from "@/lib/jpmorgan";

const MEMBER_REQUESTS_TABLE = "applications";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (body?.paymentMethod && body.paymentMethod !== "ach") {
    return NextResponse.json({ error: "Only ACH bank transfer is accepted." }, { status: 400 });
  }

  if (!hasJpmorganOAuthConfig()) {
    return NextResponse.json({ error: "ACH checkout is not configured yet." }, { status: 503 });
  }

  try {
    const token = await getJpmorganAccessToken();

    const { data, error } = await supabase
      .from(MEMBER_REQUESTS_TABLE)
      .insert([{
        name: body.name,
        email: body.email,
        phone: body.phone,
        interest_amount: body.interest_amount,
        status: "ach_pending",
        submitted_at: new Date().toISOString(),
        notes: [
          `Address: ${[body.addressLine1, body.addressLine2, body.city, body.state, body.zip].filter(Boolean).join(", ") || body.cityState || ""}`,
          `How they heard: ${body.heard || ""}`,
          `Role: ${body.role || ""}`,
          `Units: ${body.units || ""}`,
          "Payment Method: ACH",
          `JPMorgan OAuth: token_received_${Boolean(token.access_token)}`,
          `Agreement Accepted: ${body.agreementAcceptedAt || new Date().toISOString()}`,
          `Foundation Partner: ${Boolean(body.foundationPartner)}`,
        ].join("\n"),
      }])
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      paymentMethod: "ach",
      status: "ach_pending",
      request: data?.[0] || null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "ACH checkout could not be started.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function GET() {
  return NextResponse.json({
    paymentMethod: "ach",
    configured: hasJpmorganOAuthConfig(),
    tokenUrl: process.env.JPMORGAN_ACCESS_TOKEN_URL ? "configured" : "default_sandbox",
    scope: process.env.JPMORGAN_SCOPE || "jpm:payments:sandbox",
  });
}
