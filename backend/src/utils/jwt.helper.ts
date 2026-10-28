import jwt, { SignOptions } from "jsonwebtoken";
import {
  JWT_ACCESS_EXPIRES_IN,
  JWT_ACCESS_SECRET,
  JWT_REFRESH_EXPIRES_IN,
  JWT_REFRESH_SECRET,
} from "../config/env.config.js";

export const generateAccessToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_ACCESS_SECRET!, {
    expiresIn: JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign({ userId }, JWT_REFRESH_SECRET!, {
    expiresIn: JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, JWT_ACCESS_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, JWT_REFRESH_SECRET!);
};
