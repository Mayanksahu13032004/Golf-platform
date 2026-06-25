
import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import User from "@/models/User";
import Charity from "@/models/Charity";
import Winner from "@/models/Winner";
import Subscription from "@/models/Subscription";

import { adminAuth } from "@/middleware/adminMiddleware";

export async function GET() {
  try {
    await adminAuth();

    await connectDB();

    const totalUsers =
      await User.countDocuments();

    const totalCharities =
      await Charity.countDocuments();

    const totalWinners =
      await Winner.countDocuments();

    const activeSubscriptions =
      await Subscription.countDocuments({
        status: "ACTIVE",
      });

    return NextResponse.json({
      success: true,

      totalUsers,

      totalCharities,

      totalWinners,

      activeSubscriptions,
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

