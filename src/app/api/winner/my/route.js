import { NextResponse } from "next/server";
import { cookies } from "next/headers";

import connectDB from "@/lib/db";
import Winner from "@/models/Winner";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  try {
    await connectDB();

    // Read token from cookie
    const cookieStore = await cookies();

    const token =
      cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Please login first",
        },
        {
          status: 401,
        }
      );
    }

    // Verify JWT
    const decoded =
      verifyToken(token);

    // Get only logged in user's winnings
    const winners =
      await Winner.find({
        userId: decoded.id,
      })
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
    console.log(error);

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