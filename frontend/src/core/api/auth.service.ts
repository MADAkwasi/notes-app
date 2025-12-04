import api from "./api";
import type {
  LoginData,
  SignupData,
} from "../../utils/interfaces/auth.interface";
import { endpoints } from "../../utils/constants/endpoints";
import type {
  User,
  UserResponseData,
} from "../../utils/interfaces/user.interface";

const { auth } = endpoints;

export async function signupRequest({
  name,
  email,
  password,
  confirmPassword,
}: SignupData) {
  const { data } = await api.post(auth.signup, {
    name,
    email,
    password,
    confirmPassword,
  });
  return data;
}

export async function loginRequest({ email, password }: LoginData) {
  const { data } = await api.post(auth.login, {
    email,
    password,
  });
  return data;
}

export async function logoutRequest() {
  const { data } = await api.post(auth.logout, {});

  return data;
}

export async function getLoggedInUser(): Promise<User> {
  const { data: res } = await api.get<UserResponseData>(auth.me);

  return res.data.user;
}
