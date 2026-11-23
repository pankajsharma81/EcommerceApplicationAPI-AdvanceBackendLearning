import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().trim().min(1, "Category name is required"),
  description: z.string().trim().optional(),
});

export const updateCategorySchema = z
  .object({
    name: z.string().trim().min(1, "Category name is required").optional(),
    description: z.string().trim().optional(),
  })
  .refine((data) => data.name !== undefined || data.description !== undefined, {
    message: "At least one field is required to update",
  });

export type createCategoryDto = z.infer<typeof createCategorySchema>;
export type updateCategoryDto = z.infer<typeof updateCategorySchema>;
