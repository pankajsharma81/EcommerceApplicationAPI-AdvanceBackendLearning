import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import { AppError } from "../utils/app-error.js";

export const validate = (schema: ZodType) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if(!result.success){
            return next(new AppError("Validation failed", 400, result.error.issues));
        }

        req.body = result.data
        next();
    }
}