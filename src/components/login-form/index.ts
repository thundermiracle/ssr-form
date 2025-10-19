"use client";

import dynamic from "next/dynamic";
import { LoginFormSkeleton } from "./login-form-skeleton";

export const LoginForm = dynamic(
  () => import("./login-form").then((m) => m.LoginForm),
  { ssr: false, loading: LoginFormSkeleton }
);

