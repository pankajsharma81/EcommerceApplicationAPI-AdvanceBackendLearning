import type { Category } from "../../../generated/prisma/client.js";

export interface ICategoryRepository{
    createCategory(data:{name: string; description ?: string}): Promise<Category>
    findCategoryByName(name: string): Promise<Category | null >
    findCategoryById(id: string): Promise<Category | null >

    findAllCategories(): Promise<Category[]>

    updateCategory(id: string, data: {name?: string, description ?: string}): Promise<Category>

    countProductByCategoryId(categoryId: string): Promise<number>;
    deleteCategory(id: string): Promise<Category>
}