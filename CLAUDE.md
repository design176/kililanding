# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

No test suite is configured yet.

## Architecture

This is a **Next.js App Router** project using TypeScript and React 19.

- `src/app/` — All routes live here. `layout.tsx` is the root layout; `page.tsx` is the home route (`/`).
- `src/app/globals.css` — Global styles applied via the root layout.
- `public/` — Static assets served at the root path.

**Path alias**: `@/*` resolves to `src/*` (configured in `tsconfig.json`).

**Styling**: CSS Modules (`.module.css`) for component-scoped styles alongside `globals.css`.

**Fonts**: Geist (sans and mono) loaded via `next/font/google` in the root layout and exposed as CSS variables (`--font-geist-sans`, `--font-geist-mono`).

**Config**: `next.config.ts` is minimal with no custom options set.

**ESLint**: Flat config (`eslint.config.mjs`) extending `next/core-web-vitals` and `next/typescript`.
