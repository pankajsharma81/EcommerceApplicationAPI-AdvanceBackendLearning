import express from "express";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { createCategorySchema } from "./category.schema.js";
import { createCategoryController } from "./category.controller.js";

const router = express.Router();

router.post(
  "/create-category",
  authenticate,
  authorize("ADMIN"),
  validate(createCategorySchema),
  createCategoryController,
);

export default router;