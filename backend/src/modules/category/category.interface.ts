import type { Category } from "../../../generated/prisma/client.js";

export interface ICategoryRepository{
    createCategory(data:{name: string; description ?: string}): Promise<Category>
    findCategoryByName(name: string): Promise<Category | null >
}