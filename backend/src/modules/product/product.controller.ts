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

export const getProductsByCategoryIdController = catchAsync(
  async(req: Request, res: Response) => {
    const result = await productService.getProductsByCategoryId(req.params.categoryId as string);

    sendResponse({
      res,
      statusCode: 200,
      message: "Products Fetched Successfully",
      data: result
    })
  }
)

export const getAllProducts = catchAsync(
  async(req: Request, res: Response) => {
    const result = await productService.getAllProducts();

    sendResponse({
      res,
      statusCode:200,
<<<<<<< HEAD
      message: "Products Fetched Successfully",
=======
      message: "Prodcuts Fetched Successfully",
>>>>>>> 141123c9afbf7144a4f94bc5f7421dfb09992283
      data: result,
    })
  }
)

<<<<<<< HEAD
export const updateProduct = catchAsync(
=======
export const updateProducts = catchAsync(
>>>>>>> 141123c9afbf7144a4f94bc5f7421dfb09992283
  async(req: Request, res: Response) => {

    const productId = req.params.id as string;

    const files = req.files as Express.Multer.File[] | undefined;
    const images:Buffer[] = files?.map((file) => file.buffer) ?? []

    const result = await productService.updateProduct(productId, req.body, req.user.id, images)

    sendResponse({
      res,
      statusCode: 200,
      message: "Product Updated Successfully",
      data: result
    })
  }
)
<<<<<<< HEAD

export const deleteProduct = catchAsync(
  async (req: Request, res: Response) => {
    const productId = req.params.id as string;

    const result = await productService.deleteProduct(productId,req.user.id);

    sendResponse({
      res,
      statusCode: 200,
      message: "Product deleted Successfully",
      data: result
    })
  }
)

export const toggleActiveProduct = catchAsync(
  async(req: Request, res: Response) => {
    const productId = req.params.id as string;

    const result = await productService.toggleActiveProduct(productId, req.user.id);

    sendResponse({
      res,
      statusCode: 200,
      message: "Product Status updated Successfully",
      data: result,
    })
  }
)

export const getAllActiveProducts = catchAsync(
  async (req: Request, res: Response) => {
    const result = await productService.getAllActiveProducts();

    sendResponse({
      res,
      statusCode: 200,
      message:"Active Products Fetched Successfully",
      data: result,
    })
  }
)
=======
>>>>>>> 141123c9afbf7144a4f94bc5f7421dfb09992283
