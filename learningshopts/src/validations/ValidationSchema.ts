import { z } from "zod";

export const LoginFormSchema = z.object({
  email: z
    .string()
    .min(4, { message: "Email is required" })
    .email({ message: "Must be a valid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be atleast 7 characters" }),
});

export const SignUpFormSchema = z
  .object({
    first_name: z
      .string()
      .min(2, { message: "First name is required" })
      .optional(),
    last_name: z
      .string()
      .min(2, { message: "Last name is required" })
      .optional(),
    email: z
      .string()
      .min(5, { message: "Email is required" })
      .email({ message: "Must be a valid email" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z
      .string()
      .min(8, { message: "Confirm password is required" }),
    date_of_birth: z.string().optional(),
    gender: z.string().optional(),
    role: z.string().optional(),
    terms: z.literal(true).optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords don't match",
  });

export type SignUpFormSchemaType = z.infer<typeof SignUpFormSchema>;
export type LoginFormSchemaType = z.infer<typeof LoginFormSchema>;
