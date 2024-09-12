import { z } from "zod";

export const authValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const updateProfileSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  color: z.number(),
});
