import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Winner from "@/models/Winner";

import { getAuthUser } from "@/middleware/authMiddleware";

export async function POST(request) {
  try {
    await connectDB();

    const authUser =
      await getAuthUser();

    const {
      winnerId,
      proofImage,
    } = await request.json();

    const winner =
      await Winner.findOne({
        _id: winnerId,
        userId: authUser.id,
      });

    if (!winner) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Winner record not found",
        },
        {
          status: 404,
        }
      );
    }

    winner.proofImage =
      proofImage;

    await winner.save();

    return NextResponse.json({
      success: true,
      message:
        "Proof uploaded successfully",
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