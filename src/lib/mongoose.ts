import mongoose from "mongoose";

export const runtime = "nodejs";

const MONGODB_URI = process.env.MONGODB_URI || "";

async function dbConnect() {
  try {
    if (mongoose.connection.readyState >= 1) {
      return;
    }

    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }

    const opts = {
      bufferCommands: false,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    await mongoose.connect(process.env.MONGODB_URI, opts);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
}

export default dbConnect;
