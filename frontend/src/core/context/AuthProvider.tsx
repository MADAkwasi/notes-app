import { useState, useMemo, useCallback, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../../utils/interfaces/user.interface";
import {
  getLoggedInUser,
  loginRequest,
  logoutRequest,
  signupRequest,
} from "../api/auth.service";
import type {
  AuthContextType,
  LoginData,
  SignupData,
} from "../../utils/interfaces/auth.interface";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const refreshUser = useCallback(async () => {
    try {
      setIsFetchingUser(true);
      const user = await getLoggedInUser();
      if (!user) {
        setUser(null);
        navigate("/login");
        return;
      }
      setUser(user);
    } catch (err: unknown) {
      setUser(null);
      setError(err);
      navigate("/login");
    } finally {
      setIsFetchingUser(false);
    }
  }, [navigate]);

  const login = useCallback(
    async (data: LoginData) => {
      try {
        setIsLoading(true);
        await loginRequest(data);
        await refreshUser();
        navigate("/");
      } catch (err: unknown) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [refreshUser, navigate]
  );

  const signup = useCallback(
    async (data: SignupData) => {
      try {
        setIsLoading(true);
        await signupRequest(data);
        await refreshUser();
        navigate("/");
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    },
    [refreshUser, navigate]
  );

  const logout = useCallback(async () => {
    try {
      setIsLoading(true);
      await logoutRequest();
      setUser(null);
      navigate("/login");
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  const value: AuthContextType = useMemo(
    () => ({
      user,
      isLoading,
      error,
      login,
      logout,
      refreshUser,
      isFetchingUser,
      signup,
    }),
    [user, isLoading, error, isFetchingUser, login, logout, refreshUser, signup]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
