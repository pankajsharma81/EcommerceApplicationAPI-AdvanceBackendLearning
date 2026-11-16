import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error.js";
import { verifyAccessToken } from "../utils/jwt.helper.js";
import { IJwtPayload } from "../types/index.js";

export const authenticate = async (req: Request, _res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        const token = req.cookies?.accessToken || (authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : undefined)

        if(!token){
            throw new AppError("Unauthorized request", 401);
        }

        const decoded = verifyAccessToken(token)

        if ( typeof decoded === "string" || typeof decoded.userId !== "string" || typeof decoded.role !== "string") {
            throw new AppError("Invalid access token", 401)
        }

        req.user = {
            id: decoded.userId,
            role: decoded.role,
        }
        next()
    } catch (error) {
        next(error)
    }
}