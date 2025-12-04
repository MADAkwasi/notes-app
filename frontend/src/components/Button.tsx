import { type ButtonHTMLAttributes, type ReactElement } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "tertiary";
  loading?: boolean;
  type?: "button" | "submit" | "reset";
};

export default function AppButton({
  children,
  variant = "primary",
  className = "",
  disabled,
  type = "button",
  loading = false,
  ...props
}: Readonly<ButtonProps>): ReactElement {
  const baseStyles =
    "w-full flex justify-center items-center text-lg py-3 rounded-lg transition-all cursor-pointer select-none";

  const variants = {
    primary:
      "bg-[#1c1c1c] text-white hover:bg-[#2b2b2b] active:bg-[#000] disabled:bg-gray-400 disabled:cursor-not-allowed",
    secondary:
      "bg-white text-[#1c1c1c] border border-[#1c1c1c] hover:bg-gray-100 active:bg-gray-200 disabled:bg-gray-200 disabled:text-gray-500 disabled:cursor-not-allowed",
    tertiary:
      "bg-transparent text-[#1c1c1c] hover:text-black active:text-[#444] disabled:text-gray-400 disabled:no-underline disabled:cursor-not-allowed",
  };

  return (
    <button
      disabled={disabled || loading}
      type={type}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
