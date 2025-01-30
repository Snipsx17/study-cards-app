import { Router } from "express";
import { authRouter } from "@/presentation/router/auth/routes/auth.router";

export class MainRouter {
  private Router = Router();

  public get apiV1(): Router {
    const authRoutes = new authRouter();

    this.Router.use("/api/v1/auth", authRoutes.routes);

    return this.Router;
  }
}
