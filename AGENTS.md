# Repository Guidelines

## Project Structure & Module Organization
- Monorepo managed by Yarn workspaces and Turborepo.
- Packages live in `packages/*`:
  - Core engine: `packages/core`
  - CLI: `packages/orval` (entry `src/bin/orval.ts`)
  - Framework targets: `packages/{angular,axios,fetch,hono,mcp,mock,query,swr,zod}`
- Source files: `packages/*/src`. Build output: `packages/*/dist`.
- Tests:
  - Unit/integration in packages (Vitest, `*.test.ts`).
  - Scenario specs and generators in `tests/`.
- Samples for manual verification in `samples/`.
- Documentation site in `docs/`.

## Build, Test, and Development Commands
- `yarn build`: Build all packages via Turborepo.
- `yarn dev`: Watch mode across packages.
- `yarn test`: Run package tests; `yarn test:ci` also runs sample checks.
- `yarn lint`: Lint TypeScript/JavaScript.
- `yarn format` / `yarn format:check`: Apply or verify Prettier formatting.
- `yarn update-samples`: Install and regenerate code in `samples/`.
- From `tests/`: `yarn generate` then `yarn build` to validate generators.

## Coding Style & Naming Conventions
- Language: TypeScript (Node `20`). Prefer ES modules in code, CommonJS where required by CLI.
- Formatting: Prettier (2‑space indent, single quotes, semicolons). Commit hooks run `prettier --check` on staged files.
- Linting: ESLint with TS recommended rules; keep warnings clean.
- Filenames: `kebab-case.ts`; tests end with `.test.ts`.

## Testing Guidelines
- Framework: Vitest. Place tests next to sources (e.g., `src/foo.test.ts`).
- Run locally: `yarn test` at repo root; per‑package tests via `yarn workspace @orval/<pkg> test`.
- Regeneration tests: use `tests/` scripts to generate from OpenAPI fixtures.

## Commit & Pull Request Guidelines
- Commits: Conventional Commits enforced by commitlint (e.g., `feat: add hono route generator`, `fix(core): handle nullable enums`).
- PRs: Target `master`. Include a clear description, linked issues, and before/after notes. For generator changes, attach a small diff or snippet from `tests/` or `samples/`.
- Pre‑PR checklist: `yarn build && yarn test && yarn format:check && yarn lint`.

## Security & Configuration Tips
- Use Yarn 4 (`corepack enable`) and Node `20` (`.nvmrc`).
- Do not edit files in `dist/` or generated outputs; modify sources under `src/` and re‑build.
