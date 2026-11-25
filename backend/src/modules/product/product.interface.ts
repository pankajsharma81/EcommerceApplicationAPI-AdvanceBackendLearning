import { Product } from "../../../generated/prisma/client.js";

export interface IProductRepository {
  findProductByName(name: string): Promise<Product | null>;
  createProduct(data: {
    userId: string;
    categoryId: string;
    name: string;
    description?: string;
    imageUrls: string[];
    price: number;
    stock: number;
  }): Promise<Product>;

  findProductByCategoryId(categoryId: string): Promise<Product[]>;
<<<<<<< HEAD

  findAllProducts(): Promise<Product[]>;

  findProductById(id: string): Promise<Product | null>;
  updateProduct(
    id: string,
    data: {
      categoryId?: string;
      name?: string;
      description?: string;
      stock?: number;
      price?: number;
      imageUrls?: string[];
    },
  ): Promise<Product>;
  
  getProductByIdAndSellerId(productId: string, sellerId: string): Promise<Product | null>
  deleteProduct(productId: string ): Promise<Product>

  toggleActiveProduct(productId: string, isActive: boolean): Promise<Product>

  findAllActiveProducts(): Promise<Product[]>

=======

  findAllProducts(): Promise<Product[]>;

  findProductById(id: string): Promise<Product | null>;
  updateProduct(
    id: string,
    data: {
      categoryId?: string;
      name?: string;
      description?: string;
      stock?: number;
      price?: number;
      imageUrls?: string[];
    },
  ): Promise<Product>;
>>>>>>> 141123c9afbf7144a4f94bc5f7421dfb09992283
}
