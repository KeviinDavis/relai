# Autostudio

Project follow-along log. Newest changelog entries first.

---

## 1. Original Brief

Set up an empty Next.js (App Router) project as a **reusable build template**:

1. Write a root `CLAUDE.md` defining an **autonomous build contract** — investigate
   the repo silently, batch all open questions once, get one approval, then build
   to completion. JavaScript/JSX + CSS Modules only (never TypeScript). Reuse
   existing primitives; don't redesign or invent folders/tokens.
2. Scaffold the template skeleton: RootLayout (`<main>` + Header/Footer slots),
   `tokens.css`, `globals.css`, and the four layout primitives
   (Section / Container / Button / Media), plus a project-log README.

---

## 2. Stack & Foundation

- **Framework:** Next.js 16 (App Router) · React 19
- **Build:** React Compiler enabled (`reactCompiler: true`)
- **Language:** JavaScript / JSX only — CSS Modules for styling (no TS, no Tailwind)
- **Path alias:** `@/*` → `./src/*` (via `jsconfig.json`)
- **Fonts:** `next/font` (Inter) exposed as `--font-primary`
- **Tokens:** `src/styles/tokens.css` — fluid `clamp()` type scale, rem spacing
  scale, semantic color tokens, radius/z-index/transition tokens

### Structure

```
src/
  app/
    layout.js          RootLayout — Header / <main> / Footer + skip link
    page.js            Home (Section > Container shell)
    globals.css        reset + base type + a11y; imports tokens.css
  styles/
    tokens.css         design tokens (single source of truth)
  components/
    Section/   index.jsx + Section.module.css
    Container/ index.jsx + Container.module.css
    Button/    index.jsx + Button.module.css
    Media/     index.jsx + Media.module.css
    Header/    index.jsx + Header.module.css
    Footer/    index.jsx + Footer.module.css
```

Each component is a PascalCase folder with `index.jsx` (importable as
`@/components/Name`) and a co-located `Name.module.css`.

---

## 3. Changelog

_Newest first._

### 2026-06-23 — Fidelity tweaks: capsule sizing, mobile hero bleed, product line spacing

Iteration pass against side-by-side screenshots of the live site (home + product):

- **Eyebrow capsules no longer stretch.** The `Eyebrow` capsule is `inline-block`,
  but as a *direct child of a column flexbox* (default `align-items: stretch`) it
  was being stretched to full column width — visible on the home **"Product"** box
  and the product page's **"Platform / Why Korr / Feature / FAQ"** boxes. Added
  `align-self: flex-start` to the base `.capsule` (one fix, all instances; `Hero`
  had already worked around it locally). Home "Why Korr" and "Product" now match in
  size and align at the same left edge.
- **Mobile hero is full-bleed.** `Hero .mediaContainer` dropped its mobile
  `padding-inline` (now `0`) and the media goes square-edged (`border-radius: 0`)
  on mobile; the gutter inset + `--radius-lg` are restored at `≥1024px`.
- **Product-page line spacing tightened.** `SplitSection .paragraph`,
  `TextSection .paragraph`, and `Faq .text` went from `line-height: 1.55` → `1.4`,
  matching the home page's body rhythm (~1.35–1.4) and the source.

### 2026-06-23 — Unified the responsive breakpoint to the source's 1024px

The source's desktop layout kicks in at **1024px** (135 rules at `min-width:1024px`
vs only 6 at 768px). Moved every component's desktop breakpoint from 768→1024
(`Container`, `Hero`, `Intro`, `Stepper`, `Testimonials`, `Shortcuts`, `Footer`,
`SplitSection`, `FormSection`). Now the 768–1024px tablet range mirrors the source
exactly — single-column stacked layouts + Menu chip below 1024px, desktop grids +
pill nav at/above it. Verified the boundary at 768 / 1000 / 1024 / 1280 with
headless screenshots (home + about). Build + ESLint clean.

### 2026-06-23 — Pixel-polish pass + mobile stepper scroller

Ran a per-section **pixel-fidelity audit** (a multi-agent workflow: one agent per
section diffed our CSS against the live site's production CSS, then an adversarial
verifier kept only source-cited corrections — 58 confirmed). Applied them:

- **Buttons:** hover is now the brand green `#34d601` (source `--main`), not black;
  chip padding `6px 8px 5px`.
- **Nav** swaps pill ⇄ Menu chip at **1024px** (source) instead of 768px, so tablet
  shows the Menu chip; tightened the home-pill gap, desktop insets to `24px`,
  regular-weight wordmark, sans-serif menu chip.
- **Intro** → real 6-col grid (capsule col 1, body cols 2–6), no top padding,
  green link hover, source body sizing (16/22 → 24/32).
- **Stepper** → 8-col block grid (tag 2/+2, text 4/+4), portrait card
  (`aspect 100/111`), `80→120px` section rhythm.
- **Testimonials** → card radius `8→16px` and near-square→`4/5` aspect across the
  breakpoint, source mobile rhythm (`data` 16/90 → 32/24), simplified heading.
- **Shortcuts** → corrected inverted margins, big-text desktop `32px/−0.01em`,
  black card text, `50px` card gap.
- **Footer** → much tighter source spacing (`pad-top 16→34`, `main mb 26→34`),
  card image radius/aspect, `span 4/-1` panel, underline-on-hover bottom links.

**Mobile Stepper horizontal scroller** — below 1024px the dark card sits on top and
the text blocks become a horizontal **scroll-snap** row (`flex 0 0 76.67vw`,
source value); the active step now syncs to **horizontal** scroll on mobile and
**vertical** scroll on desktop via `gsap.matchMedia` (tap a block to snap to it).

Re-verified with headless-Chrome screenshots at 390 / 900 / 1440 against the live
site. `next build` (5 static routes) + ESLint clean.

### 2026-06-23 — Fidelity pass: rebuilt the UI to match the real site

The first build had the right content but a generic UI. Using the live site's
DevTools (full DOM + `__NEXT_DATA__`), production CSS, and section-by-section
screenshots, reworked the homepage to match the actual design, then propagated
the shared chrome to every page. Target: pixel-close including animations.

**Foundation (real design system)**
- **Type scale** rebuilt to the source's px scale: hero display `32 → 64 → 78px`
  at line-height `1.0` / `−0.03em`; section headings `24 → 32px` (were ~56px).
- **Full-bleed 12-col grid** with `24/16px` gutters (source `px--container`),
  breakpoints `768/1024`, nav height `68px`, radii `4/8/16`.
- **Monochrome palette** — black/white/grays with green as a rare accent (only
  the book-a-demo illustration). Removed the heavy green-pill styling.

**Components reworked to the source anatomy**
- **Eyebrow → capsule** (`SectionTag`): mono 12px label in a 1px border pill;
  variants default / dark / active (filled). Used everywhere.
- **Button → neutral chip** (`btnTag`): `gray3` fill, `gray1` text, 4px radius.
- **Header** is now the floating pill nav — SVG wordmark top-left + links pill
  top-right that merges into a centered pill on scroll; mobile `Menu` chip.
  Added a `Logo` component with the real SVG path.
- **Hero** is white with a huge black heading (left) + excerpt/CTAs (right) and a
  full-width media block below (wide `37.79%` banner desktop / portrait mobile) —
  not the previous dark video-overlay.
- **Footer** merged the "future of insurance" band + the demo card into one dark
  block with the bottom link grid + © 2026; removed the standalone `CtaBand`.

**New sections**
- **Stepper** — the scroll-driven Product feature stepper: stacked text blocks
  (left) sync a sticky dark line-art card (right) via GSAP ScrollTrigger; active
  step drives the capsule/counter and crossfades the image.
- **Testimonials** — the dark quote/logo carousel that was missing entirely
  (Robert Pick/Tokio Marine, Chad Hersh/AWS, Wellcove), Prev · 1/3 · Next.
- **Intro** (Why Korr) and **Shortcuts** (Learn More + two wide image-pair cards)
  rebuilt to the 12-col compositions.

**Motion** — GSAP scroll-reveal (`Reveal`) wraps each home section, mirroring the
source's per-section opacity/transform reveals; reduced-motion is a no-op.

**Assets** — added the 3 missing stepper line-art images; reused testimonial
logos. Removed the replaced components (`CtaBand`, `Carousel`,
`CarouselSection`, `CardGrid`).

**Verification** — `next build` (all 5 routes static) + ESLint clean. Self-QA'd
with headless-Chrome screenshots at 1440 (home/product/about/book-a-demo) and
390 (mobile home) against the live screenshots.

### 2026-06-23 — First reuse: full rebuild of gokorr.com (Korr)

Rebuilt the live **Korr** marketing site (https://www.gokorr.com) on this
template — all five routes, real brand, real scraped assets. Single approval up
front (scope = home + all routes; assets = scraped from live; brand = exact
match; contact form = UI-only).

**Brand foundation**
- **Self-hosted ABCFavorit** (Korr's licensed typeface) via `@font-face` in
  `globals.css` — Regular/Bold/Italic/BoldItalic + Mono, woff2 + woff. Dropped
  the `next/font` Inter import. Mono drives eyebrow/label styling
  (`--font-secondary`). **Why:** exact-match was requested; the template's
  font-system slot was swapped for local files (see Open Items re: licensing).
- **Korr color tokens** filled into the "customize per project" block of
  `tokens.css` — black `#20231f`, signature green `#34d601`, grays
  `#484b47 / #8f908e / #e9e9e9`. Added semantic `--color-bg-dark`,
  `--color-text-muted`, `--color-stroke-muted`, `--color-green`. Fixed system
  tokens (scale/spacing/radius) left untouched.
- **Button** reshaped to Korr's pill style (`border-radius: 100vmax`) with
  `primary` (green), `secondary` (outline), `light` + `solid` (for dark/photo
  backgrounds).

**New components** (all reuse Section/Container/Button/Media):
`Eyebrow`, `Hero` (video/image/plain background + scrim), `TextSection`,
`SplitSection` (alternating image/text), `CardGrid`, `Carousel` (client) +
`CarouselSection`, `Faq` (native `<details>` accordion), `CtaBand` (shared
"future of insurance" band), `ContactForm` (client, UI-only fake-success),
`ContactModal` (client), `FormSection`. `Header` rebuilt as a client nav
(transparent→solid on scroll, mobile hamburger, Contact modal); `Footer` rebuilt
as the dark "Get in touch" block with nav + LinkedIn + © 2025 Korr.

**Pages** (`app/`): `/` (hero video, statement, Why Korr, product carousel,
two-card grid), `/product` (hero, platform, three feature splits, dark stat
band, 9-item FAQ), `/about`, `/mission` (hero video), `/book-a-demo` (plain hero
+ inline form). Each page composes section components with **zero page-level
CSS**; `CtaBand` + `Footer` close every page.

**Assets** (`public/`): scraped from the live site — 15 photos re-encoded to
`webp` off the Sanity CDN, 2 brand SVGs, both Vimeo hero/mission MP4s, and the 10
ABCFavorit font files. Removed the template's `GenericHero` placeholders.

**Config:** `next.config.mjs` gained `images.dangerouslyAllowSVG` (first-party
SVGs flow through `next/image`); `layout.js` metadata set to real Korr
title/description + `metadataBase`.

**Verification:** `next build` passes — all 5 routes prerender static. Smoke-test
on `next start` returns 200 for every route with correct titles; optimized
images, SVGs, fonts, and videos all serve 200.

### 2026-06-23 — Template hardening before first reuse

- **`Button` now routes links correctly.** Replaced the generic `as` prop with
  `href`-based detection: no `href` → `<button>`; internal `href` (starts with
  `/`) → Next `<Link>` for client-side routing + prefetch; external `href` →
  plain `<a>`. **Why:** a storefront leans on internal navigation; a bare `<a>`
  dropped client routing/prefetch. Also added a `className` passthrough to match
  the other primitives. No new dependency — `next/link` ships with Next. No
  existing consumers, so the API change is safe.
- **Removed default Next.js demo SVGs** (`next/vercel/window/globe/file.svg`)
  from `public/`, added `public/images/.gitkeep`. **Why:** demo cruft otherwise
  rides into every project; `.gitkeep` preserves the asset folder (git ignores
  empty dirs).
- **Set `metadataBase`** in `layout.js` (placeholder origin). **Why:** silences
  the relative-OG-URL build warning and makes the per-project edit obvious.

### 2026-06-23 — Media: inline aspect-ratio → CSS-variable-driven class

- **Replaced** `Media`'s raw inline `style={{ aspectRatio }}` with a
  `--aspect-ratio` custom property piped into a `.fill` class
  (`aspect-ratio: var(--aspect-ratio)`). **Why:** the contract bans raw inline
  style declarations; passing a *dynamic value* through a CSS custom property
  (`style={{'--aspect-ratio': v}}`) is the sanctioned pattern, keeping the actual
  declaration in the stylesheet. The custom property is only set when `fill` is
  true (the only mode that needs an explicit ratio), matching prior behavior.

### 2026-06-23 — Template skeleton aligned to autonomous build contract

- **Added** root `CLAUDE.md` (autonomous Next.js build contract) and removed the
  prior lowercase `claude.md` to fix the case collision. **Why:** the contract is
  the operating agreement for every future build on this template.
- **Restructured** all six components from the grouped `components/layout/*` +
  `components/ui/*` flat-file layout into per-component folders
  (`components/Name/index.jsx` + `Name.module.css`). **Why:** matches the
  contract's COMPONENT STRUCTURE rule literally; `index.jsx` keeps import paths
  clean (`@/components/Section`). CSS-module imports were unchanged (same
  co-located filenames), so no style wiring broke.
- **Wired** `Header` and `Footer` into `RootLayout` as slots around `<main>`,
  keeping the existing skip-link. **Why:** the brief specifies RootLayout renders
  `<main>` plus Header/Footer slots.
- **Updated** imports in `page.js` to the new component paths.
- **Replaced** the inherited "Studio System Core" marketing README with this
  project log (Brief / Stack / Changelog / Open Items). **Why:** the contract
  treats the README as a living follow-along log, not template boilerplate.

#### Decisions / assumptions
- Kept `layout.js` (not `.jsx`) and `globals.css` in `src/app/` — per the chosen
  alignment option, working files were left in place rather than renamed/moved.
  This is the one deliberate divergence from the brief's literal `layout.jsx` /
  `src/styles/globals.css` paths.
- Migrated **Header/Footer** into per-component folders too (not just the four
  named primitives) so no half-empty `layout/` grouping folder was left behind.
- Left existing `tokens.css` and `globals.css` content untouched — they already
  cover every token the brief asked for (and more), so nothing was invented.

---

## 4. Open Items

- **Font licensing.** ABCFavorit is a commercial typeface (ABC Dinamo) self-hosted
  from the live site's public files to achieve exact visual match. Before any
  production/public deployment, obtain a proper web license or substitute a
  licensed/free near-equivalent grotesque (swap the `@font-face` block in
  `globals.css` + `--font-primary`).
- **Contact form is UI-only** (per the brief) — `ContactForm` shows a local
  fake-success state and does not submit anywhere. Wire to a real endpoint
  (API route / Formspree / email) when needed.
- **Vimeo MP4s self-hosted** (`public/video/hero.mp4`, `mission.mp4`) rather than
  embedded; fine for fidelity, but consider a poster image / lazy strategy for
  perf on slow connections.
- **Mobile pass** is structural (mobile-first CSS, hamburger nav, single-column
  grids). A device-by-device visual QA against the live site is still worth a
  pass — especially hero spacing under the fixed header on short viewports.
- A few **section headings/labels were authored** where the source had none
  (e.g. product feature eyebrows, `/about` + `/mission` split titles, FAQ
  `area` tags) to fit the template's component API — copy is faithful but not
  verbatim in those spots.
- **GSAP dependency** added (`gsap` + `@gsap/react`) for scroll-driven motion.
- **Terms/Privacy/legal pages** don't exist; the footer omits them (links would
  404). Add `app/legal/*` pages if those routes are needed.
- The source refines some grids further at **1280px** (e.g. the stepper block
  grid 8→6 col, the footer intro span 7→6→5). We use a single 1024px desktop
  layout, so widths above 1280px are faithful in spirit but not column-for-column
  identical to the source's wide-desktop refinements.
