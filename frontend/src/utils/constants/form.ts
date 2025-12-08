import type { LoginData, SignupData } from "../interfaces/auth.interface";
import type { FormField } from "../interfaces/form.interface";
import type { CreateNoteDTO } from "../interfaces/note.interface";

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

export const addNoteFormFields: FormField<CreateNoteDTO>[] = [
  {
    id: 1,
    placeholder: "Title",
    fieldName: "title",
  },
  {
    id: 2,
    placeholder: "Content",
    fieldName: "content",
  },
  {
    id: 3,
    placeholder: "Tags",
    fieldName: "tags",
  },
];
