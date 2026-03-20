# AGENT Instructions

This repository contains a React 19 + TypeScript project built with Vite+ (vite-plus).

## General Guidelines

- Source code lives under `src/`.
- Use `npm run format` to apply Oxfmt formatting to all files.
- Lint the code with `npm run lint` before committing.
- Run `npm run check` to execute all quality checks (lint + format + typecheck).
- Commit messages should be written in English and describe the change briefly.
- When modifying or adding code, prefer TypeScript (`.ts`/`.tsx`) files.

## Testing and Checks

- Unit tests: `npm run test` (Vitest)
- E2E tests: `npm run test:e2e` (Playwright)
- All checks: `npm run check` (Oxlint + Oxfmt + TypeScript typecheck)
- Ensure `npm run check` succeeds before committing.
