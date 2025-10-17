import { Request, Response } from "express";
import { StatusCodes as Codes } from "http-status-codes";
import { YouTubeAPI } from "../services/Youtube";
import { Favorite } from "../models/Favorite";
import { User } from "../models/User";

export class ViewFavoriteController {
  private youtube = new YouTubeAPI();

  public handle = async (req: Request, res: Response): Promise<Response> => {
    try {
      const username = (req as any).user?.username;
      if (!username) return res.status(Codes.UNAUTHORIZED).json({ error: "Usuário não autenticado" });

      const user = await User.findOne({ username });
      if (!user) return res.status(Codes.NOT_FOUND).json({ error: "Usuário não encontrado" });

      const favorites = await Favorite.find({ userId: user._id });

      if (favorites.length === 0) {
        return res.status(Codes.OK).json({ videos: [] });
      }

      const videoIds = favorites.map(fav => fav.videoId).join(",");

      const { videos } = await this.youtube.searchVideosByIds(videoIds);

      return res.status(Codes.OK).json({ videos });

    } catch (error: any) {
      console.error("[VIDEOS_API]: ERROR ON GETTING FAVORITES", error);
      return res.status(Codes.INTERNAL_SERVER_ERROR).json({ error: "Internal Server Error." });
    }
  };
}