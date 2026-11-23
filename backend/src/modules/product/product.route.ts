import express from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { uploadImage } from "../../middlewares/upload.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createProductSchema } from "./product.schema.js";
import {
  createProductController,
  getProductsByCategoryIdController,
} from "./product.controller.js";

const router = express.Router();

router.post(
  "/create-product",
  authenticate,
  authorize("SELLER", "ADMIN"),
  uploadImage.array("images", 5),
  validate(createProductSchema),
  createProductController,
);

router.get("/category/:categoryId", getProductsByCategoryIdController);

export default router;
