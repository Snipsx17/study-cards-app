import "dotenv/config";
import * as env from "env-var";

export const envs = {
  ENVIRONMENT: env.get("ENVIRONMENT").required().asString(),
  SERVER_PORT: env.get("SERVER_PORT").required().asIntPositive(),
  AWS_ACCESS_KEY_ID: env.get("AWS_ACCESS_KEY_ID").required().asString(),
  AWS_SECRET_ACCESS_KEY: env.get("AWS_SECRET_ACCESS_KEY").required().asString(),
  AWS_REGION: env.get("AWS_REGION").required().asString(),
  POSTGRES_USER: env.get("POSTGRES_USER").required().asString(),
  POSTGRES_PASSWORD: env.get("POSTGRES_PASSWORD").required().asString(),
  POSTGRES_DB: env.get("POSTGRES_DB").required().asString(),
  DATABASE_URL: env.get("DATABASE_URL").required().asString(),
  DEFAULT_AVATAR_IMG: env.get("DEFAULT_AVATAR_IMG").required().asString(),
};
