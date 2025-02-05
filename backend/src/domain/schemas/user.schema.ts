import { z } from "zod";

export const UserSchema = z.object({
  name: z.string().max(50, "Name must not exceed 50 characters"),
  email: z.string().email("Invalid email address"),
  username: z.string().max(50, "Username must not exceed 50 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/\d/, "Password must contain at least one number"),
});

export const LoginUserSchema = z.object({
  username: z.string().max(50, "Username must not exceed 50 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Za-z]/, "Password must contain at least one letter")
    .regex(/\d/, "Password must contain at least one number"),
});
