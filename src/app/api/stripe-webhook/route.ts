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

function noteValue(notes: string | null | undefined, label: string) {
  const line = String(notes || "")
    .split("\n")
    .find((item) => item.toLowerCase().startsWith(`${label.toLowerCase()}:`));

  return line ? line.slice(label.length + 1).trim() : "";
}

function memberRole(value: string) {
  return value.toLowerCase().includes("builder") ? "builder" : "investor";
}

async function resolveSponsorId(application: any) {
  const sponsor = noteValue(application?.notes, "Sponsor");
  if (!sponsor) return "lorenzo";

  const byEmail = sponsor.includes("@")
    ? await supabase.from("members").select("id").eq("email", sponsor).maybeSingle()
    : null;

  if (byEmail?.data?.id) return byEmail.data.id;

  const { data } = await supabase
    .from("members")
    .select("id")
    .ilike("name", `%${sponsor}%`)
    .limit(1)
    .maybeSingle();

  return data?.id || "lorenzo";
}

async function updateApplication(requestId: string | undefined, status: string, note: string) {
  if (!requestId) return null;

  const { data } = await supabase
    .from(MEMBER_REQUESTS_TABLE)
    .select("id,name,email,phone,interest_amount,notes")
    .eq("id", requestId)
    .single();

  const nextNotes = `${data?.notes || ""}\n${note}`.trim();

  await supabase
    .from(MEMBER_REQUESTS_TABLE)
    .update({ status, notes: nextNotes })
    .eq("id", requestId);

  return { ...data, notes: nextNotes };
}

async function activateMemberFromApplication(application: any) {
  if (!application?.email) return;

  const capitalCommitment = Number(application.interest_amount) || 0;
  const units = Number(noteValue(application.notes, "Units")) || Math.round(capitalCommitment / 100);
  const role = memberRole(noteValue(application.notes, "Role"));
  const location = noteValue(application.notes, "Address");
  const sponsorId = await resolveSponsorId(application);
  const memberRecord = {
    name: application.name,
    email: application.email,
    phone: application.phone || "",
    status: "active",
    role,
    units,
    invested_amount: capitalCommitment,
    location,
    referral_source: "Stripe ACH checkout",
    sponsor_id: sponsorId,
  };

  const { data: existing } = await supabase
    .from("members")
    .select("id")
    .eq("email", application.email)
    .maybeSingle();

  if (existing?.id) {
    await supabase
      .from("members")
      .update(memberRecord)
      .eq("id", existing.id);
    return;
  }

  await supabase
    .from("members")
    .insert([{ ...memberRecord, joined_date: new Date().toISOString() }]);
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
    const application = await updateApplication(paymentIntent.metadata?.request_id, "payment_confirmed", `Stripe ACH payment confirmed: ${paymentIntent.id}`);
    await activateMemberFromApplication(application);
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object;
    await updateApplication(paymentIntent.metadata?.request_id, "payment_failed", `Stripe ACH payment failed: ${paymentIntent.id}`);
  }

  return NextResponse.json({ received: true });
}
