# Repository Guidelines

## Project Structure & Module Organization
- Source code lives in `src/app/*` using Next.js App Router. Add routes as folders with `page.tsx` and optional `layout.tsx`.
- Global styles: `src/app/globals.css` (Tailwind via PostCSS).
- Static assets: `public/` (served from `/`).
- Config: `next.config.ts`, `postcss.config.mjs`, `tsconfig.json` (includes path alias `@/* → src/*`).

## Build, Test, and Development Commands
- `pnpm install` — install dependencies (preferred: repository ships `pnpm-lock.yaml`).
- `pnpm dev` — start dev server with Turbopack at `http://localhost:3000`.
- `pnpm build` — production build with Turbopack.
- `pnpm start` — run the built app.

Node 18+ LTS recommended.

## Coding Style & Naming Conventions
- Language: TypeScript + React Server Components where possible.
- Indentation: 2 spaces; use concise, typed props and `React.FC` not required.
- File names: components/utilities in PascalCase/CamelCase; route folders kebab-case.
- Imports: prefer `@/*` alias (see `tsconfig.json`).
- Styling: Tailwind utility classes in components; keep global styles minimal.
- No linters/formatters are configured; follow idiomatic TS/React. If adding ESLint/Prettier, include configs in the PR.

## Testing Guidelines
- No test framework configured yet. If adding tests, prefer Vitest or Jest.
- Name tests `*.test.ts(x)` and colocate with source or in `__tests__/`.
- Aim for meaningful unit tests on components and server actions; target ~80% coverage for new code.

## Commit & Pull Request Guidelines
- Commits: use clear, atomic messages. Conventional Commits are encouraged (e.g., `feat: add signup form`, `fix: handle null session`).
- PRs: include scope/intent, linked issues, before/after notes or screenshots for UI, and steps to validate. Update docs when changing configs or scripts.
- Keep diffs focused; avoid unrelated refactors.

## Security & Configuration Tips
- Do not commit secrets. Use `.env.local` for local development. Prefix public variables with `NEXT_PUBLIC_`.
- Validate and sanitize all user input; avoid trusting client-provided data in server actions.

## Agent-Specific Notes
- Make minimal, surgical changes; respect existing structure and scripts.
- Prefer adding files under `src/app/` and `public/`; avoid renaming top-level files without discussion.
