import type z from "zod";
import type { loginSchema, registerSchema } from "./auth.schema";

export type LoginFormValues = z.infer<typeof loginSchema>;

export type RegisterFormValues = z.infer<typeof registerSchema>;

export type User = {
  id: string;
  email: string;
  password: string;
};

export type AuthSession = {
  token: string;
  user: Omit<User, "password">;
};

type AuthContextType = {
  session: AuthSession | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
};
