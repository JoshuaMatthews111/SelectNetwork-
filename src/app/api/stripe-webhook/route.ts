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

async function updateApplication(requestId: string | undefined, status: string, note: string) {
  if (!requestId) return;

  const { data } = await supabase
    .from(MEMBER_REQUESTS_TABLE)
    .select("notes")
    .eq("id", requestId)
    .single();

  const nextNotes = `${data?.notes || ""}\n${note}`.trim();

  await supabase
    .from(MEMBER_REQUESTS_TABLE)
    .update({ status, notes: nextNotes })
    .eq("id", requestId);
}

export async function POST(req: NextRequest) {
  if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Stripe webhook is not configured." }, { status: 503 });
  }

  const payload = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing Stripe signature." }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Invalid Stripe webhook signature.";
    return NextResponse.json({ error: message }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    await updateApplication(session.metadata?.request_id, "stripe_checkout_completed", `Stripe checkout completed: ${session.id}`);
  }

  if (event.type === "payment_intent.processing") {
    const paymentIntent = event.data.object;
    await updateApplication(paymentIntent.metadata?.request_id, "stripe_ach_processing", `Stripe ACH processing: ${paymentIntent.id}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    await updateApplication(paymentIntent.metadata?.request_id, "payment_confirmed", `Stripe ACH payment confirmed: ${paymentIntent.id}`);
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    await updateApplication(paymentIntent.metadata?.request_id, "payment_failed", `Stripe ACH payment failed: ${paymentIntent.id}`);
  }

  return NextResponse.json({ received: true });
}
