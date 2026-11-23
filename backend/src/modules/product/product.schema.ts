import { z } from "zod";

export const createProductSchema = z.object({
  categoryId: z.string().uuid("Invalid category ID"),
  name: z.string().trim().min(1, "Product name is required").max(100),
  description: z.string().trim().optional(),
  price: z.coerce.number().positive("Price must be greater than 0"),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
});

export type createProductDto = z.infer<typeof createProductSchema>