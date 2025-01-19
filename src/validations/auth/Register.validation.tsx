import { z } from "zod";

export const RegisterSchema = z.object({
  firstName: z.string().min(1, { message: "First name required" }),
  lastName: z.string().min(1, { message: "Last name required" }),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, {
    message:
      "Password must be at least 8 characters long and include a lowercase letter, an uppercase letter, and a digit.",
  }),
  confirmPassword: z.string(),
});

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
