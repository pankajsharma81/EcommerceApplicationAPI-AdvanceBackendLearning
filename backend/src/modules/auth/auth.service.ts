import { AppError } from "../../utils/app-error.js";
import {
  comparePassword,
  hashPassword,
  hashToken,
} from "../../utils/auth.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../utils/jwt.helper.js";
import type { IAuthRepository } from "./auth.interface.js";
import { mapUserResponse } from "./auth.mapper.js";
import type {
  loginUserDto,
  refreshTokenDto,
  registerUserDto,
} from "./auth.schema.js";

export class AuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async registerUser(body: registerUserDto) {
    const { firstName, lastName, email, password, phoneNumber, role } = body;

    const existingUser = await this.authRepository.findUserByEmail(email);

    if (existingUser) {
      throw new AppError("Email is already registered", 409);
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await this.authRepository.createUser({
      firstName,
      lastName,
      email,
      passwordHash: hashedPassword,
      phoneNumber,
      role,
    });

    const accessToken = generateAccessToken(newUser.id, newUser.role);
    const refreshToken = generateRefreshToken(newUser.id);

    const hashedToken = hashToken(refreshToken);

    await this.authRepository.createRefreshToken({
      userId: newUser.id,
      tokenHash: hashedToken,
      expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user: mapUserResponse(newUser),
      accessToken,
      refreshToken,
    };
  }

  async loginUser(body: loginUserDto) {
    const { email, password } = body;

    const user = await this.authRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError("Invalid email or password", 401);
    }

    const isPasswordValid = await comparePassword(password, user.passwordHash);

    if (!isPasswordValid) {
      throw new AppError("Invalid email or password", 401);
    }

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id);

    const hashedToken = hashToken(refreshToken);

    await this.authRepository.createRefreshToken({
      userId: user.id,
      tokenHash: hashedToken,
      expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      user: mapUserResponse(user),
      accessToken,
      refreshToken,
    };
  }

  async getCurrentUser(userId: string) {
    const user = await this.authRepository.findUserById(userId);

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return mapUserResponse(user);
  }

  async logout(refreshToken: string) {
    if (!refreshToken) {
      throw new AppError("Refresh token required", 401);
    }

    const refreshTokenHashed = hashToken(refreshToken);

    const existingToken =
      await this.authRepository.findRefreshToken(refreshTokenHashed);

    if (!existingToken) {
      throw new AppError("Invalid refresh token", 401);
    }

    await this.authRepository.deleteRefreshTokenById(existingToken.id);
    return true;
  }

  async logoutAll(userId: string) {
    if (!userId) {
      throw new AppError("user not authenticated", 401);
    }

    await this.authRepository.deleteAllRefreshTokenByUserId(userId);
    return true;
  }

  async refreshToken(body: refreshTokenDto) {
    const { refreshToken } = body;

    let payload;

    try {
      payload = verifyRefreshToken(refreshToken);
    } catch (error) {
      throw new AppError("Invalid or expired refresh token", 401);
    }

    if (typeof payload === "string" || typeof payload.userId !== "string") {
      throw new AppError("Invalid refresh token", 401);
    }

    const tokenHash = hashToken(refreshToken);

    const storedToken = await this.authRepository.findRefreshToken(tokenHash);

    if (!storedToken) {
      throw new AppError("Invalid or expired refresh token", 401);
    }

    if (storedToken.expireAt < new Date()) {
      await this.authRepository.deleteRefreshTokenById(storedToken.id);

      throw new AppError("Refresh token has expired", 401);
    }

    if (storedToken.userId !== payload.userId) {
      throw new AppError("Invalid refresh token", 401);
    }

    const user = await this.authRepository.findUserById(payload.userId);

    if (!user) {
      throw new AppError("User not found", 401);
    }

    const newAccessToken = generateAccessToken(user.id, user.role);
    const newRefreshToken = generateRefreshToken(user.id);

    // Rotate refresh token
    await this.authRepository.deleteRefreshTokenById(storedToken.id);

    const hashedToken = hashToken(newRefreshToken);

    await this.authRepository.createRefreshToken({
      tokenHash: hashedToken,
      userId: payload.userId,
      expireAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    };
  }
}
