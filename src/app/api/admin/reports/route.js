import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import User from "@/models/User";
import Subscription from "@/models/Subscription";
import Charity from "@/models/Charity";
import Winner from "@/models/Winner";

import { adminAuth } from "@/middleware/adminMiddleware";

export async function GET() {
  try {
    await adminAuth();

    await connectDB();

    const totalUsers =
      await User.countDocuments();

    const activeSubscribers =
      await Subscription.countDocuments({
        status: "ACTIVE",
      });

    const subscriptions =
      await Subscription.find({
        status: "ACTIVE",
      });

    const totalPrizePool =
      subscriptions.reduce(
        (sum, sub) =>
          sum +
          sub.prizePoolContribution,
        0
      );

    const totalCharityContribution =
      subscriptions.reduce(
        (sum, sub) =>
          sum +
          sub.charityContribution,
        0
      );

    const totalWinners =
      await Winner.countDocuments();

    const totalCharities =
      await Charity.countDocuments();

    return NextResponse.json({
      success: true,

      report: {
        totalUsers,

        activeSubscribers,

        totalPrizePool,

        totalCharityContribution,

        totalWinners,

        totalCharities,
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