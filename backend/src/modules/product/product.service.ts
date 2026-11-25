import { AppError } from "../../utils/app-error.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../../utils/cloudinary.helper.js";

import { ICategoryRepository } from "../category/category.interface.js";
import { IProductRepository } from "./product.interface.js";
import { mapProductResponse } from "./product.mapper.js";
import { createProductDto, updateProductDto } from "./product.schema.js";

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

  async getProductsByCategoryId(categoryId: string){

    const existingCategory = await this.categoryRepository.findCategoryById(categoryId);

    if(!existingCategory){
      throw new AppError("Category not found", 404)
    }

    const products = await this.productRepository.findProductByCategoryId(categoryId);

    return {
      products: products.map(mapProductResponse)
    }
  }

  async getAllProducts(){
    const products = await this.productRepository.findAllProducts();

    return {
      products: products.map(mapProductResponse)
    }
  }

  async updateProduct(productId: string, body: updateProductDto, userId: string, images: Buffer[]){
    const {name, description, price, stock, categoryId} = body;

    const existingProduct = await this.productRepository.getProductByIdAndSellerId(productId, userId)

    if(!existingProduct){
      throw new AppError("Product not found or you are not allowed to update it", 404)
    }

    // check category only if categoryid is provided
    if(categoryId){
      const existingCategory = await this.categoryRepository.findCategoryById(categoryId);

      if(!existingCategory){
        throw new AppError("Category not found", 404)
      }
    }

    // upload new images only when provided
    let imageUrls: string[] | undefined

    if(images.length > 0){
      imageUrls = await Promise.all(
        images.map((image)=> uploadToCloudinary(image))
      )
    }

    const updatedProduct = await this.productRepository.updateProduct(productId, {
      name,
      description,
      price,
      stock,
      categoryId,
      ...(imageUrls && {imageUrls} )
    });

    return {
      product: mapProductResponse(updatedProduct)
    }
  }

  async deleteProduct(productId: string, userId: string){
    const existingProduct = await this.productRepository.getProductByIdAndSellerId(productId, userId);

    if(!existingProduct){
      throw new AppError("Product not found or you are not allowed to delete it", 404)
    }

    const deletedProduct = await this.productRepository.deleteProduct(productId);

    await Promise.all(
      existingProduct.imageUrls.map((imageUrl)=> deleteFromCloudinary(imageUrl))
    );

    return {
      product: mapProductResponse(deletedProduct)
    }
  }

  async toggleActiveProduct(productId: string, userId: string){
    const existingProduct = await this.productRepository.getProductByIdAndSellerId(productId, userId)

    if(!existingProduct){
      throw new AppError("Product not found or you are not allowed to update it", 404)
    }

    const updateProduct = await this.productRepository.toggleActiveProduct(productId, !existingProduct.isActive)

    return {
      product: mapProductResponse(updateProduct)
    }
  }

  async getAllActiveProducts(){
    const products = await this.productRepository.findAllActiveProducts();

    return{
      products: products.map(mapProductResponse)
    }
  }

}
