import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";
import { login } from "@/components/login-form/login-action";

export const metadata: Metadata = {
  title: "Login",
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[]>>;
}) {
  const sp = await searchParams;
  const success = typeof sp?.success === "string";
  const error = typeof sp?.error === "string";

  return (
    <div className="min-h-[calc(100vh-40px)] grid place-items-center p-6">
      <div className="w-full max-w-sm">
        {success && (
          <p
            className="mb-4 rounded-md border border-emerald-400/40 bg-emerald-500/10 px-3 py-2 text-sm text-emerald-700 dark:text-emerald-300"
            role="status"
            aria-live="polite"
          >
            送信しました（デモ）。
          </p>
        )}
        {error && (
          <p
            className="mb-4 rounded-md border border-red-400/40 bg-red-500/10 px-3 py-2 text-sm text-red-700 dark:text-red-300"
            role="alert"
            aria-live="polite"
          >
            入力内容を確認してください。
          </p>
        )}
        {!success && <LoginForm action={login} />}
      </div>
    </div>
  );
}
