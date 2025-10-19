import { NextRequest, NextResponse } from "next/server";
import { validate } from "@/components/login-form/validation";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const values = {
    email: String(formData.get("email") || ""),
    password: String(formData.get("password") || ""),
  };

  const result = validate(values);
  const url = new URL("/login", req.url);
  if (!result.ok) {
    url.searchParams.set("error", "1");
  } else {
    url.searchParams.set("success", "1");
  }
  return NextResponse.redirect(url, { status: 303 });
}
