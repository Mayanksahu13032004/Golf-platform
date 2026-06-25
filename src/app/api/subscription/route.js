import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { getAuthUser } from "@/middleware/authMiddleware";

export async function POST(request) {
  try {
    await connectDB();

    const authUser =
      await getAuthUser();

    const {
      plan,
      charityPercentage,
    } = await request.json();

    const amount =
      plan === "YEARLY"
        ? 5000
        : 500;

    const charityContribution =
      (amount *
        charityPercentage) /
      100;

    const prizePoolContribution =
      (amount -
        charityContribution) *
      0.5;

    const startDate = new Date();

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

    const subscription =
      await Subscription.create({
        userId: authUser.id,
        plan,
        amount,
        charityPercentage,
        charityContribution,
        prizePoolContribution,
        startDate,
        endDate,
      });

    await User.findByIdAndUpdate(
      authUser.id,
      {
        isSubscribed: true,
        subscriptionType: plan,
      }
    );

    return NextResponse.json(
      {
        success: true,
        subscription,
      },
      {
        status: 201,
      }
    );
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


export async function GET() {
  try {
    await connectDB();

    const authUser =
      await getAuthUser();

    const subscription =
      await Subscription.findOne({
        userId: authUser.id,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      subscription,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}