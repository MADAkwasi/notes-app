import type { FieldErrors, Path, UseFormRegister } from "react-hook-form";
import type { SignupData } from "../utils/interfaces/auth.interface";
import { useState, type ReactElement } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

interface InputProps {
  placeholder: string;
  fieldName: Path<SignupData>;
  type?: "text" | "password";
  register: UseFormRegister<SignupData>;
  errors: FieldErrors<SignupData>;
}

export default function InputField({
  placeholder,
  fieldName,
  register,
  type = "text",
  errors,
}: Readonly<InputProps>): ReactElement {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handlePasswordVisibility = () => setIsPasswordVisible((bool) => !bool);

  const returnInputType = () =>
    type === "password" && !isPasswordVisible ? "password" : type;

  return (
    <>
      {" "}
      <div className="relative">
        <input
          type={
            type === "password" && isPasswordVisible
              ? "text"
              : returnInputType()
          }
          placeholder={placeholder}
          {...register(fieldName, { required: true })}
          className="border w-full text-white border-gray-200 pl-3 pr-10 py-3 rounded-lg active:outline focus:outline outline-white placeholder:text-sm placeholder:text-gray-300"
        />
        {type === "password" && (
          <button
            onClick={handlePasswordVisibility}
            type="button"
            className="cursor-pointer"
          >
            {isPasswordVisible ? (
              <IoEyeOutline className="absolute right-1 top-1/2 -translate-1/2 text-white text-lg" />
            ) : (
              <IoEyeOffOutline className="absolute right-1 top-1/2 -translate-1/2 text-white text-lg" />
            )}
          </button>
        )}
      </div>
      {errors[fieldName]?.message && (
        <p className="text-xs text-red-500">{errors[fieldName]?.message}</p>
      )}
    </>
  );
}
