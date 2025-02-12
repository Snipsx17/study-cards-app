import { z } from "zod";

export const GroupSchema = z.object({
  groupName: z
    .string()
    .min(2, "Group name must have at least 2 characters")
    .max(100, "Group name must not exceed 100 characters"),
});
