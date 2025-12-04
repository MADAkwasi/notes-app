import { createContext } from "react";
import type { AuthContextType } from "../../utils/interfaces/auth.interface";

export const AuthContext = createContext<AuthContextType | null>(null);
