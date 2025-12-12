import { useState, useMemo, useCallback, type ReactNode } from "react";
import { AuthContext } from "./AuthContext";
import type { User } from "../../../utils/interfaces/user.interface";
import {
  getLoggedInUser,
  loginRequest,
  logoutRequest,
  signupRequest,
} from "../../api/auth.service";
import type {
  AuthContextType,
  ErrorResponse,
  LoginData,
  SignupData,
} from "../../../utils/interfaces/auth.interface";
import { useNavigate } from "react-router-dom";

interface AuthProviderProps {
  children: ReactNode;
}

interface AxiosErrorShape {
  response: {
    data: ErrorResponse;
  };
}

function isAxiosErrorShape(err: unknown): err is AxiosErrorShape {
  if (typeof err === "object" && err !== null && "response" in err) {
    const res = (err as Record<string, unknown>).response;

    if (
      typeof res === "object" &&
      res !== null &&
      "data" in res &&
      typeof (res as Record<string, unknown>).data === "object"
    ) {
      return true;
    }
  }
  return false;
}

export function AuthProvider({ children }: Readonly<AuthProviderProps>) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingUser, setIsFetchingUser] = useState(false);
  const [hasTriedFetchingUser, setHasTriedFetchingUser] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getErrorMessage = (err: unknown): string => {
    if (isAxiosErrorShape(err)) {
      return err.response.data.message;
    }

    if (err instanceof Error) return err.message;

    return "Unexpected error occurred";
  };

  const refreshUser = useCallback(async () => {
    try {
      setError(null);
      setIsFetchingUser(true);

      const loggedInUser = await getLoggedInUser();

      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        setUser(null);
      }
    } catch (err: unknown) {
      setUser(null);
      setError(getErrorMessage(err));
    } finally {
      setIsFetchingUser(false);
      setHasTriedFetchingUser(true);
    }
  }, []);

  const login = useCallback(
    async (data: LoginData) => {
      setError(null);
      try {
        setIsLoading(true);
        await loginRequest(data);
        await refreshUser();
        navigate("/");
      } catch (err: unknown) {
        setError(getErrorMessage(err));
      } finally {
        setIsLoading(false);
      }
    },
    [refreshUser, navigate]
  );

  const signup = useCallback(
    async (data: SignupData) => {
      setError(null);
      try {
        setIsLoading(true);
        await signupRequest(data);
        await refreshUser();
        navigate("/");
      } catch (err) {
        setError(getErrorMessage(err));
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
      hasTriedFetchingUser,
    }),
    [
      user,
      isLoading,
      error,
      isFetchingUser,
      login,
      logout,
      refreshUser,
      signup,
      hasTriedFetchingUser,
    ]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
