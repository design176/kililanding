<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

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
- **Fonts**: Satoshi (`--font-heading`, via `@import` in `globals.css`) for `h1`–`h6`, Work Sans (`--font-body`, via `next/font/google` in `layout.tsx`) for body - both are the site defaults and load eagerly. `src/lib/fonts.ts` lists user-selectable alternates, each registered in `layout.tsx` via `next/font/google` with `preload: false`. Use the CSS variables, not family names. `src/lib/fontWeights.ts` + `SiteSettingsContext` similarly drive optional heading/body weight overrides.
- **Theme**: hand-rolled, **not** `next-themes` (still a `package.json` dependency, but nothing imports it) - `src/components/site/ThemeProvider.tsx` owns `'light' | 'dark'` state via `localStorage["theme"]` and writes `document.documentElement.dataset.theme`. Gate `theme`-branching on `useMounted()` (`src/lib/use-mounted.ts`) to avoid hydration mismatch. Light theme is fully tokenized - test both.
- **Icons**: `@phosphor-icons/react/dist/ssr` in server components, `@phosphor-icons/react` in client components. Swapping throws at build time.
- **Animation**: `motion` v13 (`motion/react`, not `framer-motion`) only - no other animation library. `public/retune.manifest.json` describes the design system for the retune visual editor, but there is currently no `<Retune>` component mounted in `layout.tsx` - it's an orphaned design-tool artifact, not an app contract.
- **Signup**: validation in `src/lib/signup.ts` is shared by `SignupForm` (client) and `src/app/api/signup/route.ts` (authority). Route calls `ensureTable()` every request (`CREATE TABLE IF NOT EXISTS` + `ADD COLUMN IF NOT EXISTS`) - schema changes go there, no migration tool.
- **`next.config.ts` is empty** - no custom webpack, headers, or redirects.
- **`/files`**: password-gated file index - see `CLAUDE.md` for the auth flow. The index (`src/app/files/page.tsx`) renders `FILES` from `src/lib/files-index.ts` (title, href, `FileStatus`); add a row there plus a route under `src/app/files/` to publish a new item. `FilesLoginForm` (`src/components/files/`) remembers the password in `localStorage` (`files_password`) and auto-submits it on return visits - cleared automatically if the stored value is rejected (e.g. after rotating `FILES_PASSWORD`).
- **Pitch deck** (`/files/scribble_deck`, `src/components/files/deck/`): a client-side slide viewer - `ScribbleDeck.tsx` owns slide index state, arrow-key nav, and a scale-to-fit stage; `DeckNavbar.tsx` has prev/next + page count, fullscreen toggle, and a "Download PDF" (`window.print()`) button; `Slides.tsx` exports the individual slide components. Shares `Badge` (`src/components/ui/Badge.tsx`, tones `neutral`/`brand`/`danger`) with the `/files` index.
- **No `/publisher` or `/get-started` route exists in this checkout** - `GetStartedButton`/`GetStartedTrigger` link straight out to `https://app.trykili.ai` instead of a local page. Don't assume either route when navigating or linking within the app.
