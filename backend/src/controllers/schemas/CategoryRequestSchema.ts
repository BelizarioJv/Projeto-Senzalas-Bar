import { z } from "zod";

export const CategoryRequestSchema = z.object({
  name: z.string().min(1, "Name is required"),
});
