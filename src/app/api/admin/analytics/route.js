
import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import Subscription from "@/models/Subscription";

import { adminAuth } from "@/middleware/adminMiddleware";

export async function GET() {
  try {
    await adminAuth();

    await connectDB();

    const subscriptions =
      await Subscription.find();

    const totalRevenue =
      subscriptions.reduce(
        (sum, sub) =>
          sum + (sub.amount || 0),
        0
      );

    const totalCharity =
      subscriptions.reduce(
        (sum, sub) =>
          sum +
          (sub.charityContribution ||
            0),
        0
      );

    const totalPrizePool =
      subscriptions.reduce(
        (sum, sub) =>
          sum +
          (sub.prizePoolContribution ||
            0),
        0
      );

    return NextResponse.json({
      success: true,

      analytics: {
        totalRevenue,

        totalCharity,

        totalPrizePool,
      },
    });
  } catch (error) {
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

