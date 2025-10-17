import { Router } from "express";
import { LoginController } from "../controllers/LoginController";
import { RegisterController } from "../controllers/RegisterController";

const routes = Router();
const register = new RegisterController();
const login = new LoginController();

routes.post("/auth/register", register.handle);
routes.post("/auth/login", login.handle);

export default routes;
