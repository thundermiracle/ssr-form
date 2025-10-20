import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string({ required_error: "メールアドレスを入力してください" })
    .trim()
    .min(1, "メールアドレスを入力してください")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string({ required_error: "パスワードを入力してください" })
    .min(8, "8文字以上で入力してください")
    .max(128, "128文字以内で入力してください"),
});

export type LoginValues = z.infer<typeof LoginSchema>;

export type FieldErrors = Partial<Record<keyof LoginValues, string>>;

export type ActionState = {
  ok: boolean;
  message?: string;
  fieldErrors?: FieldErrors;
  values?: Partial<LoginValues>;
};

export function validate(values: Partial<LoginValues>): {
  ok: boolean;
  fieldErrors?: FieldErrors;
  data?: LoginValues;
} {
  const result = LoginSchema.safeParse(values);
  if (!result.success) {
    const fieldErrors = Object.fromEntries(
      Object.entries(result.error.flatten().fieldErrors).flatMap(([k, v]) =>
        v && v.length > 0 ? [[k, v[0] as string]] : []
      )
    ) as FieldErrors;
    return { ok: false, fieldErrors };
  }
  return { ok: true, data: result.data };
}

