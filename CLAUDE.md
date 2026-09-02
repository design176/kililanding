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

No test suite is configured - verify with `build` + `lint`.

**Env** (`.env.local`): `DATABASE_URL` (Neon Postgres, required by `/api/signup`) and `APP_ENV` - when it is `dev`, Vercel Analytics + GTM are skipped in `layout.tsx`. `NEXT_PUBLIC_SITE_URL` optionally overrides the `metadataBase` used for OG images; on Vercel it falls back to `VERCEL_PROJECT_PRODUCTION_URL`. `FILES_PASSWORD` gates the `/files` route - see below. `FILES_AUTH_DISABLED="true"` bypasses that gate entirely (local-only convenience; never set in prod).

## What this is

Marketing/landing site for **kili** ("get paid every time your agent thinks") - Next.js 16 App Router, React 19, TypeScript, CSS Modules. Routes: `/` (home), `/advertiser`, `/files` (password-gated), plus the `POST /api/signup` and `POST /api/files-auth` route handlers. There is no `/publisher`, `/get-started`, or `/old-home` route in this checkout - `GetStartedButton`/`GetStartedTrigger` link straight out to the app instead of a local page (see Get Started flow, below).

Read `AGENTS.md` first: Next 16 differs from older App Router conventions, and layout/page prop types are the generated globals (`LayoutProps<'/'>`) rather than hand-written interfaces.

## Design system - the one rule that matters

`src/app/globals.css` is the **single source of truth for color**, ported from the sibling `kili-app-demo` project. It defines the full token set twice - `:root, [data-theme="light"]` and `[data-theme="dark"]` - covering backgrounds, surfaces, borders, text ramps, brand green, danger, shadows, and the `--btn-mono-*` gloss variables.

Never introduce a hex value, rgba, or a second palette in a component stylesheet. Every `.module.css` references `var(--color-*)`, `var(--shadow-*)`, `var(--btn-mono-*)` so the light/dark swap works without per-component overrides. Inline SVGs follow the same rule - they take `fill`/`stroke="var(--color-…)"` (see `BenefitsBento`), except for third-party brand marks (Stripe purple, USDC blue), which keep their literal brand colors.

**Fonts are user-switchable, so never hard-code a family.** `--font-heading` (Satoshi, from Fontshare) and `--font-body` (Work Sans via `next/font/google` in `layout.tsx`, exposed as `--font-work-sans`) are declared in `globals.css` and applied globally - `--font-heading` to `h1`–`h6`, `--font-body` to `body`. `SiteSettingsProvider` (`src/components/site/SiteSettingsContext.tsx`) then **overwrites those two variables inline on `document.documentElement`** from the menus in `SettingsModal`, persisting the choice to `localStorage`. The alternates in `src/lib/fonts.ts` (five heading serifs, five body sans) are each registered in `layout.tsx` via `next/font/google` with `preload: false` - only Satoshi and Work Sans (the defaults) load eagerly; everything else fetches on demand the first time a visitor actually switches to it. Adding a font means adding both a `next/font/google` call in `layout.tsx` (or the `globals.css` `@import` if it's Fontshare-only, as Satoshi is) and an entry in `fonts.ts`. `SiteSettingsProvider` also drives independent heading/body **font-weight** overrides (`src/lib/fontWeights.ts`, applied via the `[data-heading-weight-override]`/`[data-body-weight-override]` rules in `globals.css`) - "Default" means "don't override, let each component's own CSS win."

**Theme**: hand-rolled, **not `next-themes`** (still in `package.json`, but nothing imports it). `src/components/site/ThemeProvider.tsx` owns a `'light' | 'dark'` state, persists it to `localStorage["theme"]`, and writes `document.documentElement.dataset.theme` in an effect. Consume it with `useTheme()` from that file - `ThemeToggle` (in `SiteFooter`), `ThemeShortcut` (**Alt+D** anywhere) and `SettingsModal` all do. `layout.tsx` hard-codes `data-theme='dark'` on `<html>` with `suppressHydrationWarning`, so dark is the SSR default and a light-theme visitor gets one frame of dark before the effect runs. Components that branch on `theme` must gate on `useMounted()` (`src/lib/use-mounted.ts`, a `useSyncExternalStore` shim). Light is a real, fully-tokenized theme - any new surface must look right in both.

`public/retune.manifest.json` describes the design system (component prop enums + tokens) for the retune visual editor. **There is currently no `<Retune>` component mounted in `layout.tsx`** - the manifest is an orphaned design-tool artifact in this checkout, not a contract; don't infer it reflects the live component API.

## Architecture notes

**Icon imports are split by render mode.** Server components import from `@phosphor-icons/react/dist/ssr`; client components import from `@phosphor-icons/react`. Getting this backwards throws at build time.

**Pages are server components that compose client islands.** `page.tsx` files stay server-rendered; interactivity lives in the `"use client"` leaves (mockups, modals, forms, canvas backgrounds, scroll reveals). Animation is `motion/react` (`motion` v13 - the Framer Motion successor) exclusively - both for declarative enter/exit (`motion.div`/`AnimatePresence`) and for imperative tweens via its functional `animate()` (`AdMetricsSection`'s counters, driven off an `IntersectionObserver` that disconnects after the first hit). There is no other animation library in this repo.

**Provider tree** (`src/app/providers.tsx`, mounted once in `layout.tsx`): `ThemeProvider` → `ThemeShortcut` → `SiteSettingsProvider` → `GetStartedModalProvider` → children + `GetStartedModal`, with `SettingsModal` as a sibling of the modal provider. Both modals are mounted once here rather than per-page. `SettingsModal` owns its own open state and opens on **Cmd/Ctrl+K** - there is no trigger button.

### The home page

`/` (`src/app/page.tsx`) composes: `SiteNav`, `HeroReveal` (hero copy + `InstallCommand`), `MoneyNoiseBackground`, `HomeDemoSection`, `AdMetricsSection`, `BenefitsBento`, a second `MoneyNoiseBackground`-backed install CTA band, `FaqSection`, `SiteFooter`. Every file directly under `src/components/home/` is live - there is no dead sibling set and no `home-old/` or `/old-home` in this checkout.

`home/mockups/` holds `WindowChrome` (shared macOS-style window frame) plus `CodeEditorMockup` and `ClaudeCodeMockup`. `CodeEditorMockup.tsx` exports three components: the default `CodeEditorMockup` (the bento's closing tile - a VS Code window with Claude Code docked on the right), `RevenueShowcase` (the earnings-callout Claude Code panel, rendered on the "I use AI Agents" side of the home page toggle) and `ComingSoonMockup` (a stubbed-out VS Code window for the "I build AI Platforms" side). `/advertiser` imports `ClaudeCodeMockup` separately.

**Live home components:**
- `HomeDemoSection` - renders `AudienceSwitcher` (a two-way "I use AI Agents" / "I build AI Platforms" toggle) above either `RevenueShowcase` or `ComingSoonMockup` from `CodeEditorMockup.tsx`, depending which side is selected.
- `AdMetricsSection` - counts up via `motion/react`'s functional `animate()` (a plain 0→target number tween with an `onUpdate` callback) writing into `DotMatrixCounter`'s text ref, which redraws the dot-matrix digits on its own rAF loop.
- `BenefitsBento` - the bento grid, with inline-SVG visuals (CPM graph, payout marks) and the `KiliMark` component (`src/components/Logo.tsx`) tokenized as above; its closing tile renders `CodeEditorMockup`.
- `FaqSection` - accordion-style FAQ list; the active answer's leading mark is `KiliMark` as well.
- `InstallCommand` (`src/components/site/InstallCommand.tsx`) - the primary hero + CTA affordance; copies an install command to the clipboard and swaps its caption briefly.
- `MoneyNoiseBackground` - a canvas of drifting `$`/`₹` glyphs over hand-rolled value noise, with a cursor-following highlight and trail. Props `interactive` and `maxOpacity` tune it per placement; it sizes itself to `canvas.parentElement`, so the parent needs `position: relative` and a real height. Pauses its redraw loop via `IntersectionObserver` while scrolled out of view.
- `SiteFooter` takes optional `heading`/`body` and doubles as the page's closing CTA - the home page passes its final headline in rather than rendering a separate CTA section.

**`/advertiser`** is written as data - arrays of cells, panels and FAQ entries - rendered by the shared components in `src/components/marketing/MarketingSection.tsx` (`MarketingHero`, `Band`, `CellGrid`, `Split`, `Panel`, `FormatCard`, `PlacementPreview`, `PerformancePreview`, `StepPreview`, `Faq`, plus the `MARKETING_CLOSE` shared closing block) against `marketing.module.css`. Add a section by adding a `<Band>`, not by hand-writing the `band > wrap > head` markup. Unbuilt visuals use `<Placeholder />`. There is no `/publisher` page in this checkout.

**Get Started flow** is context-driven, and there is no local `/get-started` page: `GetStartedModalContext` (`useGetStartedModal()`) holds open/close state for `GetStartedModal` (rendering `SignupForm`), which `GetStartedButton`/`GetStartedTrigger` open from anywhere - `GetStartedButton` additionally exports `GET_STARTED_URL` (`https://app.trykili.ai`), which both it and `GetStartedTrigger` link straight out to in a new tab.

**Signup validation lives in `src/lib/signup.ts`** and is imported by both sides: `SignupForm` runs it client-side for instant feedback, `api/signup/route.ts` runs it again as the authority. Contacts are either an email or an `@handle` (with `PlatformPicker` choosing the platform for handles, defaulting to `x`); `resolveContactPlatform` decides which. The route calls `ensureTable()` on every request: `CREATE TABLE IF NOT EXISTS coming_soon_signups` plus an idempotent `ADD COLUMN IF NOT EXISTS`, so schema changes go there rather than in a migration tool.

**Shared hooks live in `src/lib/`:**
- `useMounted()` - hydration-safe mount flag; required before branching on `theme`.
- `cx(...)` - the class-joining helper used instead of hand-rolled template literals.
- `useTypewriter(text, { enabled, speed, settleMs, onSettle })` - the "prompt types itself, pauses, auto-submits" beat every mockup opens on.
- `useTimedSteps(delays, { enabled, initial })` - staggered reveals. `delays` must be a module-level constant; a new array restarts the schedule.
- `useAutoScrollToBottom(ref, key)` - keeps a streaming transcript pinned to its newest line; no-ops when there's nothing to scroll.
- `useBodyScrollLock(isOpen)` - locks `document.body` scroll while a modal is open, restoring the previous value on close. Shared by `GetStartedModal` and `SettingsModal`.

The typewriter/timed-steps/auto-scroll hooks are used only by the `home/mockups/` components (live on `/` and `/advertiser`).

**`src/components/ui/`** holds the primitives ported from the app: `Button` and `Badge` (`Tabs` no longer exists in this checkout). `Badge` is used by the `/files` index for its status pill; `retune.manifest.json` describes both for the design tool but is not wired into the live app (see above). `Button` takes `variant` (primary/secondary/ghost/destructive/accent), `size` (sm/md/lg/xl), plus marketing-specific props: `pill` for the fully-rounded shape this site uses almost everywhere, `iconOnly` for a square icon-only shape (width tracks the size's own height via `aspect-ratio` - never hand-pick a pixel width/height for an icon button), and `forceState` for rendering a fake hover/active state inside mockups.

**Shared keyframes** (`kili-caret-blink`, `kili-dot-bounce`) are declared once at the bottom of `globals.css` and referenced by name from the mockup modules - CSS Modules leaves an animation name alone when the file has no local `@keyframes` of that name.

**Path alias**: `@/*` → `src/*`.

## `/files` - password gate

`src/proxy.ts` (Next 16's `proxy` convention, formerly `middleware`) matches `/files/:path*`, letting `/files/login` through and redirecting everything else there unless a valid `files_auth` cookie is present (or `FILES_AUTH_DISABLED=true`, which bypasses the check entirely). `POST /api/files-auth` (`src/app/api/files-auth/route.ts`) checks the submitted password against `FILES_PASSWORD` and, on success, sets that cookie to a SHA-256 hash of the password (`src/lib/files-auth.ts`) - never the plaintext - httpOnly, `path=/files`, 7-day expiry. `src/app/files/login/page.tsx` renders `FilesLoginForm` (`src/components/files/`), which posts to that route and redirects to the `next` query param (or `/files`) on success; it also remembers the password in `localStorage` (`files_password`) and auto-submits it on return visits, clearing the stored value if it's rejected.

`src/app/files/page.tsx` renders the index: a card listing `FILES` from `src/lib/files-index.ts` (`{ title, href, status }`, `status` drives a `Badge`). Add a row there plus a route under `src/app/files/` to publish a new gated item.

**Pitch deck** (`/files/scribble_deck`, `src/components/files/deck/`) is a client-side slide viewer - `ScribbleDeck.tsx` owns slide index state, arrow-key navigation, a `ResizeObserver`-driven scale-to-fit stage (slides are authored at a fixed 1920×1080 and scaled/translated to fit the viewport), and native Fullscreen API support. `DeckNavbar.tsx` renders the logo, prev/next arrows with a page-count readout, a fullscreen toggle, `ThemeToggle`, and a "Download PDF" button (`window.print()`). `Slides.tsx` exports the deck's slide components (currently: `TitleSlide`, `ResearchSlide`, `AgenticSlide`, `GeoVsAdsSlide`, `ProductSlide`, `GeoProofSlide`, `AdNetworkSlide`, `FintechFocusSlide`, `PositioningSlide`, `TeamSlide`, `RoundSlide`, `CapTableSlide`). `Badge` (`src/components/ui/Badge.tsx`, tones `neutral`/`brand`/`danger`) is shared with the `/files` index, which lists this deck as its one entry (`src/lib/files-index.ts`).
