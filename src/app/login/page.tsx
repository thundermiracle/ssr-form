import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <div className="min-h-[calc(100vh-40px)] grid place-items-center p-6">
      <LoginForm />
    </div>
  );
}

