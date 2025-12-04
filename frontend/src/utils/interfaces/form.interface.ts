import type { Path } from "react-hook-form";
import type { SignupData } from "./auth.interface";

export interface SignupFormField {
  id: number;
  placeholder: string;
  fieldName: Path<SignupData>;
}
