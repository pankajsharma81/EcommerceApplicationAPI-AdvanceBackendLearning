import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/app-error.js";
import { verifyAccessToken } from "../utils/jwt.helper.js";
import jwt from "jsonwebtoken";

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
        if(error instanceof jwt.JsonWebTokenError){
            return next(new AppError("Invalid or expired access token", 401))
        }
        next(error)
    }
}