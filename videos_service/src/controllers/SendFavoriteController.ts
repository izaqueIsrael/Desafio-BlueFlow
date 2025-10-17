import { Request, Response } from "express";
import { StatusCodes as Codes } from "http-status-codes";
import { YouTubeAPI } from "../services/Youtube";
import { Favorite } from "../models/Favorite";
import RabbitMQ from "../config/rabbitmq";
import { User } from "../models/User";

const rabbit = new RabbitMQ();

export class SendFavoriteController {

  public handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const videoId = req.body.videoId?.toString();
      const username = (req as any).user?.username;

      const userId = (await User.findOne({ username }))?._id;

      if (!videoId) {
        return res.status(Codes.BAD_REQUEST).json({ message: "videoId required." });
      }

      await rabbit.connect();
      const channel = rabbit.getChannel();
      await channel.assertQueue("favorites", { durable: true });
      channel.sendToQueue(
        "favorites",
        Buffer.from(JSON.stringify({ userId, videoId })),
        { persistent: true }
      );

      return res.status(Codes.CREATED).json({ message: "Video favorited successfully" });

    } catch (error: any) {
      console.error("[VIDEOS_API]: ERROR ON ADD FAVORITE", error);
      return res.status(Codes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error." });
    }
  };
}