import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Charity from "@/models/Charity";
import { adminAuth } from "@/middleware/adminMiddleware";
export async function GET(request, { params }) {
  try {
        await adminAuth();
    await connectDB();

    const { id } = await params;

    console.log("ID:", id);

    const charity = await Charity.findById(id);

    if (!charity) {
      return NextResponse.json(
        {
          success: false,
          message: "Charity not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      charity,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}
export async function PUT(request, { params }) {
  try {
      await adminAuth();
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const charity = await Charity.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      charity,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
       await adminAuth();
    await connectDB();

    const { id } = await params;

    await Charity.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
      message: "Charity deleted",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}