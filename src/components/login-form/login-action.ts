"use server";

import { redirect } from "next/navigation";
import { validate } from "@/components/login-form/validation";

export type LoginState = {
  errors: { email?: string; password?: string } | null;
  values: { email: string; password: string };
};

export async function login(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const values = {
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  };
  const result = validate(values);

  if (!result.ok) {
    return {
      errors: {
        email: result.fieldErrors?.email,
        password: result.fieldErrors?.password,
      },
      values: { email: values.email, password: "" },
    };
  }

  // Simulate async work; replace with real auth
  await new Promise((r) => setTimeout(r, 200));
  redirect("/login?success=1");
}
