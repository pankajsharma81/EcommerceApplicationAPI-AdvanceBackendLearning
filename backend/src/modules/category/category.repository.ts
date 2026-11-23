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

    async findAllCategories(): Promise<Category[]> {
        const categories = await prisma.category.findMany({
            orderBy:{
                createdAt: "desc"
            }
        })
        return categories;
    }

    async updateCategory(id: string, data: { name?: string; description?: string; }): Promise<Category> {
        const category = await prisma.category.update({
            where: {id},
            data
        })
        return category;
    }

    async countProductByCategoryId(categoryId: string): Promise<number> {
        return await prisma.product.count({
            where: {
                categoryId
            }
        })
    }

    async deleteCategory(id: string): Promise<Category> {
        const category = await prisma.category.delete({
            where: {
                id
            }
        })
        return category;
    }
}