import { AppError } from "../../utils/app-error.js";
import { hashPassword, hashToken } from "../../utils/auth.helper.js";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/jwt.helper.js";
import type { IAuthRepository } from "./auth.interface.js";
import { mapUserResponse } from "./auth.mapper.js";
import type { registerUserDto } from "./auth.schema.js";

export class AuthService {
  constructor(private readonly authRepository: IAuthRepository) {}

  async registerUser(body: registerUserDto) {
    const { firstName, lastName, email, password, phoneNumber, role } = body;

    const existingUser = await this.authRepository.getUserByEmail(email);

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

    const accessToken = generateAccessToken(newUser.id);
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
}
