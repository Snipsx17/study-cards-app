import { Router } from "express";
import { AuthRouter } from "@/presentation/router/auth/routes/auth.router";
import { GroupRouter } from "./group/router/group.router";

export class MainRouter {
  private Router = Router();

  public get apiV1(): Router {
    const authRoutes = new AuthRouter();
    const groupRoutes = new GroupRouter();

    this.Router.use("/api/v1/auth", authRoutes.routes);
    this.Router.use("/api/v1/group", groupRoutes.routes);

    return this.Router;
  }
}
