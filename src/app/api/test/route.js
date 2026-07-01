import dns from "node:dns";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {

  try {

    console.log("Before", dns.getServers());

    dns.setServers(["8.8.8.8","8.8.4.4"]);

    console.log("After", dns.getServers());

    await mongoose.connect(process.env.MONGODB_URI);

    return NextResponse.json({
      success:true
    });

  } catch(err){

    console.log(err);

    return NextResponse.json({
      success:false,
      error:err.message
    });

  }

}