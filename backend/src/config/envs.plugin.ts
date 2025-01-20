import "dotenv/config";
import * as env from "env-var";

export const envs = {
  ENVIRONMENT: env.get("ENVIRONMENT").required().asString(),
  SERVER_PORT: env.get("SERVER_PORT").required().asIntPositive(),
  AWS_ACCESS_KEY_ID: env.get("AWS_ACCESS_KEY_ID").required().asString(),
  AWS_SECRET_ACCESS_KEY: env.get("AWS_SECRET_ACCESS_KEY").required().asString(),
  AWS_REGION: env.get("AWS_REGION").required().asString(),
};
