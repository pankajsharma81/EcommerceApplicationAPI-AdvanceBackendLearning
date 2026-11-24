import { z } from "zod";

export const createProductSchema = z.object({
  categoryId: z.string().uuid("Invalid category ID"),
  name: z.string().trim().min(1, "Product name is required").max(100),
  description: z.string().trim().optional(),
  price: z.coerce.number().positive("Price must be greater than 0"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
});

export const updateProductSchema = z.object({
  categoryId: z.string().uuid("Invalid Category Id").optional(),
  name: z.string().trim().min(1,"Product name is required").max(100).optional(),
  description: z.string().trim().optional(),
  price: z.coerce.number().positive("Price must be greater than 0").optional(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative").optional()
})

export type createProductDto = z.infer<typeof createProductSchema>
export type updateProductDto = z.infer<typeof updateProductSchema>