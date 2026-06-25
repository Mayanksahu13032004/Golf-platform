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

    if (
      winner.status !==
      "APPROVED"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Winner must be approved first",
        },
        {
          status: 400,
        }
      );
    }

    winner.status =
      "PAID";

    winner.paidAt =
      new Date();

    await winner.save();

    return NextResponse.json({
      success: true,
      message:
        "Payment marked successfully",
      winner,
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