import { AppError } from "../../utils/app-error.js";
import {
  comparePassword,
  hashPassword,
  hashToken,
} from "../../utils/auth.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.helper.js";
import type { IAuthRepository } from "./auth.interface.js";
import { mapUserResponse } from "./auth.mapper.js";
import type { loginUserDto, registerUserDto } from "./auth.schema.js";

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
}
