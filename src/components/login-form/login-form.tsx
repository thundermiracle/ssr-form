"use client";

import * as React from "react";
import { useActionState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { validate } from "@/components/login-form/validation";
import type { LoginState } from "@/components/login-form/login-action";

const initialState: LoginState = {
  errors: null,
  values: { email: "", password: "" },
};

export function LoginForm({ action }: { action: (prev: LoginState, formData: FormData) => Promise<LoginState> }) {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(action as any, initialState);

  const emailRef = React.useRef<HTMLInputElement>(null);
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const [clientErrors, setClientErrors] = React.useState<{ email?: string; password?: string } | null>(null);

  const updateLiveErrors = React.useCallback(() => {
    const email = emailRef.current?.value ?? "";
    const password = passwordRef.current?.value ?? "";
    const result = validate({ email, password });
    if (!result.ok) {
      setClientErrors({ email: result.fieldErrors?.email, password: result.fieldErrors?.password });
    } else {
      setClientErrors(null);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");
    const result = validate({ email, password });
    if (!result.ok) {
      e.preventDefault();
      setClientErrors({ email: result.fieldErrors?.email, password: result.fieldErrors?.password });
    } else {
      setClientErrors(null);
    }
  };

  const emailError = clientErrors?.email ?? state.errors?.email;
  const passwordError = clientErrors?.password ?? state.errors?.password;

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} method="POST" onSubmit={handleSubmit} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              ref={emailRef}
              id="email"
              name="email"
              type="text"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
              defaultValue={state.values.email}
              aria-invalid={emailError ? "true" : undefined}
              aria-describedby={emailError ? "email-error" : undefined}
              className={emailError ? "border-red-500 focus-visible:ring-red-500/30" : undefined}
              onChange={updateLiveErrors}
            />
            {emailError && (
              <p id="email-error" className="text-sm text-red-600" aria-live="polite">
                {emailError}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              ref={passwordRef}
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              aria-invalid={passwordError ? "true" : undefined}
              aria-describedby={passwordError ? "password-error" : undefined}
              className={passwordError ? "border-red-500 focus-visible:ring-red-500/30" : undefined}
              onChange={updateLiveErrors}
            />
            {passwordError ? (
              <p id="password-error" className="text-sm text-red-600" aria-live="polite">
                {passwordError}
              </p>
            ) : (
              <p className="text-xs text-foreground/70">8文字以上で入力してください</p>
            )}
          </div>
          <Button type="submit" disabled={isPending} aria-busy={isPending} className="w-full">
            {isPending ? "送信中..." : "ログイン"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
