import type { SignupFormField } from "../interfaces/form.interface";

export const signupFormFields: SignupFormField[] = [
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
