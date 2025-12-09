import type { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import { Activity, useState, type ReactElement } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface InputProps<TFormValues extends Record<string, unknown>> {
  placeholder: string;
  fieldName: Path<TFormValues>;
  type?: "text" | "password";
  register: UseFormRegister<TFormValues>;
  errors: FieldErrors<TFormValues>;
  isTextArea?: boolean;
}

export default function InputField<
  TFormValues extends Record<string, unknown>
>({
  placeholder,
  fieldName,
  register,
  type = "text",
  isTextArea = false,
  errors,
}: Readonly<InputProps<TFormValues>>): ReactElement {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => setIsPasswordVisible((prev) => !prev);

  const inputType = type === "password" && isPasswordVisible ? "text" : type;

  const getErrorMessage = (message: unknown) => {
    if (typeof message === "string") return message;
    if (Array.isArray(message)) return message.join(", ");
    return "";
  };

  return (
    <>
      {!isTextArea ? (
        <div className="relative">
          <input
            type={inputType}
            placeholder={placeholder}
            {...register(fieldName)}
            className="border w-full text-white border-gray-200 pl-3 pr-10 py-3 rounded-lg focus:outline outline-white placeholder:text-sm placeholder:text-gray-300"
          />

          <Activity mode={type === "password" ? "visible" : "hidden"}>
            <button
              type="button"
              className="cursor-pointer"
              onClick={handlePasswordVisibility}
              title={isPasswordVisible ? "Hide Password" : "Show Password"}
            >
              {isPasswordVisible ? (
                <IoEyeOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-lg" />
              ) : (
                <IoEyeOffOutline className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-lg" />
              )}
            </button>
          </Activity>
        </div>
      ) : (
        <textarea
          placeholder={placeholder}
          {...register(fieldName)}
          rows={5}
          className="border w-full text-white border-gray-200 pl-3 pr-10 py-3 rounded-lg focus:outline outline-white placeholder:text-sm placeholder:text-gray-300"
        />
      )}

      <p className="text-xs text-red-500">
        {getErrorMessage(errors[fieldName]?.message)}
      </p>
    </>
  );
}
