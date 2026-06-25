import { NextResponse } from "next/server";
import { adminAuth } from "@/middleware/adminMiddleware";
import connectDB from "@/lib/db";
import Charity from "@/models/Charity";

export async function POST(request) {
  try {
    await adminAuth();
    await connectDB();

    const body = await request.json();

    const charity = await Charity.create(body);

    return NextResponse.json(
      {
        success: true,
        charity,
      },
      {
        status: 201,
      }
    );
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

export async function GET() {
  try {
    await connectDB();

    const charities = await Charity.find().sort({
      createdAt: -1,
    });

    return NextResponse.json({
      success: true,
      charities,
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