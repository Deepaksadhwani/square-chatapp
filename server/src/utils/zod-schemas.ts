import { z } from "zod";

export const authValidationSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

