import { RefreshToken, User } from "../../../generated/prisma/client.js";
import { prisma } from "../../lib/prisma.js";
import type { IAuthRepository } from "./auth.interface.js";

export class AuthRepository implements IAuthRepository {
  async findUserByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    return user;
  }

  async createUser(data: {
    firstName: string;
    lastName?: string;
    email: string;
    passwordHash: string;
    phoneNumber?: string;
    role?: "USER" | "SELLER";
  }): Promise<User> {
    return await prisma.user.create({
      data,
    });
  }

  async createRefreshToken(data: {
    userId: string;
    tokenHash: string;
    expireAt: Date;
  }): Promise<RefreshToken> {
    return await prisma.refreshToken.create({
      data,
    });
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  }

  async findRefreshToken(tokenHash: string): Promise<RefreshToken | null> {
    const refreshToken = await prisma.refreshToken.findUnique({
      where: { tokenHash },
    });
    return refreshToken;
  }

  async deleteRefreshTokenById(id: string) {
    return await prisma.refreshToken.delete({
      where: { id },
    });
  }

  async deleteAllRefreshTokenByUserId(userId: string) {
    return await prisma.refreshToken.deleteMany({
      where: { userId },
    });
  }
}
