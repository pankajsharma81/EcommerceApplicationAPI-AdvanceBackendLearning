import type { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { categoryService } from "./category.container.js";
import { sendResponse } from "../../utils/send-response.js";

export const createCategoryController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await categoryService.createCategory(req.body);

    sendResponse({
      res,
      statusCode: 201,
      message: "Category Created Successfully",
      data: result,
    });
  },
);

export const getAllCategories = catchAsync(
  async (req: Request, res: Response) => {
    const result = await categoryService.getAllCategories();

    sendResponse({
      res,
      statusCode: 201,
      message: "Categories Fetched Successfully",
      data: result,
    });
  },
);

export const updateCategoryController = catchAsync(
  async(req: Request, res: Response) => {
    const result = await categoryService.updateCategory(req.params.id as string, req.body);

    sendResponse({
      res,
      statusCode: 200,
      message: "Category updated Successfully",
      data: result
    })
  }
)

export const deleteCategoryController = catchAsync(
  async(req: Request, res: Response) => {
    const result = await categoryService.deleteCategory(req.params.id as string);

    sendResponse({
      res,
      statusCode: 200,
      message: "Category deleted Successfully",
      data: result
    })
  }
)