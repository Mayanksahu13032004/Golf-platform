import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import connectDB from "@/lib/db";
import User from "@/models/User";
import { sendWelcomeEmail } from "@/lib/sendWelcomeEmail";

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, password } = body;

    // 1. Basic empty fields check
    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required",
        },
        {
          status: 400,
        }
      );
    }

    // 2. Strict Gmail Validation
    // const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    // if (!gmailRegex.test(email)) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Please provide a valid @gmail.com email address",
    //     },
    //     {
    //       status: 400,
    //     }
    //   );
    // }

    // 3. Password Validation (Min 8 chars, 1 Uppercase, 1 Number, 1 Special Char)
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character.",
        },
        {
          status: 400,
        }
      );
    }

    // 4. Check for existing user
    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Email already exists",
        },
        {
          status: 400,
        }
      );
    }

    // 5. Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
await sendWelcomeEmail({
  name: user.name,
  email: user.email,
});


    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("REGISTER ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        fullError: String(error),
      },
      {
        status: 500,
      }
    );
  }
}