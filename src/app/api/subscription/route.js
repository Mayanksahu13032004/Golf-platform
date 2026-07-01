import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { getAuthUser } from "@/middleware/authMiddleware";

export async function POST(request) {
  try {
    await connectDB();

    const authUser = await getAuthUser();

    const body = await request.json();

    const plan = body.plan || "MONTHLY";

    const charityPercentage = Number(
      body.charityPercentage ?? 10
    );

    // Validation

    if (!["MONTHLY", "YEARLY"].includes(plan)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid subscription plan",
        },
        {
          status: 400,
        }
      );
    }

    if (
      isNaN(charityPercentage) ||
      charityPercentage < 0 ||
      charityPercentage > 100
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid charity percentage",
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

    const charityContribution =
      (amount * charityPercentage) / 100;

    const prizePoolContribution =
      (amount - charityContribution) * 0.5;

    const startDate = new Date();

    const endDate = new Date();

    if (plan === "MONTHLY") {
      endDate.setMonth(
        endDate.getMonth() + 1
      );
    } else {
      endDate.setFullYear(
        endDate.getFullYear() + 1
      );
    }

    // Optional: prevent duplicate active subscriptions

    const existing =
      await Subscription.findOne({
        userId: authUser.id,
        status: "ACTIVE",
      });

    if (existing) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Active subscription already exists",
        },
        {
          status: 400,
        }
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

        status: "ACTIVE",
      });

    await User.findByIdAndUpdate(
      authUser.id,
      {
        isSubscribed: true,
        subscriptionType: plan,
        charityPercentage,
      }
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Subscription Created Successfully",
        subscription,
      },
      {
        status: 201,
      }
    );
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
      {
        status: 500,
      }
    );
  }
}