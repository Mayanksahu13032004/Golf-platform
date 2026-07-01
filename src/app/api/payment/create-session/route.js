import { NextResponse } from "next/server";

import stripe from "@/lib/stripe";
import { getAuthUser } from "@/middleware/authMiddleware";

export async function POST(request) {
  try {
    const authUser = await getAuthUser();

    const body = await request.json();

 const { plan } = body;

const charityPercentage = 10;

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          message: "Plan is required",
        },
        {
          status: 400,
        }
      );
    }

    const amount =
      plan === "YEARLY"
        ? 5000
        : 500;

    const session =
      await stripe.checkout.sessions.create({
        payment_method_types: [
          "card",
        ],

        mode: "payment",

        customer_email:
          authUser.email,

    metadata: {
    userId: authUser.id,
    email: authUser.email,
    plan,
    charityPercentage: String(charityPercentage),
},
        line_items: [
          {
            price_data: {
              currency: "inr",

              product_data: {
                name:
                  plan === "YEARLY"
                    ? "Yearly Membership"
                    : "Monthly Membership",
              },

              unit_amount:
                amount * 100,
            },

            quantity: 1,
          },
        ],

        success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,

        cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
      });

    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}