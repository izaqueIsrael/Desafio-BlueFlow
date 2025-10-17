import express, { Application } from "express";
import cors from "cors";
import routes from "../routes";
import { authMiddleware } from "../middleware/authMiddleware";

export class Server {
  private app: Application;

  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use(authMiddleware)
  }

  private routes(): void {
    this.app.use("/api", routes);
  }

  public getApp(): Application {
    return this.app;
  }
}
