"use server";

import { validate } from "@/components/login-form/validation";

type State = {
  errors: { email?: string; password?: string } | null;
  values: { email: string; password: string };
};

export async function loginAction(_prev: State, formData: FormData): Promise<State> {
  const email = String(formData.get("email") || "");
  const password = String(formData.get("password") || "");

  const result = validate({ email, password });
  if (!result.ok) {
    return {
      errors: {
        email: result.fieldErrors?.email,
        password: result.fieldErrors?.password,
      },
      values: { email, password: "" },
    };
  }

  // Simulate async work; replace with real auth
  await new Promise((r) => setTimeout(r, 250));

  return {
    errors: null,
    values: { email, password: "" },
  };
}
