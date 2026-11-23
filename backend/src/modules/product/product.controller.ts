import { Request, Response } from "express";
import { catchAsync } from "../../utils/catch-async.js";
import { productService } from "./product.container.js";
import { sendResponse } from "../../utils/send-response.js";

export const createProductController = catchAsync(
  async (req: Request, res: Response) => {
    const files = req.files as Express.Multer.File[] | undefined;

    const images = files?.map((file) => file.buffer) ?? [];

    const result = await productService.createProduct(
      req.body,
      req.user.id,
      images,
    );

    sendResponse({
      res,
      statusCode: 201,
      message: "Product Created Successfully",
      data: result,
    });
  },
);
