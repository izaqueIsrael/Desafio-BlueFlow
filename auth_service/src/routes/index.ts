import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const routes = Router();
const authController = new AuthController();

routes.get("/auth/:action", authController.handle);

export default routes;
