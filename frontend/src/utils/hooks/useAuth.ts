import { useContext } from "react";
import { AuthContext } from "../../core/context/AuthContext";
import type { AuthContextType } from "../interfaces/auth.interface";

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
