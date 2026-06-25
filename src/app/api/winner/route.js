import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Winner from "@/models/Winner";

export async function GET() {
  try {
    await connectDB();

    const winners =
      await Winner.find()
        .populate(
          "userId",
          "name email"
        )
        .sort({
          createdAt: -1,
        });

    return NextResponse.json({
      success: true,
      winners,
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