import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Score from "@/models/Score";

export async function PUT(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    const body =
      await request.json();

    const score =
      await Score.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
        }
      );

    return NextResponse.json({
      success: true,
      score,
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



export async function DELETE(
  request,
  { params }
) {
  try {
    await connectDB();

    const { id } = await params;

    await Score.findByIdAndDelete(
      id
    );

    return NextResponse.json({
      success: true,
      message:
        "Score deleted successfully",
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