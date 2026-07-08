import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

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

const siteUrl = (req: NextRequest) =>
  process.env.NEXT_PUBLIC_SITE_URL || `${req.nextUrl.protocol}//${req.nextUrl.host}`;

export async function POST(req: NextRequest) {
  if (!stripe) {
    return NextResponse.json({ error: "ACH checkout is not configured yet." }, { status: 503 });
  }

  const body = await req.json();

  if (body?.paymentMethod && body.paymentMethod !== "ach") {
    return NextResponse.json({ error: "Only ACH bank transfer is accepted." }, { status: 400 });
  }

  const amount = Number(body.interest_amount || 0);
  const amountCents = Math.round(amount * 100);

  if (!body.name || !body.email || amountCents < 100) {
    return NextResponse.json({ error: "Name, email, and a valid capital commitment are required." }, { status: 400 });
  }

  const notes = [
    `Address: ${[body.addressLine1, body.addressLine2, body.city, body.state, body.zip].filter(Boolean).join(", ") || body.cityState || ""}`,
    `How they heard: ${body.heard || ""}`,
    `Role: ${body.role || ""}`,
    `Units: ${body.units || ""}`,
    "Payment Method: Stripe ACH bank transfer",
    "Stripe Checkout Session: pending",
    `Agreement Accepted: ${body.agreementAcceptedAt || new Date().toISOString()}`,
    `Foundation Partner: ${Boolean(body.foundationPartner)}`,
  ].join("\n");

  const { data, error } = await supabase
    .from(MEMBER_REQUESTS_TABLE)
    .insert([{
      name: body.name,
      email: body.email,
      phone: body.phone,
      interest_amount: amount,
      status: "stripe_checkout_started",
      submitted_at: new Date().toISOString(),
      notes,
    }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  try {
    const baseUrl = siteUrl(req);
    const requestId = String(data?.id || "");
    const metadata = {
      request_id: requestId,
      email: String(body.email || ""),
      role: String(body.role || ""),
      units: String(body.units || ""),
      payment_method: "ach",
    };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["us_bank_account"],
      customer_email: body.email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            unit_amount: amountCents,
            product_data: {
              name: `${body.units || "Select"} Units`,
              description: "The Select Network Member Group ACH capital commitment",
            },
          },
        },
      ],
      metadata,
      payment_intent_data: {
        metadata,
      },
      success_url: `${baseUrl}/invest-now?checkout=success&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/invest-now?checkout=cancelled`,
    });

    await supabase
      .from(MEMBER_REQUESTS_TABLE)
      .update({
        status: "stripe_ach_pending",
        notes: `${notes}\nStripe Checkout Session: ${session.id}`,
      })
      .eq("id", data.id);

    return NextResponse.json({
      ok: true,
      paymentMethod: "ach",
      provider: "stripe",
      status: "stripe_ach_pending",
      sessionId: session.id,
      url: session.url,
      request: data,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "ACH checkout could not be started.";
    await supabase
      .from(MEMBER_REQUESTS_TABLE)
      .update({
        status: "stripe_checkout_error",
        notes: `${notes}\nStripe Checkout Error: ${message}`,
      })
      .eq("id", data.id);

    return NextResponse.json({ error: message }, { status: 502 });
  }
}

export async function GET() {
  return NextResponse.json({
    paymentMethod: "ach",
    provider: "stripe",
    configured: Boolean(stripe),
  });
}
