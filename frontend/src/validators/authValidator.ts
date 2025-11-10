import { z } from 'zod';

export const signupSchema = z.object({
  name: z
    .string()
    .nonempty("Name is required")
    .regex(/^[A-Za-z\s]+$/, "Name should contain only letters and spaces")
    .min(2, "Name must be at least 2 characters")
    .max(25, "Name cannot exceed 25 characters"),

  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),

  confirmPassword: z
    .string()
    .nonempty("Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});


export const signinSchema = z.object({
  email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email"),

  password: z
    .string()
    .nonempty("Password is required")
    .min(6, "Password must be at least 6 characters"),
});
