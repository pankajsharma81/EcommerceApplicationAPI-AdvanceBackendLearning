import { z } from "zod";

export const registerUserSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().optional(),
  email: z.email("Invalid email address").trim(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  role: z.enum(["USER", "SELLER"]).optional().default("USER"),
  phoneNumber: z.string().optional(),
});

export const loginUserSchema = z.object({
  email: z.email("Email is required").trim(),
  password: z.string().min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "refresh token is required"),
});

export type registerUserDto = z.infer<typeof registerUserSchema>;
export type loginUserDto = z.infer<typeof loginUserSchema>;
export type refreshTokenDto = z.infer<typeof refreshTokenSchema>;
