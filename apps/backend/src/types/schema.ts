import z from "zod";

export const createUserSchema = z.object({
  userId: z.string(),
  initialBalance: z.number().min(0),
});
