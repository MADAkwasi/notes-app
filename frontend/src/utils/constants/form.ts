import type { LoginData, SignupData } from "../interfaces/auth.interface";
import type { FormField } from "../interfaces/form.interface";

export const signupFormFields: FormField<SignupData>[] = [
  {
    id: 1,
    placeholder: "Full Name",
    fieldName: "name",
  },
  {
    id: 2,
    placeholder: "Email",
    fieldName: "email",
  },
  {
    id: 3,
    placeholder: "Password",
    fieldName: "password",
  },
  {
    id: 4,
    placeholder: "Confirm Password",
    fieldName: "confirmPassword",
  },
];

export const loginFormFields: FormField<LoginData>[] = [
  {
    id: 1,
    placeholder: "Email",
    fieldName: "email",
  },
  {
    id: 2,
    placeholder: "Password",
    fieldName: "password",
  },
];
