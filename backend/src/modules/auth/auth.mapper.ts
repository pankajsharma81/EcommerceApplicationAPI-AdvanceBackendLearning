import type { Role } from "../../../generated/prisma/enums.js";
import type { UserResponse } from "./auth.response.js";

export const mapUserResponse = (user: {
  id: string;
  firstName: string;
  lastName: string | null;
  email: string;
  phoneNumber: string | null;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
}): UserResponse => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phoneNumber: user.phoneNumber,
    role: user.role,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};
