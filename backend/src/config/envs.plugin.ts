import "dotenv/config";
import * as env from "env-var";

export const envs = {
  ENVIRONMENT: env.get("ENVIRONMENT").required().asString(),
  SERVER_PORT: env.get("SERVER_PORT").required().asIntPositive(),
};
