import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Score from "@/models/Score";
import { getAuthUser } from "@/middleware/authMiddleware";

export async function POST(request) {
  try {
    await connectDB();

    const authUser =
      await getAuthUser();

    const { score, scoreDate } =
      await request.json();

    if (score < 1 || score > 45) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Score must be between 1 and 45",
        },
        {
          status: 400,
        }
      );
    }

    const existingScore =
      await Score.findOne({
        userId: authUser.id,
        scoreDate,
      });

    if (existingScore) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Score already exists for this date",
        },
        {
          status: 400,
        }
      );
    }

    const totalScores =
      await Score.countDocuments({
        userId: authUser.id,
      });

    if (totalScores >= 5) {
      const oldestScore =
        await Score.findOne({
          userId: authUser.id,
        }).sort({
          scoreDate: 1,
        });

      await Score.findByIdAndDelete(
        oldestScore._id
      );
    }

    const newScore =
      await Score.create({
        userId: authUser.id,
        score,
        scoreDate,
      });

    return NextResponse.json(
      {
        success: true,
        score: newScore,
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

    const scores =
      await Score.find({
        userId: authUser.id,
      }).sort({
        scoreDate: -1,
      });

    return NextResponse.json({
      success: true,
      scores,
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