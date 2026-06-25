import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import { getAuthUser } from "@/middleware/authMiddleware";

export async function GET() {
  try {
    await connectDB();

    const authUser =
      await getAuthUser();

    const user = await User.findById(
      authUser.id
    ).select("-password");

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 401 }
    );
  }
}