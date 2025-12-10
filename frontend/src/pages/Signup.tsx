import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import type { SignupData } from "../utils/interfaces/auth.interface";
import InputField from "../components/InputField";
import { signupFormFields } from "../utils/constants/form";
import { useEffect, type ReactElement } from "react";
import { signupSchema } from "../utils/schemas/authForm";
import { zodResolver } from "@hookform/resolvers/zod";
import AppButton from "../components/Button";
import { FiLoader } from "react-icons/fi";
import { useAuth } from "../utils/hooks/useAuth";
import { toast } from "react-toastify";

export default function SignupPage(): ReactElement {
  const { isLoading, signup, error } = useAuth();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupData> = async (data) => {
    await signup(data);
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <main className="w-screen h-screen flex justify-center items-center overflow-auto px-4 py-10">
      <form
        className="w-[90%] md:w-3/4 lg:w-2/5 gap-4 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl font-semibold my-4 text-white">
          Create An Account
        </h1>
        {signupFormFields.map(({ id, placeholder, fieldName }) => (
          <div className="flex gap-2 w-full flex-col" key={id}>
            <InputField<SignupData>
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
            Already have an account?{" "}
            <Link className="text-blue-400" to="/login">
              Login
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
}
