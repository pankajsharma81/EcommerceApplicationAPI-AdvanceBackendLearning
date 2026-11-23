import { Category } from "../../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import { ICategoryRepository } from "./category.interface.js";


export class CategoryRepository implements ICategoryRepository{

    async createCategory(data: { name: string; description?: string; }): Promise<Category> {
        const newCategory = await prisma.category.create({data})
        return newCategory;
    }

    async findCategoryByName(name: string): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: {
                name,
            }
        })
        return category;
    }
    async findCategoryById(id: string): Promise<Category | null> {
        const category = await prisma.category.findUnique({
            where: {
                id,
            }
        })
        return category;
    }
}