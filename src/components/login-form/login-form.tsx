"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .min(8, "8文字以上で入力してください")
    .max(128, "128文字以内で入力してください"),
});

type LoginValues = z.infer<typeof LoginSchema>;

type LoginFormProps = {
  action: (formData: FormData) => void | Promise<void>;
};

export function LoginForm({ action }: LoginFormProps) {
  // Mounted flag to avoid SSR disabling the button (no-JS should allow submit)
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);

  const {
    register,
    formState: { errors },
    trigger,
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    if (!mounted) return; // SSR/no-JS: allow native/server handling
    // When JS is ready, run RHF validation and block submit if invalid
    const valid = await trigger();
    if (!valid) {
      e.preventDefault();
      e.stopPropagation();
    }
  }

  function SubmitButton() {
    const { pending } = useFormStatus();
    const disabled = pending; // Always active unless submitting
    return (
      <Button type="submit" disabled={disabled} aria-busy={pending} className="w-full">
        {pending ? "送信中..." : "ログイン"}
      </Button>
    );
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        {/*
          Server Action による送信（JS なしでも動作）。
          JS ありの場合は react-hook-form によるクライアント検証で UX を補助。
        */}
        <form
          action={action}
          method="post"
          // Disable native H5 validation after hydration; rely on RHF instead
          noValidate={mounted}
          onSubmit={onSubmit}
          className="grid gap-4"
        >
          <div className="grid gap-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="username"
              placeholder="you@example.com"
              required
              suppressHydrationWarning
              aria-invalid={errors.email ? "true" : undefined}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={errors.email ? "border-red-500 focus-visible:ring-red-500/30" : undefined}
              {...register("email")}
            />
            {errors.email && (
              <p id="email-error" className="text-sm text-red-600" aria-live="polite">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">パスワード</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              maxLength={128}
              suppressHydrationWarning
              aria-invalid={errors.password ? "true" : undefined}
              aria-describedby={errors.password ? "password-error" : undefined}
              className={errors.password ? "border-red-500 focus-visible:ring-red-500/30" : undefined}
              {...register("password")}
            />
            <div className="flex items-center justify-between">
              {errors.password ? (
                <p id="password-error" className="text-sm text-red-600" aria-live="polite">
                  {errors.password.message}
                </p>
              ) : (
                <p className="text-xs text-foreground/70">8文字以上で入力してください</p>
              )}
            </div>
          </div>
          <SubmitButton />
        </form>
      </CardContent>
    </Card>
  );
}
