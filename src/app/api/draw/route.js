import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Draw from "@/models/Draw";

export async function GET() {
  try {
    await connectDB();

    const draws =
      await Draw.find().sort({
        createdAt: -1,
      });

    return NextResponse.json({
      success: true,
      draws,
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