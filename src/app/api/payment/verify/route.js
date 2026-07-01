export const runtime = "nodejs";

import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Subscription from "@/models/Subscription";
import User from "@/models/User";
import { getAuthUser } from "@/middleware/authMiddleware";

export async function GET() {
  try {
    console.log("Verify API Called");

    await connectDB();

    console.log("DB Connected");

    const authUser = await getAuthUser();

    console.log("Auth User:", authUser);

    if (!authUser) {
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

    const user = await User.findById(authUser.id);

    console.log("User:", user);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        {
          status: 404,
        }
      );
    }

    const subscription = await Subscription.findOne({
      userId: user._id,
    }).sort({
      createdAt: -1,
    });

    console.log("Subscription:", subscription);

    if (!subscription) {
      return NextResponse.json(
        {
          success: false,
          message: "Subscription not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      subscription,
      user,
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