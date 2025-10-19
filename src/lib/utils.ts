export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

// Build a redirect URL for SSR error display in no-JS fallback
export function buildErrorRedirectURL(
  basePath: string,
  state: {
    fieldErrors?: Partial<Record<string, string | undefined>>;
    values?: Partial<Record<string, string | undefined>>;
  }
): string {
  const url = new URL(basePath, "http://localhost");
  const emailErr = state.fieldErrors && (state.fieldErrors as any).email;
  const passwordErr = state.fieldErrors && (state.fieldErrors as any).password;
  if (emailErr) url.searchParams.set("emailError", String(emailErr));
  if (passwordErr) url.searchParams.set("passwordError", String(passwordErr));
  const emailVal = state.values && (state.values as any).email;
  if (emailVal) url.searchParams.set("email", String(emailVal));
  return url.pathname + "?" + url.searchParams.toString();
}
