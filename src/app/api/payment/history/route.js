import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Subscription from "@/models/Subscription";

import { getAuthUser } from "@/middleware/authMiddleware";

export async function GET() {
  try {
    await connectDB();

    const authUser =
      await getAuthUser();

    const payments =
      await Subscription.find({
        userId: authUser.id,
      }).sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      payments,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}