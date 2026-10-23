import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error.js";
import { NODE_ENV } from "../config/env.config.js";

export const globalErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {

    if(NODE_ENV === "development"){
        return res.status(err instanceof AppError ? err.statusCode : 500).json({
            success: false,
            status: err instanceof AppError ? err.status : "error",
            message: err.message,
            details: err instanceof AppError ? err.details : undefined,
            stack: err.stack
        })
    }

    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            success: false,
            status: err.status,
            message: err.message,
            ...(err.details !== undefined && { details: err.details })
        })
    }

    console.error(err);

    return res.status(500).json({
        success: false,
        status: "error",
        message: "something went wrong"
    })
}