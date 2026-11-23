import { Product } from "../../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import { IProductRepository } from "./product.interface.js";

export class ProductRepository implements IProductRepository {
  async createProduct(data: {
    userId: string;
    categoryId: string;
    name: string;
    description?: string;
    imageUrls: string[];
    price: number;
    stock: number;
  }): Promise<Product> {
    const newProduct = await prisma.product.create({
      data,
    });
    return newProduct;
  }

  async findProductByName(name: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where: {
        name,
      },
    });
    return product;
  }

  async findProductByCategoryId(categoryId: string): Promise<Product[]> {
    const product = await prisma.product.findMany({
      where:{
        categoryId
      },
      orderBy:{
        createdAt: "desc"
      }
    })
    return product;
  }
}
