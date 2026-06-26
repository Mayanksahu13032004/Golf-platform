import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import User from "@/models/User";
import { getAuthUser } from "@/middleware/authMiddleware";

export async function GET() {
  try {
    await connectDB();

    const authUser = await getAuthUser();

    const user = await User.findById(authUser.id).select("-password");

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

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 401,
      }
    );
  }
}

export async function PUT(request) {
  try {
    await connectDB();

    const authUser = await getAuthUser();

    const {
      name,
      email,
      profileImage,
    } = await request.json();

    const user = await User.findById(authUser.id);

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

    user.name = name;
    user.email = email;
    user.profileImage =
      profileImage || "";

    await user.save();

    const updatedUser =
      await User.findById(user._id).select(
        "-password"
      );

    return NextResponse.json({
      success: true,
      message:
        "Profile Updated Successfully",
      user: updatedUser,
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