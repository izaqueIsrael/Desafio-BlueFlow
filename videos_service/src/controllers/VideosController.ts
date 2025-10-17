import { Request, Response } from "express";
import { StatusCodes as Codes } from "http-status-codes";
import { YouTubeAPI } from "../services/Youtube";

export class VideosController {
  private youtube = new YouTubeAPI();

  public handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const searchQuery = req.query.q?.toString().trim() || "League of Legends";
      const results = await this.youtube.searchVideos(searchQuery, 10);

      return res.status(Codes.OK).json(results);

    } catch (error: any) {
      console.error("[VIDEOS_API]: ERROR ON GETTING VIDEOS", error);
      return res.status(Codes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error." });
    }
  };
}