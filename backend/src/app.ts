import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { FRONTEND_URL } from "./config/env.config.js";
import { globalErrorHandler } from "./middlewares/error.middleware.js";
import authRoutes from "./modules/auth/auth.route.js";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({ origin: FRONTEND_URL ?? "http://localhost:5173", credentials: true }),
);

app.get("/health-check", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "server is healthy",
  });
});

app.use("/api/v1/auth", authRoutes)

app.use(globalErrorHandler);

export default app;