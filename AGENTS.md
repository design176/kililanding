<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` - verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project rules

- Do not add `prefers-reduced-motion` handling or any other reduce-motion logic to this codebase.

## Stack

- Next.js 16 App Router, React 19, TypeScript (strict), CSS Modules. Single package at repo root - no monorepo.
- Path alias `@/*` → `src/*`. Layout/page props use generated globals `LayoutProps<'/'>`, not hand-written interfaces.
- See `CLAUDE.md` for detailed architecture (design system, demo band, signup flow); this file is the short operational cheat-sheet.

## Commands

- `npm run dev` - dev server on :3000 (also re-generates the header block above)
- `npm run build` / `npm run start` - production build / serve
- `npm run lint` - ESLint flat config (`eslint` with no args, via `eslint-config-next/core-web-vitals`)
- No test suite configured. Verify with `build` + `lint`.

## Env

- `.env.local` (gitignored): `DATABASE_URL` (Neon Postgres, required by `POST /api/signup`), `APP_ENV` (`dev` skips Vercel Analytics + GTM in `src/app/layout.tsx`), optional `NEXT_PUBLIC_SITE_URL` (overrides `metadataBase` for OG images; falls back to `VERCEL_PROJECT_PRODUCTION_URL`), `FILES_PASSWORD` (gates `/files`, see `src/proxy.ts`), `FILES_AUTH_DISABLED` (`"true"` skips the `/files` gate entirely - local-only convenience, never set in prod).

## Conventions & gotchas

- **Design tokens**: `src/app/globals.css` is the single source of truth - defines all `var(--color-*)`, `var(--shadow-*)`, `var(--btn-mono-*)` for both `[data-theme="light"]` and `:root`/`[data-theme="dark"]`. Never introduce raw hex/rgba in a `.module.css`; reference the vars.
- **Fonts**: Satoshi (`--font-heading`, via `@import` in `globals.css`) for `h1`–`h6`, Work Sans (`--font-body`, via `next/font/google` in `layout.tsx`) for body. Use the variables, not family names.
- **Theme**: `next-themes` with `attribute="data-theme"`, `defaultTheme="dark"`, `enableSystem={false}` (`src/components/site/ThemeProvider.tsx`). Gate `theme`-branching on `useMounted()` (`src/lib/use-mounted.ts`) to avoid hydration mismatch. Light theme is fully tokenized - test both.
- **Icons**: `@phosphor-icons/react/dist/ssr` in server components, `@phosphor-icons/react` in client components. Swapping throws at build time.
- **Animation**: `motion` v13 (`motion/react`, not `framer-motion`) only - no other animation library. `retune` visual editor (`Retune` in `layout.tsx`, `public/retune.manifest.json`) is a design-tool artifact, not app contract.
- **Signup**: validation in `src/lib/signup.ts` is shared by `SignupForm` (client) and `src/app/api/signup/route.ts` (authority). Route calls `ensureTable()` every request (`CREATE TABLE IF NOT EXISTS` + `ADD COLUMN IF NOT EXISTS`) - schema changes go there, no migration tool.
- **`next.config.ts` is empty** - no custom webpack, headers, or redirects.
- **`/files`**: password-gated file index - see `CLAUDE.md` for the auth flow. The index (`src/app/files/page.tsx`) renders `FILES` from `src/lib/files-index.ts` (title, href, `FileStatus`); add a row there plus a route under `src/app/files/` to publish a new item. `FilesLoginForm` (`src/components/files/`) remembers the password in `localStorage` (`files_password`) and auto-submits it on return visits - cleared automatically if the stored value is rejected (e.g. after rotating `FILES_PASSWORD`).
- **Kili Deck** (`/files/kili_deck`, `src/components/files/deck/`): a client-side slide viewer (`KiliDeck.tsx` + `Slides.tsx`, arrow-key/click/dot navigation, `CarouselDots` auto-advances with a fill-bar animation). Its `Badge` (`src/components/ui/Badge.tsx`, tones `neutral`/`brand`/`danger`) and `StatTile` (KPI-tile-style stat box) components take design cues from the atoms/molecules documented at `https://kili-app-demo-test-not-public.vercel.app/design/components` (Badge, KPI Tile, Card, Carousel Dots), reimplemented against this repo's own `globals.css` tokens rather than that app's palette.
