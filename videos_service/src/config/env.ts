import { config } from "dotenv";

config();

export const env = {
  PORT: process.env.VIDEOS_API_PORT || 3001,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/",
  RABBIT_URI: process.env.RABBIT_URI || "amqp://rabbitmq:5672/",
  YOUTUBE_API_KEY: process.env.YOUTUBE_API_KEY || "",
  JWT_SECRET: process.env.JWT_SECRET || ""
};
