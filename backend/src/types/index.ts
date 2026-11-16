export interface IJwtPayload {
  userId: string;
  role: string;
}

export interface AuthenticatedUser {
  id: string;
  role: string;
}
