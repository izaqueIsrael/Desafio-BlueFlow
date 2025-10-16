import { config } from "dotenv";

config();

export const env = {
  PORT: process.env.API_PORT || 3000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/",
  JWT_SECRET: process.env.JWT_SECRET || "",
};
