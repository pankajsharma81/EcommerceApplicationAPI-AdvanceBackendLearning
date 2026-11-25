import { Product } from "../../../generated/prisma/client.js";
import { ProductResponse } from "./product.response.js";

export const mapProductResponse = (product: Product): ProductResponse => {
  return {
    id: product.id,
    userId: product.userId,
    categoryId: product.categoryId,
    name: product.name,
    description: product.description,
    imageUrls: product.imageUrls,
    price: Number(product.price),
    stock: product.stock,
    rating: product.rating,
    isActive: product.isActive,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
};
