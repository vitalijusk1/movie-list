import type { AuthFieldConfig } from "../components/AuthFormFields/AuthFormFields";
import type { RegisterFormValues } from "./registerSchema";

export const registerFields: AuthFieldConfig<RegisterFormValues>[] = [
  { name: "username", label: "Username", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  { name: "repeatPassword", label: "Repeat Password", type: "password" },
];
