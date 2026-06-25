import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is missing in .env.local");
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null,
  };
}

async function connectDB() {
  try {
    if (cached.conn) {
      console.log("Using existing MongoDB connection");
      return cached.conn;
    }

    if (!cached.promise) {
      console.log("Connecting to MongoDB...");

      cached.promise = mongoose.connect(MONGODB_URI, {
        dbName: "golf-charity",
      });
    }

    cached.conn = await cached.promise;

    console.log("MongoDB Connected Successfully");

    return cached.conn;
  } catch (error) {
    console.error("MongoDB Connection Error:");
    console.error(error);

    throw error;
  }
}

export default connectDB;