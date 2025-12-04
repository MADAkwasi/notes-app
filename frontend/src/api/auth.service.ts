import type { SignupData } from "../utils/interfaces/auth.interface";
import api from "./api";

export async function signup({
  name,
  email,
  password,
  confirmPassword,
}: SignupData) {
  const { data } = await api.post("/auth/signup", {
    name,
    email,
    password,
    confirmPassword,
  });
  return data;
}
