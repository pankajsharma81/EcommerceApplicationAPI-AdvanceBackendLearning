import { CategoryResponse } from "./category.response.js";

export const mapCategoryResponse = (category: {
  id: string;
  name: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}): CategoryResponse => {
  return {
    id: category.id,
    name: category.name,
    description: category.description,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
  };
};
