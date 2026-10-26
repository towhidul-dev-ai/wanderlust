<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# wanderlust

Fresh single-app Next.js 16.4.3 App Router scaffold (no monorepo). All app code is under `src/`: `app` (routes: currently only `/`, still an empty page), `components/ui`, `hooks`, `lib`.

## Non-default experimental config (`next.config.ts`)

- `cacheComponents: true` — caching is explicit: opt in with the `use cache` directive. Uncached async data reads must be wrapped in `<Suspense>` or the dev overlay flags a "blocking-route" insight.
- `reactCompiler: true` — don't hand-write memoization (`useMemo`/`useCallback`/`React.memo`) for performance; verify hook-rule correctness instead.
- Turbopack is the dev bundler; Tailwind v4 is loaded through `turbopack.rules` here, not PostCSS.

## Commands

- `npm run dev` — dev server; also (re)generates route types under `.next/types` and `.next/dev/types`.
- `npm run build`, `npm start`, and `npm run lint` (bare `eslint`, flat config).
- Typecheck has **no script**: run `npx tsc --noEmit`, ideally right after `next dev`/`next build`, since `tsconfig.json` includes generated `.next/types`; types like `LayoutProps<"/">` or `PageProps<"/">` in layouts/pages come from there.
- No tests, no CI, no pre-commit hooks.

## UI stack

- `src/components/ui` is the shadcn **`base-nova`** registry built on **Base UI** (`@base-ui/react/*`), NOT Radix — prop APIs differ from classic shadcn/ui examples in training data. Check the local component file (or `@base-ui/react` docs) before using props.
- Add new components with `npx shadcn add <name>` (configured by `components.json`: aliases `@/*` → `src/*`, Tailwind CSS at `src/app/globals.css`).
- `cn` is imported from the `cn` package, not `@/lib/utils` (despite the `components.json` alias).
- Tailwind v4 is CSS-first: no `tailwind.config` file — all theme tokens live in the `@theme inline` block of `src/app/globals.css`.
- Icons: `lucide-react`. Fonts: `next/font/google` (Josefin Sans is set up in `src/app/layout.tsx`).
- Server-side syntax highlighting: `src/lib/highlighter.tsx` (shiki, JS regex engine) + `src/hooks/use-highlighted-code.ts`.
