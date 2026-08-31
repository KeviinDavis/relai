// Hero Mobile — Variant 11 (sandbox) — consumed by
// app/sandbox/hero-mobile-11/page.js via
// <HeroMobile11 content={heroMobile11} board={dashboard} />.
//
// This variant DUPLICATES the composite hero: desktop is byte-identical, only
// the <768px branch changes (a frosted segmented bottom sheet). The scene/copy
// and the board data are the REAL ones, re-exported verbatim — the mobile sheet
// is the same board reflowed, never new content (7 at risk / 3 due today at
// Pier T / $4,240 exposure stay intact).

import { compositeHero } from "./composite-hero";

// Mobile-only product description, shown centered beneath the headline on the
// mobile branch (desktop keeps the live hero's copy, byte-for-byte identical —
// the paragraph is `display: none` above the breakpoint). Condensed from the
// live home hero's `text` in home.js ("connecting vessel, terminal, yard, and
// truck into a single, real-time system … one coordinated … flow").
export const heroMobile11 = {
  ...compositeHero,
  description:
    "One coordinated, real-time system across vessel, terminal, yard, and truck.",
};

export { dashboard } from "./dashboard";

export const meta = {
  title: "Hero Mobile 11, Sandbox",
  description:
    "Composite hero, desktop identical. Mobile is a frosted segmented bottom sheet (Feed / Console / Exceptions) over full-bleed blue-hour footage.",
};
