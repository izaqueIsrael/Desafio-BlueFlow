import { Router } from "express";
import { VideosController } from "../controllers/VideosController";
import { SendFavoriteController } from "../controllers/SendFavoriteController";
import { ViewFavoriteController } from "../controllers/ViewFavoriteController";

const routes = Router();
const videos = new VideosController();
const favorite = new SendFavoriteController();
const viewFavorite = new ViewFavoriteController();

routes.get("/videos", videos.handle);
routes.post("/videos", favorite.handle);
routes.get("/favorites", viewFavorite.handle);

export default routes;
