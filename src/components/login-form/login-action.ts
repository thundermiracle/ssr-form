"use server";

import { redirect } from "next/navigation";
import { z } from "zod";

const LoginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8).max(128),
});

export async function login(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  const parsed = LoginSchema.safeParse({ email, password });
  if (!parsed.success) {
    redirect("/login?error=1");
  }

  // Demo only: replace with real auth/session handling as needed.
  redirect("/login?success=1");
}

