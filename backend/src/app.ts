import { Server } from "./presentation/Server";
import { envs } from "./config/envs.plugin";
import { errorHandler } from "./middlewares/ErrorHandler";
import { MainRouter } from "./routes/mainRouter";

const main = async (): Promise<void> => {
  const server = new Server(
    envs.SERVER_PORT,
    MainRouter,
    "public",
    errorHandler,
  );

  server.start();
};

(async () => {
  await main();
})();
