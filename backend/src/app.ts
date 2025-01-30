import { Server } from "@/presentation/Server";
import { envs } from "@/config/envs.plugin";
import { errorHandler } from "@/presentation/middlewares/ErrorHandler";
import { MainRouter } from "@/presentation/router/main.router";

const main = async (): Promise<void> => {
  const mainRouter = new MainRouter();
  const server = new Server(
    envs.SERVER_PORT,
    mainRouter.apiV1,
    "public",
    errorHandler,
  );

  server.start();
};

(async () => {
  await main();
})();
