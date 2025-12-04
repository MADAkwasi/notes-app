import { useForm, type SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import type { SignupData } from "../utils/interfaces/auth.interface";
import InputField from "../components/InputField";
import { signupFormFields } from "../utils/constants/form";
import { type ReactElement } from "react";
import { signup } from "../api/auth.service";
import { signupSchema } from "../utils/schemas/authForm";
import { zodResolver } from "@hookform/resolvers/zod";

export default function SignupPage(): ReactElement {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<SignupData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit: SubmitHandler<SignupData> = async (data) => {
    try {
      const res = await signup(data);
      console.log(res);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="w-screen h-screen flex justify-center items-center overflow-auto px-4 py-10">
      <form
        className="w-1/2 gap-4 flex flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-center text-2xl font-semibold my-4 text-blue-400">
          Create An Account
        </h1>
        {signupFormFields.map(({ id, placeholder, fieldName }) => (
          <div className="flex gap-2 w-full flex-col" key={id}>
            <InputField
              placeholder={placeholder}
              fieldName={fieldName}
              register={register}
              errors={errors}
              type={fieldName.endsWith("word") ? "password" : "text"}
            />
          </div>
        ))}

        <div>
          <button className="w-full rounded-xl bg-blue-400 py-3 mt-4 text-white">
            Submit
          </button>
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
