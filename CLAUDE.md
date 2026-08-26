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

No test suite is configured — verify with `build` + `lint`.

**Env** (`.env.local`): `DATABASE_URL` (Neon Postgres, required by `/api/signup`) and `APP_ENV` — when it is `dev`, Vercel Analytics + GTM are skipped in `layout.tsx`. `NEXT_PUBLIC_SITE_URL` optionally overrides the `metadataBase` used for OG images; on Vercel it falls back to `VERCEL_PROJECT_PRODUCTION_URL`.

## What this is

Marketing/landing site for **kili** ("get paid every time your agent thinks") — Next.js 16 App Router, React 19, TypeScript, CSS Modules. Routes: `/` (home), `/advertiser`, `/publisher`, `/get-started`, `/old-home`, plus the `POST /api/signup` route handler.

Read `AGENTS.md` first: Next 16 differs from older App Router conventions, and layout/page prop types are the generated globals (`LayoutProps<'/'>`) rather than hand-written interfaces.

## Design system — the one rule that matters

`src/app/globals.css` is the **single source of truth for color**, ported from the sibling `kili-app-demo` project. It defines the full token set twice — `:root, [data-theme="light"]` and `[data-theme="dark"]` — covering backgrounds, surfaces, borders, text ramps, brand green, danger, shadows, and the `--btn-mono-*` gloss variables.

Never introduce a hex value, rgba, or a second palette in a component stylesheet. Every `.module.css` references `var(--color-*)`, `var(--shadow-*)`, `var(--btn-mono-*)` so the light/dark swap works without per-component overrides. Inline SVGs follow the same rule — they take `fill`/`stroke="var(--color-…)"` (see `BenefitsBento`), except for third-party brand marks (Stripe purple, USDC blue), which keep their literal brand colors.

**Fonts are user-switchable, so never hard-code a family.** `--font-heading` (Satoshi, from Fontshare) and `--font-body` (Work Sans via `next/font/google` in `layout.tsx`, exposed as `--font-work-sans`) are declared in `globals.css` and applied globally — `--font-heading` to `h1`–`h6`, `--font-body` to `body`. `SiteSettingsProvider` then **overwrites those two variables inline on `document.documentElement`** from the menus in `SettingsModal`; the alternates listed in `src/lib/fonts.ts` are all preloaded by the second `@import` at the top of `globals.css`. Adding a font means adding it to *both* the `@import` URL and the array in `fonts.ts`.

**Theme**: hand-rolled, **not `next-themes`** (still in `package.json`, but nothing imports it). `src/components/site/ThemeProvider.tsx` owns a `'light' | 'dark'` state, persists it to `localStorage["theme"]`, and writes `document.documentElement.dataset.theme` in an effect. Consume it with `useTheme()` from that file — `ThemeToggle` (in `SiteFooter`), `ThemeShortcut` (**Alt+D** anywhere) and `SettingsModal` all do. `layout.tsx` hard-codes `data-theme='dark'` on `<html>` with `suppressHydrationWarning`, so dark is the SSR default and a light-theme visitor gets one frame of dark before the effect runs. Components that branch on `theme` must gate on `useMounted()` (`src/lib/use-mounted.ts`, a `useSyncExternalStore` shim). Light is a real, fully-tokenized theme — any new surface must look right in both.

`public/retune.manifest.json` describes the design system (component prop enums + tokens) for the retune visual editor (`<Retune hotkey='alt+e' />` in `layout.tsx`). It is not imported by app code and has drifted from the source; treat it as a design-tool artifact, not a contract.

## Architecture notes

**Icon imports are split by render mode.** Server components import from `@phosphor-icons/react/dist/ssr`; client components import from `@phosphor-icons/react`. Getting this backwards throws at build time.

**Pages are server components that compose client islands.** `page.tsx` files stay server-rendered; interactivity lives in the `"use client"` leaves (mockups, modals, forms, canvas backgrounds, scroll reveals). Animation is `motion/react` (`motion` v13 — the Framer Motion successor) for enter/exit, plus `gsap` for imperative timelines (`AdMetricsSection`'s odometer wheels, driven off an `IntersectionObserver` that disconnects after the first hit).

**Provider tree** (`src/app/providers.tsx`, mounted once in `layout.tsx`): `ThemeProvider` → `ThemeShortcut` → `SiteSettingsProvider` → `GetStartedModalProvider` → children + `GetStartedModal`, with `SettingsModal` as a sibling of the modal provider. Both modals are mounted once here rather than per-page. `SettingsModal` owns its own open state and opens on **Cmd/Ctrl+K** — there is no trigger button.

### The home page has been rewritten, and the old one is still in the tree

`/` (`src/app/page.tsx`) composes only: `SiteNav`, `MoneyNoiseBackground`, `HomeDemoSection`, `AdMetricsSection`, `BenefitsBento`, `InstallCommand`, `FaqSection`, `SiteFooter`.

Everything else under `src/components/home/` — `HomeDemoBand`, `DemoStage`, `TabTimerRing`, `ComparisonTable`, `AudienceSwitcher`, `CornerDots`, `ScrollRevealHeading`, `illustrations/`, `showcases/` — is **unreferenced by any live route**. The previous home page survives verbatim at `/old-home`, importing a byte-for-byte duplicate of those files from `src/components/home-old/`. Before editing anything in `home/`, check whether it is actually reachable; a change there very likely needs the same change in `home-old/`, or belongs in neither.

The exception is `home/mockups/`, which is entirely live: the home page's focus tile renders `CodeEditorMockup`, `/advertiser` imports `ClaudeCodeMockup`, and `/publisher` imports `ScribbleMockup` and `LoopingPlacementMockup` (which cycles `ChatGpt`, `ClaudeCode` and `Miro` in turn). All of them share `WindowChrome`.

**Live home components:**
- `HomeDemoSection` — the side-by-side "without kili / with kili" activity strips. Both sides run `useActivityClock`, a `setInterval(50ms)` that derives the current word and elapsed seconds from a single `performance.now()` origin, so the timers never drift apart.
- `AdMetricsSection` — GSAP odometer digits; `createWheel` gives less-significant digits more rotations so the reels read as one number counting up.
- `BenefitsBento` — the bento grid, with inline-SVG visuals (CPM graph, payout marks) tokenized as above.
- `InstallCommand` — the primary hero + CTA affordance; copies `npx -y @kili-ai/install` to the clipboard and swaps its caption for 1.8s.
- `MoneyNoiseBackground` — a canvas of drifting `$`/`₹` glyphs over hand-rolled value noise, with a cursor-following highlight and trail. Props `interactive` and `maxOpacity` tune it per placement; it sizes itself to `canvas.parentElement`, so the parent needs `position: relative` and a real height.
- `CodeEditorMockup` — the bento's closing tile: a VS Code window with Claude Code docked on the right, mid-turn, the sponsored placement in the agent panel rather than over the editor. Purely presentational (nothing inside is focusable). The Explorer is permanently collapsed (the file-tree markup is gone; its CSS is left in place), and the window narrows by **dropping panes** — activity bar, then the editor itself — via `@container` queries on `.editor`, so it responds to the width the tile actually gives it rather than the viewport. Its `RevenueShowcase` and `EarningsPane` exports are parked, not used anywhere.
- `SiteFooter` takes optional `heading`/`body` and doubles as the page's closing CTA — the home page passes its final headline in rather than rendering a separate CTA section.

**`/advertiser` and `/publisher`** are the same page skeleton with different copy. Both are written as data — arrays of cells, panels and FAQ entries — rendered by the shared components in `src/components/marketing/MarketingSection.tsx` (`MarketingHero`, `Band`, `CellGrid`, `Split`, `Panel`, `FormatCard`, `PlacementPreview`, `PerformancePreview`, `StepPreview`, `Faq`, plus the `MARKETING_CLOSE` shared closing block) against `marketing.module.css`. Add a section by adding a `<Band>`, not by hand-writing the `band > wrap > head` markup. Unbuilt visuals use `<Placeholder />`. Note that `SiteNav` and `SiteFooter` currently link only to `/advertiser` — `/publisher` still builds and renders but is not linked from anywhere.

**Get Started flow** is context-driven: `GetStartedModalContext` (`useGetStartedModal()`) holds open/close state; `GetStartedButton`/`GetStartedTrigger` open it from anywhere. Both the modal and `/get-started` render the same `SignupForm`.

**Signup validation lives in `src/lib/signup.ts`** and is imported by both sides: `SignupForm` runs it client-side for instant feedback, `api/signup/route.ts` runs it again as the authority. Contacts are either an email or an `@handle` (with `PlatformPicker` choosing the platform for handles, defaulting to `x`); `resolveContactPlatform` decides which. The route calls `ensureTable()` on every request: `CREATE TABLE IF NOT EXISTS coming_soon_signups` plus an idempotent `ADD COLUMN IF NOT EXISTS`, so schema changes go there rather than in a migration tool.

**Shared hooks live in `src/lib/`:**
- `useMounted()` — hydration-safe mount flag; required before branching on `theme`.
- `cx(...)` — the class-joining helper used instead of hand-rolled template literals.
- `useTypewriter(text, { enabled, speed, settleMs, onSettle })` — the "prompt types itself, pauses, auto-submits" beat every mockup opens on.
- `useTimedSteps(delays, { enabled, initial })` — staggered reveals. `delays` must be a module-level constant; a new array restarts the schedule.
- `useAutoScrollToBottom(ref, key)` — keeps a streaming transcript pinned to its newest line.

The last three are used only by the mockups (live ones on `/advertiser` and `/publisher`, dead ones under `home/` and `home-old/`).

**`src/components/ui/`** holds the primitives ported from the app. Only `Button` is currently used — `Badge` and `Tabs` are unreferenced but kept because `retune.manifest.json` describes them for the design tool. `Button` takes `variant` (primary/secondary/ghost/destructive/accent), `size` (sm/md/lg/xl), plus two marketing-specific props: `pill` for the fully-rounded shape this site uses almost everywhere, and `forceState` for rendering a fake hover/active state inside mockups.

**Shared keyframes** (`kili-caret-blink`, `kili-dot-bounce`) are declared once at the bottom of `globals.css` and referenced by name from the mockup modules — CSS Modules leaves an animation name alone when the file has no local `@keyframes` of that name.

**Path alias**: `@/*` → `src/*`.
