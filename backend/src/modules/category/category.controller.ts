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
