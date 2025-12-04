import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(3, "Full name must be at least 3 characters"),
    email: z.email("Please enter a valid email"),
    password: z.string().min(8, "Password must be 8+ characters"),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be 8+ characters"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(8, "Password must be 8+ characters"),
});
