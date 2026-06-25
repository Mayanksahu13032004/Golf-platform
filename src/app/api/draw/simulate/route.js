import { NextResponse } from "next/server";

import connectDB from "@/lib/db";
import Draw from "@/models/Draw";
import { adminAuth } from "@/middleware/adminMiddleware";

export async function POST() {
  try {
    await adminAuth();

    await connectDB();

    // const numbers = [];
    const numbers = [
  10,
  20,
  30,
  40,
  45,
];

    while (numbers.length < 5) {
      const random =
        Math.floor(
          Math.random() * 45
        ) + 1;

      if (
        !numbers.includes(random)
      ) {
        numbers.push(random);
      }
    }

    const draw =
      await Draw.create({
        month: new Date()
          .toLocaleString("default", {
            month: "long",
          }),
        year:
          new Date().getFullYear(),
        winningNumbers: numbers,
        status: "SIMULATED",
      });

    return NextResponse.json({
      success: true,
      draw,
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