import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
  description: z.string().trim().optional(),
});

export type createCategoryDto = z.infer<typeof createCategorySchema>;
