import { AppError } from "../../utils/app-error.js";
import { ICategoryRepository } from "./category.interface.js";
import { mapCategoryResponse } from "./category.mapper.js";
import { createCategoryDto, updateCategoryDto } from "./category.schema.js";

export class CategoryService {
    constructor(private readonly categoryRepository: ICategoryRepository) {}

    async createCategory(body: createCategoryDto){
        const {name, description} = body;

        const existingCategory = await this.categoryRepository.findCategoryByName(name)

        if(existingCategory){
            throw new AppError("Category already exist", 409)
        }

        const newCategory = await this.categoryRepository.createCategory({
            name,
            description
        })

        return {
            category:mapCategoryResponse(newCategory)
        }
    }

    async getAllCategories(){
        const categories = await this.categoryRepository.findAllCategories()

        return {
            categories: categories.map(mapCategoryResponse)
        }
    }

    async updateCategory(id: string, body: updateCategoryDto){
        const {name, description} = body;

        const existingCategory = await this.categoryRepository.findCategoryById(id)

        if(!existingCategory){
            throw new AppError("Category not found", 404);
        }

        // check duplicate name only when name is changing
        if(name && name !== existingCategory.name){
            const categoryWithSameName = await this.categoryRepository.findCategoryByName(name)
            if(categoryWithSameName){
                throw new AppError("Category name already exists", 409);
            }
        }

        const updatedCategory = await this.categoryRepository.updateCategory(id, { name, description })

        return {
            category: mapCategoryResponse(updatedCategory)
        }
    }

    async deleteCategory(id: string){
        const existingCategory = await this.categoryRepository.findCategoryById(id);

        if(!existingCategory){
            throw new AppError("Category not found", 404)
        }

        const productCount = await this.categoryRepository.countProductByCategoryId(id);

        if(productCount > 0){
            throw new AppError(
                `Cannot delete category. ${productCount} products are assigned to this category`, 409
            )
        }

        const deleteCategory = await this.categoryRepository.deleteCategory(id);

        return {
            category: mapCategoryResponse(deleteCategory)
        }
    }
}