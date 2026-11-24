import express from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { uploadImage } from "../../middlewares/upload.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createProductSchema, updateProductSchema } from "./product.schema.js";
import {
  createProductController,
  getAllProducts,
  getProductsByCategoryIdController,
  updateProducts,
} from "./product.controller.js";

const router = express.Router();

router.post(
  "/create-product",
  authenticate,
  authorize("SELLER"),
  uploadImage.array("images", 5),
  validate(createProductSchema),
  createProductController,
);

router.get("/category/:categoryId", getProductsByCategoryIdController);

router.get("/products", authenticate, authorize("ADMIN"), getAllProducts);

router.patch(
  "/:id",
  authenticate,
  authorize("SELLER"),
  uploadImage.array("images",5),
  validate(updateProductSchema),
  updateProducts
)

export default router;
