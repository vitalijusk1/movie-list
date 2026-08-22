import type { AuthFieldConfig } from "../components/AuthFormFields/AuthFormFields";
import type { LoginFormValues } from "./loginSchema";

export const loginFields: AuthFieldConfig<LoginFormValues>[] = [
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
];
