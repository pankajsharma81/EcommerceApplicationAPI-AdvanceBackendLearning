import { AppError } from "../../utils/app-error.js";
import { ICategoryRepository } from "./category.interface.js";
import { mapCategoryResponse } from "./category.mapper.js";
import { createCategoryDto } from "./category.schema.js";

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
}