import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import type { LoginData } from "../utils/interfaces/auth.interface";
import InputField from "../components/InputField";
import { loginFormFields } from "../utils/constants/form";
import { useEffect, type ReactElement } from "react";
import { loginSchema } from "../utils/schemas/authForm";
import { zodResolver } from "@hookform/resolvers/zod";
import AppButton from "../components/Button";
import { FiLoader } from "react-icons/fi";
import { useAuth } from "../utils/hooks/useAuth";
import { toast } from "react-toastify";

export default function LoginPage(): ReactElement {
  const { login, isLoading, error } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginData> = async (data) => {
    await login(data);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <main className="w-screen h-screen flex justify-center items-center overflow-auto px-4 py-10">
      <form
        className="w-1/2 gap-4 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl font-semibold my-4 text-white">
          Welcome Back
        </h1>
        {loginFormFields.map(({ id, placeholder, fieldName }) => (
          <div className="flex gap-2 w-full flex-col" key={id}>
            <InputField<LoginData>
              placeholder={placeholder}
              fieldName={fieldName}
              register={register}
              errors={errors}
              type={fieldName.endsWith("word") ? "password" : "text"}
            />
          </div>
        ))}

        <div>
          <AppButton
            variant="secondary"
            title="Submit"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? <FiLoader className="animate-spin" /> : "Submit"}
          </AppButton>
          <p className="text-center mt-2 text-white">
            Don't have an account?{" "}
            <Link className="text-blue-400" to="/signup">
              Click here
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
