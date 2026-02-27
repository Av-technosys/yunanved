import { z } from "zod";

export const signupSchema = z
  .object({
    first_name: z
      .string()
      .min(2, "First name must be at least 2 characters"),

    last_name: z
      .string()
      .min(1, "Last name is required"),

    email: z
      .string()
      .email("Invalid email address"),

    number: z
      .string()
      .min(10, "Phone number must be at least 10 digits"),

    password: z
      .string()
      .min(6, "Password must be at least 6 characters"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"],
  });