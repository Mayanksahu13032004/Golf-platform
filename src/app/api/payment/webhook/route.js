import { NextResponse } from "next/server";

import stripe from "@/lib/stripe";

import connectDB from "@/lib/db";
import { sendPaymentEmail } from "@/lib/sendPaymentEmail";
import Subscription from "@/models/Subscription";
import User from "@/models/User";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    console.log("========== WEBHOOK HIT ==========");

    await connectDB();

    const body = await request.text();

    const signature = request.headers.get("stripe-signature");

    console.log("Signature:", signature);

    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log("Event:", event.type);

    switch (event.type) {
      case "checkout.session.completed":
        console.log("Checkout Completed");
        await handleCheckout(event.data.object);
        break;

      default:
        console.log("Unhandled:", event.type);
    }

    return NextResponse.json({ received: true });

  } catch (error) {
    console.log("WEBHOOK ERROR");
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      }
    );
  }
}

async function handleCheckout(
  session
) {
  const userId =
    session.metadata.userId;

  const plan =
    session.metadata.plan;

  const charityPercentage =
    Number(
      session.metadata
        .charityPercentage
    );

  const amount =
    session.amount_total / 100;

  const paymentIntent =
    session.payment_intent;

  const alreadyPaid =
    await Subscription.findOne({
      paymentIntent,
    });

  if (alreadyPaid) {
    console.log(
      "Already Processed"
    );

    return;
  }

  const charityContribution =
    (amount *
      charityPercentage) /
    100;

  const prizePoolContribution =
    (amount -
      charityContribution) *
    0.5;

  const startDate =
    new Date();

  const endDate =
    new Date();

  if (plan === "MONTHLY") {
    endDate.setMonth(
      endDate.getMonth() + 1
    );
  } else {
    endDate.setFullYear(
      endDate.getFullYear() + 1
    );
  }

  await Subscription.create({
    userId,

    plan,

    amount,

    charityPercentage,

    charityContribution,

    prizePoolContribution,

    paymentIntent,

    startDate,

    endDate,

    status: "ACTIVE",
  });

  if (!userId) {
  console.log("❌ userId missing in metadata");
  return;
}

console.log("Metadata:", session.metadata);

const user = await User.findById(userId);

console.log("User:", user);

try {
  await sendPaymentEmail({
    name: user.name,
    email: user.email,
    plan,
    amount,
    charityContribution,
    prizePoolContribution,
    paymentIntent,
    startDate,
    endDate,
  });

  console.log("✅ Payment Email Sent Successfully");
} catch (error) {
  console.log("❌ Payment Email Error");
  console.log(error);
}
  await User.findByIdAndUpdate(
    userId,
    {
      isSubscribed: true,

      subscriptionType: plan,

      charityPercentage,
    }
  );

  console.log(
    "Subscription Created Successfully"
  );
}