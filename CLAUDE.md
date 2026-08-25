# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Dev server on :3000
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # ESLint (flat config, `eslint` with no args)
```

No test suite is configured.

**Env** (`.env.local`): `DATABASE_URL` (Neon Postgres, required by `/api/signup`) and `APP_ENV` — when it is `dev`, Vercel Analytics + GTM are skipped in `layout.tsx`. `NEXT_PUBLIC_SITE_URL` optionally overrides the `metadataBase` used for OG images; on Vercel it falls back to `VERCEL_PROJECT_PRODUCTION_URL`.

## What this is

Marketing/landing site for **kili** ("The Ad Network for AI apps") — Next.js 16 App Router, React 19, TypeScript, CSS Modules. Routes: `/` (home), `/advertiser`, `/publisher`, `/get-started`, plus the `POST /api/signup` route handler.

Read `AGENTS.md` first: Next 16 differs from older App Router conventions, and layout/page prop types are the generated globals (`LayoutProps<'/'>`) rather than hand-written interfaces.

## Design system — the one rule that matters

`src/app/globals.css` is the **single source of truth for color**, ported from the sibling `kili-app-demo` project. It defines the full token set twice — `:root, [data-theme="light"]` and `[data-theme="dark"]` — covering backgrounds, surfaces, borders, text ramps, brand green, danger, shadows, and the `--btn-mono-*` gloss variables.

Never introduce a hex value, rgba, or a second palette in a component stylesheet. Every `.module.css` references `var(--color-*)`, `var(--shadow-*)`, `var(--btn-mono-*)` so the light/dark swap works without per-component overrides.

**Fonts** are two, not one: `--font-heading` is Satoshi, pulled from Fontshare via `@import` at the top of `globals.css` and applied to all `h1`–`h6` globally; `--font-body` is Work Sans via `next/font/google` in `layout.tsx`. Use the variables, not the family names.

**Theme**: `providers.tsx` sets `next-themes` to `attribute="data-theme"`, `defaultTheme="dark"`, `enableSystem={false}`. Dark is the default, but light is a real, fully-tokenized theme — `ThemeToggle` (in `SiteFooter`) and `ThemeShortcut` (**Alt+D** anywhere) switch between them, so any new surface must look right in both. Components that branch on `theme` must gate on `useMounted()` (`src/lib/use-mounted.ts`, a `useSyncExternalStore` shim) to avoid a hydration mismatch.

`public/retune.manifest.json` describes the design system (component prop enums + tokens) for the retune visual editor. It is not imported by app code and has drifted from the source; treat it as a design-tool artifact, not a contract.

## Architecture notes

**Icon imports are split by render mode.** Server components import from `@phosphor-icons/react/dist/ssr`; client components import from `@phosphor-icons/react`. Getting this backwards throws at build time.

**Pages are server components that compose client islands.** `page.tsx` files stay server-rendered; interactivity lives in the `"use client"` leaves (demo band, mockups, modal, forms, scroll reveals). Animation uses `motion/react` (`motion` v13 — the Framer Motion successor), most often `AnimatePresence` + `motion.div` keyed to force a re-mount.

**Shared hooks live in `src/lib/`** and exist because several components needed the same thing:
- `useTypewriter(text, { enabled, speed, settleMs, onSettle })` — the "prompt types itself, pauses, auto-submits" beat every mockup opens on.
- `useTimedSteps(delays, { enabled, initial })` — staggered reveals (ChatGPT's answer, Scribble's paragraphs, Miro's loading messages). `delays` must be a module-level constant; a new array restarts the schedule.
- `useAutoScrollToBottom(ref, key)` — keeps a streaming transcript pinned to its newest line.
- `useMounted()` — hydration-safe mount flag (a `useSyncExternalStore` shim).
- `cx(...)` — the class-joining helper used instead of hand-rolled template literals.

**Home demo band** (`src/components/home/`) is the most intricate piece and spans several files:
- `HomeDemoBand` owns `active` (tab index) and a `cycle` counter, and auto-advances every `TAB_DURATION` (12s). `cycle` is bumped on *every* selection — including re-clicking the current tab — so downstream animations restart.
- `DemoStage` cross-fades on `key={`${active}-${cycle}`}`, and renders a persistent empty `WindowChrome` underneath so the window border never blinks during the exit→enter gap.
- `TabTimerRing` restarts its countdown via the `animationKey` prop, same `cycle` trick.
- The four slides are `mockups/{ChatGpt,ClaudeCode,Miro,Scribble}Mockup`, all sharing `WindowChrome`.

**Get Started flow** is context-driven: `GetStartedModalContext` (`useGetStartedModal()`) holds open/close state; `GetStartedButton`/`GetStartedTrigger` open it from anywhere; the modal itself is mounted once in `providers.tsx`. Both the modal and `/get-started` render the same `SignupForm`.

**Signup validation lives in `src/lib/signup.ts`** and is imported by both sides: `SignupForm` runs it client-side for instant feedback, `api/signup/route.ts` runs it again as the authority. Contacts are either an email or an `@handle` (with `PlatformPicker` choosing the platform for handles, defaulting to `x`); `resolveContactPlatform` decides which. The route calls `ensureTable()` on every request: `CREATE TABLE IF NOT EXISTS coming_soon_signups` plus an idempotent `ADD COLUMN IF NOT EXISTS`, so schema changes go there rather than in a migration tool.

**`/advertiser` and `/publisher`** are the same page skeleton with different copy. Both are written as data — arrays of cells, panels and FAQ entries — rendered by the shared components in `src/components/marketing/MarketingSection.tsx` (`MarketingHero`, `Band`, `CellGrid`, `Split`, `Panel`, `FormatCard`, `Faq`) against `marketing.module.css`. Add a section by adding a `<Band>`, not by hand-writing the `band > wrap > head` markup. Unbuilt visuals use `<Placeholder />`; replacing one with a real mockup is the expected direction of travel.

**The two home-page showcases** (`showcases/AdvertiserShowcase`, `showcases/PublisherShowcase`) share their outer tile, inset card and points list via `Showcase.tsx` / `Showcase.module.css`; each showcase module now only styles its own interior.

**`src/components/ui/`** holds the primitives ported from the app. Only `Button` is currently used — `Badge` and `Tabs` are unreferenced but kept because `retune.manifest.json` describes them for the design tool. `Button` takes `variant` (primary/secondary/ghost/destructive/accent), `size` (sm/md/lg/xl), plus two marketing-specific props: `pill` for the fully-rounded shape this site uses almost everywhere, and `forceState` for rendering a fake hover/active state inside mockups.

**Shared keyframes** (`kili-caret-blink`, `kili-dot-bounce`) are declared once at the bottom of `globals.css` and referenced by name from the mockup modules — CSS Modules leaves an animation name alone when the file has no local `@keyframes` of that name.

**Path alias**: `@/*` → `src/*`.
