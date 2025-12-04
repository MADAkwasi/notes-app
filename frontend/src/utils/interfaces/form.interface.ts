import type { Path } from "react-hook-form";

export interface FormField<T> {
  id: number;
  placeholder: string;
  fieldName: Path<T>;
}
