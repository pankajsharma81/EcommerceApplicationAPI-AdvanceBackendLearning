import { AppError } from "../../utils/app-error.js";
import { uploadToCloudinary } from "../../utils/cloudinary.helper.js";

import { ICategoryRepository } from "../category/category.interface.js";
import { IProductRepository } from "./product.interface.js";
import { mapProductResponse } from "./product.mapper.js";
import { createProductDto } from "./product.schema.js";

export class ProductService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async createProduct(body: createProductDto, userId: string, images: Buffer[]) {
    const { name, description, price, stock, categoryId } = body;

    if(!images || images.length === 0){
      throw new AppError("At least one product image is required", 400);
    }

    const existingProduct =
      await this.productRepository.findProductByName(name);

    if (existingProduct) {
      throw new AppError("Product already exists", 409);
    }

    const existingCategory =
      await this.categoryRepository.findCategoryById(categoryId);

    if (!existingCategory) {
      throw new AppError("Category not found", 404);
    }


    const imageUrls: string[] = await Promise.all(
      images.map((image) =>uploadToCloudinary(image))
    )

    const newProduct = await this.productRepository.createProduct({
      userId,
      categoryId,
      name,
      description,
      imageUrls,
      price,
      stock,
    });

    return {
      product: mapProductResponse(newProduct),
    };
  }
}
