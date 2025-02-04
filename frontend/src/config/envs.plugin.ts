// import "dotenv/config";
import { z } from "zod";

const Config = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().nonempty(),
});

const rawEnv = {
  NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
};

export const envs = Config.parse(rawEnv);
