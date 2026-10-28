import { Role } from "../../../generated/prisma/enums.js";

export interface UserResponse {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}

export interface RegisterUserResponse {
  user: UserResponse;
  accessToken: string;
  refreshToken: string;
}
