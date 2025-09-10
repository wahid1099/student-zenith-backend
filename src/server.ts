import mongoose from "mongoose";
import app from "./app";
import config from "./config/index";

// Serverless-friendly Mongoose connection
let cached: any = (global as any).mongoose;
if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    console.log("Connecting to MongoDB...");
    const opts = {
      bufferCommands: false, // prevent buffering in serverless
      serverSelectionTimeoutMS: 30000, // 30s
    };
    cached.promise = mongoose
      .connect(config.db_url as string, opts)
      .then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

async function main() {
  try {
    await dbConnect();

    // Set up Mongoose event listeners
    mongoose.connection.on("connected", () => {
      console.log("✅ Database connected successfully");
      console.log("DB URL loaded?", !!config.db_url);
      console.log("DB_URL env var:", process.env.DB_URL);
    });

    mongoose.connection.on("error", (err) => {
      console.log("❌ Database connection error:", err);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("⚠️ Database disconnected");
    });

    app.listen(config.port, () => {
      console.log(`🚀 App is listening on port ${config.port}`);
    });
  } catch (err) {
    console.log("❌ Database connection failed:", err);
  }
}

main();
