
import { NextResponse } from "next/server";

import connectDB from "@/lib/db";

import Score from "@/models/Score";
import Winner from "@/models/Winner";
import Subscription from "@/models/Subscription";

import { getAuthUser } from "@/middleware/authMiddleware";

export async function GET() {
  try {
    await connectDB();

    const user = await getAuthUser();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const scores = await Score.find({
      userId: user._id,
    }).sort({
      scoreDate: -1,
    });

    const subscription =
      await Subscription.findOne({
        userId: user._id,
      }).sort({
        createdAt: -1,
      });

    const winnings =
      await Winner.find({
        userId: user._id,
      }).sort({
        createdAt: -1,
      });

    const totalWon =
      winnings.reduce(
        (sum, item) =>
          sum + item.amount,
        0
      );

    return NextResponse.json({
      success: true,

      subscription,

      scores,

      winnings,

      totalWon,
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

