import mongoose from "mongoose";
import { env } from "./env";

export async function connectDatabase(): Promise<void> {
  if (!env.MONGO_URI) {
    console.warn("[AUTH_API] No MongoDB URI configured.");
    return;
  }

  try {
    await mongoose.connect(env.MONGO_URI);
    console.log("[MONGODB] Connected.");
  } catch (error) {
    console.error("[MONGODB] Connection Failed.", error);
  }
}
