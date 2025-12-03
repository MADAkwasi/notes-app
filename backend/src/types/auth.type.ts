import { IUserDocument } from "./user.type";
export interface LoginData {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: IUserDocument;
}

export interface PasswordUpdate {
  currentPassword: string;
  newPassword: string;
}
