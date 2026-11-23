import { Product } from "../../../generated/prisma/client.js";

export interface IProductRepository {
  createProduct(data: {
    userId: string;
    categoryId: string;
    name: string;
    description?: string;
    imageUrls: string[];
    price: number;
    stock: number;
  }): Promise<Product>;

  findProductByName(name: string): Promise<Product | null>
}
