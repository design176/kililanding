# Archive

Code that isn't reachable from the `/` or `/advertiser` routes (or from the
shared layout/providers they both go through). Moved out of `src/` — and out
of TypeScript's/ESLint's project scope (see `tsconfig.json` / `eslint.config.mjs`)
— rather than deleted, so it's still around if any of it is needed again.

Paths mirror their original location under `src/`.

## What's here

- **`app/get-started/`, `app/old-home/`, `app/publisher/`** — routes that
  built and rendered but weren't linked from anywhere `/` or `/advertiser`
  point to. Removing them from `src/app` also removes them from the router.
- **`components/home-old/`** — the previous home page implementation,
  entirely superseded by the current `src/components/home/`.
- **`components/home/{ComparisonTable,CornerDots,DemoStage,HomeDemoBand,
  ScrollRevealHeading,TabTimerRing}.*`, `illustrations/`, `showcases/`** —
  left over from the home page rewrite; nothing in the live `/` route
  renders them.
- **`components/home/mockups/{ChatGptMockup,MiroMockup,ScribbleMockup,
  LoopingPlacementMockup}.*`** — only ever used by `/publisher`.
- **`components/Placeholder.tsx`** — unbuilt-visual placeholder, unused
  even by the pages it was written for.
- **`components/site/InteractiveFooterLogo.*`** — not wired into
  `SiteFooter` (or anywhere else).
- **`components/site/ScrollFadeIn.tsx`** — a GSAP ScrollTrigger fade-in
  wrapper, built for the bento/FAQ sections and then explicitly reverted.
- **`components/ui/{Badge,Tabs}.*`** — kept previously only because
  `public/retune.manifest.json` describes them for the retune design tool;
  neither is actually rendered anywhere.
- **`lib/use-timed-steps.ts`** — the staggered-reveal hook the archived
  mockups above used; nothing live calls it.
