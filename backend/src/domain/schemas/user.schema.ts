import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().max(50),
  email: z.string().email(),
  username: z.string().max(50),
  password: z.string().max(50),
  avatarUrl: z.string().url(),
});
