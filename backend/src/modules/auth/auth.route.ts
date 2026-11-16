import express from "express";
import { getCurrentUserController, loginUserController, logoutAllController, logoutController, registerUserController } from "./auth.controller.js";
import { validate } from "../../middlewares/validate.middleware.js";
import { loginUserSchema, registerUserSchema } from "./auth.schema.js";
import { authenticate } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validate(registerUserSchema), registerUserController);
router.post("/login",validate(loginUserSchema), loginUserController);

router.get("/me", authenticate, getCurrentUserController);

router.post("/logout", authenticate, logoutController);
router.post("/logout-all", authenticate, logoutAllController);

export default router;
