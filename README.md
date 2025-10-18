# SSR Form Hydration Demo

This repository is a demo project showcasing pitfalls when doing SSR for forms. In particular, it reproduces an issue in environments where JS loading/hydration is slow: JS-dependent validation state (e.g., `isValid`) from react-hook-form may fail to capture initial user input, leaving the submit button disabled.

## Tech Stack
- Next.js App Router (TypeScript), Tailwind v4
- react-hook-form + zod (schema validation)

## Getting Started
```bash
pnpm install
pnpm dev
```
Open `http://localhost:3000/login` in your browser (Node 18+ recommended).

## Reproduction Steps (using Chrome DevTools)
1) Set Network to "Slow 3G" and Performance/CPU throttling to "4×–6×"
2) Open `http://localhost:3000/login` and hard-reload (Cmd/Ctrl+Shift+R)
3) Before JS finishes loading, enter email and password
4) Even after hydration, `isValid` doesn’t catch up and the "Login" button stays disabled (typing one more character enables it)

## Why This Happens
Immediately after SSR, only HTML is present. Because client JS is not yet initialized, the form library cannot receive input events. After hydration, the state cannot be reconstructed properly, causing inconsistencies in values like `isValid`.

## Mitigation Examples


## Main Files
- `src/app/login/page.tsx`: Form page (adds an initial client-side delay to slow down hydration)
- `src/components/login-form.tsx`: Login form using react-hook-form + zod (demo only; auth not implemented)

This project is for demonstration purposes. It does not perform authentication or submit data.
