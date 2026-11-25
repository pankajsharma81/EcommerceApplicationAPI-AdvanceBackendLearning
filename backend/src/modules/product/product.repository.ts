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
      where: {
        categoryId,
<<<<<<< HEAD
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return product;
  }

  async findAllProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return products;
  }

  async findProductById(id: string): Promise<Product | null> {
    return await prisma.product.findUnique({
      where: {
        id,
      },
    });
  }

  async updateProduct(
    id: string,
    data: {
      categoryId?: string;
      name?: string;
      description?: string;
      stock?: number;
      price?: number;
      imageUrls?: string[];
    },
  ): Promise<Product> {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data,
    });
    return product;
  }

  async getProductByIdAndSellerId(productId: string, userId: string): Promise<Product | null> {
    const product = await prisma.product.findFirst({
      where:{
        id: productId,
        userId,
      }
    })
    return product;
  }

  async deleteProduct(productId: string): Promise<Product> {
    const product = await prisma.product.delete({
      where:{
        id: productId
      }
    })
    return product
  }

  async toggleActiveProduct(productId: string, isActive: boolean): Promise<Product> {
    const product = await prisma.product.update({
      where:{
        id: productId
      },
      data: {
        isActive
      }
    })
    return product;
  }

  async findAllActiveProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        isActive: true
      },
      orderBy:{
        createdAt: "desc"
      }
    })
    return products;
=======
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return product;
>>>>>>> 141123c9afbf7144a4f94bc5f7421dfb09992283
  }

  async findAllProducts(): Promise<Product[]> {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return products;
  }

  async findProductById(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id,
      },
    });
    return product;
  }

  async updateProduct(
    id: string,
    data: {
      categoryId?: string;
      name?: string;
      description?: string;
      stock?: number;
      price?: number;
      imageUrls?: string[];
    },
  ): Promise<Product> {
    const product = await prisma.product.update({
      where: {
        id,
      },
      data,
    });
    return product
  }
}
