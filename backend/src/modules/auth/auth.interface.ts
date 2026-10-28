import type { RefreshToken, User } from "../../../generated/prisma/client.js";

export interface IAuthRepository {
  getUserByEmail(email: string): Promise<User | null>;
  createUser(data: {
    firstName: string;
    lastName?: string;
    email: string;
    passwordHash: string;
    phoneNumber?: string;
    role?: "USER" | "SELLER";
  }): Promise<User>;

  createRefreshToken(data: {
    userId: string;
    tokenHash: string;
    expireAt: Date;
  }): Promise<RefreshToken>;
}
