import Stripe from "stripe";

const secretKey = process.env.STRIPE_SECRET_KEY;

if (!secretKey && process.env.NODE_ENV !== "test") {
  console.warn("STRIPE_SECRET_KEY is not configured.");
}

export const stripe = secretKey
  ? new Stripe(secretKey, {
      apiVersion: "2025-02-24.acacia",
      typescript: true,
    })
  : null;
