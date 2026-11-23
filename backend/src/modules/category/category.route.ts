import express from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createCategorySchema, updateCategorySchema } from "./category.schema.js";
import { createCategoryController, deleteCategoryController, getAllCategories, updateCategoryController } from "./category.controller.js";

const router = express.Router();

router.post(
  "/create-category",
  authenticate,
  authorize("ADMIN"),
  validate(createCategorySchema),
  createCategoryController,
);

router.get(
  "/categories",
  authenticate,
  authorize("ADMIN"),
  getAllCategories,
)

router.patch(
  "/categories/:id",
  authenticate,
  authorize("ADMIN"),
  validate(updateCategorySchema),
  updateCategoryController
)

router.delete(
  "/categories/:id",
  authenticate,
  authorize("ADMIN"),
  deleteCategoryController
)

export default router;