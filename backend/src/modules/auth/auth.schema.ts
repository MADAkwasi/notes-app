import z from "zod";

export const signupUserSchema = z
  .object({
    body: z.object({
      name: z.string().min(3),
      email: z.email(),
      password: z.string().min(8),
      confirmPassword: z.string().min(8),
      photo: z.string().optional(),
      tags: z.array(z.string()).optional(),
    }),
  })
  .refine((data) => data.body.password === data.body.confirmPassword, {
    message: "Passwords do not match",
    path: ["body", "confirmPassword"],
  });

export const loginUserSchema = z.object({
  body: z.object({
    email: z.email(),
    password: z.string().min(8),
  }),
});

export const updateUserPasswordSchema = z
  .object({
    body: z.object({
      currentPassword: z.string().min(8),
      newPassword: z.string().min(8),
      confirmPassword: z.string().min(8),
    }),
  })
  .refine((data) => data.body.newPassword === data.body.confirmPassword, {
    message: "Passwords do not match",
    path: ["body", "confirmPassword"],
  });
