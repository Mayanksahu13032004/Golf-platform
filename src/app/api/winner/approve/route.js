import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Winner from "@/models/Winner";

import { adminAuth } from "@/middleware/adminMiddleware";

export async function PUT(request) {
  try {
    await adminAuth();

    await connectDB();

    const { winnerId } =
      await request.json();

    const winner =
      await Winner.findById(
        winnerId
      );

    if (!winner) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Winner not found",
        },
        {
          status: 404,
        }
      );
    }

    winner.status =
      "APPROVED";

    winner.verifiedAt =
      new Date();

    await winner.save();

    return NextResponse.json({
      success: true,
      message:
        "Winner approved",
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