"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid, isDirty },
    reset,
  } = useForm<LoginValues>({
    resolver: zodResolver(LoginSchema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  async function onSubmit(values: LoginValues) {
    // Simulate async login; replace with real handling as needed.
    await new Promise((r) => setTimeout(r, 600));
    console.log("login", { email: values.email, password: values.password ? "***" : "" });
    alert("ログイン（デモ）: コンソールを確認してください。");
    reset();
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="email">メールアドレス</Label>
            <Input
              id="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              placeholder="you@example.com"
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
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty || !isValid}
            aria-busy={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "送信中..." : "ログイン"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
