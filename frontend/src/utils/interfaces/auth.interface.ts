import type { User } from "./user.interface";

export interface SignupData {
  [key: string]: unknown;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  [key: string]: unknown;
  email: string;
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isFetchingUser: boolean;
  hasTriedFetchingUser: boolean;
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

export interface ErrorResponse {
  status: string;
  message: string;
}
