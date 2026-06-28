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

### 2026-06-28 — Content layer: a local file-based "headless CMS" (`src/content/`)

Introduced a hard **data ↔ render** separation so copy can change without touching a
component, and so the data source can later be swapped for a real CMS with no component
edits. Content files hold data only (no JSX); components render only (no copy); pages are
thin manifests that wire one to the other. Pure structural refactor — the existing Relai
copy was lifted verbatim, so the rendered output is unchanged (`next build` parity).

**New `src/content/` (data only, named exports per section)**
- `site.js` — global chrome + metadata: `meta` (Next metadata), `nav`, `social`, `footer`.
- `home.js`, `about.js`, `mission.js`, `product.js`, `book-a-demo.js` — one export per
  section, each tagged `// Component: X` with a consumers header comment (human-readable
  schema map). Each page file also exports `meta` that drives its `export const metadata`.

**Components → a single `content` object prop (16 components)**
- `Hero`, `Intro`, `Capabilities`, `Testimonials`, `Shortcuts`, `TextSection`,
  `SplitSection`, `Faq`, `FormSection`, `Stepper`, `StatList`, `ImageRow`, `Explore`,
  `CtaBanner`, `TalentSection`, `Leadership` now take `({ content })` and destructure
  internally. Everything a page used to pass — copy, media, items, **and** presentation
  flags (`reverse`, `tone`, `aspectRatio`, dark-hero opts) — folds into `content`, so each
  page call is exactly `<Component content={…} />`. Render bodies are otherwise untouched.

**Pages are now manifests**
- All five pages dropped their inline copy; they import from `@/content/<page>` and render
  `<Component content={…} />` only. No page-level copy, styling, or `FAQ_ITEMS` const. This
  is the seam where imports later become `await fetch(...)` with no component changes.

**`Capabilities` — one source of truth.** The four Relai capability items moved out of the
component (the in-component default array is gone) into `home.js`. The home page now passes
them explicitly, so the live tabs and the content layer can't drift.

**Global chrome reads `site.js`.** `Footer`, `SiteNav`, and `Header` dropped their local
const tables and inline copy for imports from `@/content/site`; `layout.js` metadata is now
`export const metadata = meta`. **Nav unified:** Header and SiteNav previously hardcoded two
*different* link sets — both now source one canonical `nav.primary` (`Product / About /
Mission`) plus the `nav.cta` (`Book a Demo`), so the two bars can no longer disagree.

**Folder move (macOS case-collision).** `src/Content/` (reference wireframes/mockups/copy
doc) was moved to repo-root **`docs/`** — on a case-insensitive filesystem it collided with
the new lowercase `src/content/`. Nothing imports those docs, so it's a clean relocation.

**Verification:** `next build` clean — all 5 routes (`/`, `/about`, `/book-a-demo`,
`/mission`, `/product`) prerender static; no broken imports/exports.

#### Decisions / assumptions
- **One uniform `content` prop name** (not per-section names like the reference project's
  `beliefs`/`founder`) because several components render 2–3× per page (`SplitSection`,
  `TextSection`); a fixed key keeps those instances working with a single prop.
- **Presentation flags live in `content`**, making pages pure single-prop manifests. Flip
  to passing `reverse`/`tone`/etc. as direct props if layout decisions should stay visible
  in the page rather than the data file.
- **No collection seam built.** There's no collection content yet (no `[slug]` routes), so
  only page singletons + `site.js` exist. A `getEntry/getAll` async loader is the single
  spot to add when a real collection (e.g. blog, case studies) appears — components/pages
  won't change.

### 2026-06-28 — `SiteNav` is now the universal menu on every route

`SiteHeader` previously rendered the new `SiteNav` only on `/` and `/mission`, and fell
back to the legacy `Header` on every other route. Made **`SiteNav` the menu on all pages**.

- `SiteHeader` now always renders `SiteNav`; the `NAV_ROUTES` allow-list became a
  `NAV_THEME` override map that defaults to `"dark"`. Every current hero is dark (a
  `tone="dark"` hero paints the black canvas, and a `tone="light"` hero is transparent
  over the black `body`, so both are white-on-black), so all routes use the `"dark"` nav
  theme; map a route to `"light"` here only if it ever adopts a `.theme-light` hero.
- The legacy `Header` is no longer imported — it's now dead code (left in place, not
  deleted). **Open item:** remove `components/Header/` once confirmed unneeded.
- **Verification:** `next build` clean — all 6 routes (`/`, `/about`, `/book-a-demo`,
  `/mission`, `/product`, `/_not-found`) prerender static.

### 2026-06-28 — Fix black-on-black text left by the Relai token scrub

The Relai rebrand flipped the default theme to **dark** (white-on-black) and dropped two
Korr palette tokens (`--color-gray`, `--color-green`), but several components still carried
light-theme assumptions, so their text rendered **invisible** (black on the black page) or
fell back to an inherited color. All fixes are token-only — no new tokens, no markup changes.

**Invisible text (black-on-black) → theme-adaptive tokens**
- **`Eyebrow .default`** hardcoded `--color-black`. Every light-tone section (About's
  "Why Relai"/"Mission", etc.) is transparent over the dark page, so its eyebrow label was
  invisible → `--color-text-muted` (also unified `.dark`, which referenced the dropped
  `--color-gray`).
- **`Shortcuts .text`** (Home) and **`Stepper .active .blockText`** (Product) were
  `--color-black` on the dark page → `--color-text-primary` (full-contrast, theme-adaptive).

**Dangling tokens from the scrub → existing tokens**
- `--color-gray` (deleted) in `Eyebrow .dark`, `Stepper .cardCounter`/`.blockText`,
  `Footer .bottomRight` → `--color-text-muted`.
- `--color-green` (deleted brand accent, palette is now mono) in `Button .primary:hover`
  → `--color-black` fill, matching the existing `.secondary`/`.light` mono hover convention.

**Left as-is:** legacy `Header` has black-on-black rules but is no longer rendered (the
layout mounts `SiteHeader`); the remaining `--color-black` text (`Button .solid`/`.secondary:hover`,
`Footer` demo card) sits on white surfaces and is correct.

**Verification:** audit confirms all 15 referenced `--color-*` tokens now resolve in
`tokens.css`; no remaining `var(--color-gray)`/`var(--color-green)` references.

### 2026-06-28 — Korr→Relai scrub: brand, copy, structure to the CD copy doc

Converted the inherited Korr (insurance) template into **Relai** (freight logistics),
driven by `src/Content/Relai documents/copy/relai-cd-copy.md`. This followed an audit
(`audit-report.md`) of every Korr/insurance/Anduril/ABCFavorit/legacy reference.

**Brand & metadata**
- All visible brand strings → **Relai** (Header pill, SiteNav, Footer `© 2026 Relai`,
  ContactModal/ContactForm, drawer "Contact Relai"). LinkedIn `korr-inc` URLs → `#`
  placeholder (no Relai LinkedIn yet).
- `Logo` now renders a placeholder **"RELAI"** text wordmark (Helvetica, `currentColor`,
  sized by `height`) instead of the literal Korr K-O-R-R glyph path. **needs-real-asset.**
- `layout.js` metadata → "Relai — Redefining Freight" / "%s — Relai" + freight description
  & OG; `metadataBase` (gokorr.com) dropped until a real domain exists. `package.json`
  name → `relai`. `favicon.ico` → neutral placeholder square. **needs-real-asset.**

**Structure (followed the copy doc's section order, not a 1:1 string swap)**
- **`/arsenal-1` became `/mission`.** The dark Hero → StatList → ImageRow → Explore →
  CtaBanner → TalentSection structure maps exactly onto the doc's MISSION page, refilled
  with Relai copy (stat band, "Explore the Network", Partner CTA, careers/roles).
- The **previous `/mission`** page is parked verbatim at `app/_mission-legacy/` — an
  underscore-prefixed **private folder** (not routed, not linked, kept for later use).
- **Home:** Stepper removed (the doc has no stepper on Home); Hero gains a `[ FREIGHT ]`
  tag; Why Relai / Capabilities / single Testimonial / Learn More refilled.
- **Product:** the 4-step **Stepper moved here** (Vessel Intelligence → Terminal
  Orchestration → Drayage & Handoff → Emissions & Idle), plus a 9-item FAQ.
- **About:** added a new **`Leadership`** content component (the one section with no
  existing pattern — built from Section/Container + tokens only).

**Content & components**
- `Capabilities` default items repointed to the 4 Relai capabilities (defense imagery →
  labeled DIAGRAM placeholders).
- Single **Testimonial** (Marcus Vance, Pacific Gateway Lines) replaces the Tokio
  Marine / Chad Hersh / Wellcove carousel.
- `ContactModal` scrim `rgba(32,35,31,.55)` → `color-mix(... var(--color-surface) 55%)`
  (token, not raw legacy hex).

**Deletions** (all confirmed unreferenced by the audit)
- 10 licensed `ABCFavorit*` font files; brand/reference images (carousel-tokio/chad/
  wellcove, 4 defense capability images, arsenal-qr, demo-illustration); orphans
  (product-ai, carousel-concept, mission-hero); `hero.mp4` / `mission.mp4`.
- The `/arsenal-1` route folder (its content lives on at `/mission`).

**Placeholders generated** (surface bg, mono caption, matched aspect ratios): `media-hero`,
`media-mission`, `testimonial-portrait`, and 4 `capability-*` SVGs. Hero background
**videos are now image placeholders** (no mp4 tooling available) — **needs-real-asset.**

**Comments** mentioning Korr/Anduril/Arsenal-1 reworded across `Hero`, `globals.css`,
`tokens.css`, `Explore`, `Header`/`Footer` CSS (token *values* untouched).

> Note: `README.md`, `audit-report.md`, the copy doc, and the parked `_mission-legacy/`
> page intentionally still reference the old names (history / source / parked work).
> Visual theming (black vs. white pages) and asset realism are a follow-up pass.

### 2026-06-28 — Motion pass on `/arsenal-1` (Lenis smooth scroll + GSAP reveals)

Mirrored the reference's on-scroll motion. What was shared earlier was the rendered
DOM + asset manifest, not the animation source (the live site drives it with
Theatre.js + bespoke WebGL + Lenis, compiled into `app.js`), so this reproduces the
visible behaviour with the project's existing GSAP rather than copying code.

- **Lenis smooth scroll, global.** New dep `lenis` (the same lib the reference uses).
  `components/SmoothScroll/` (`"use client"`, mounted once in `layout.js`) runs Lenis
  on the document and feeds GSAP's ticker so `ScrollTrigger` stays in sync; the minimal
  Lenis CSS lives in `globals.css`. No-op under `prefers-reduced-motion` (Lenis never
  initialises). Applies site-wide — the idiomatic single-instance pattern, and it
  smooths the home page's existing reveals too.
- **Reusable reveal hook** `components/Reveal/useReveal.js` — a `ScrollTrigger`/`useGSAP`
  hook that wires motion from data-attributes so each section stays declarative:
  `data-reveal` (fade+rise, `data-reveal-stagger` to stagger a parent's children),
  `data-reveal-mask` (heading clip-path wipe-up), `data-reveal-image` (media clip +
  slow scale-settle). `once`, reduced-motion-guarded.
- **Section components → client + tagged:** `StatList` / `ImageRow` / `Explore` /
  `CtaBanner` / `TalentSection` now call `useReveal` and tag their headings (mask),
  media (clip), stat rows & role items (staggered rise). Replaced the page's coarse
  `<Reveal>` section-wrappers with this element-level motion.
- **Hero entrance.** `Hero` is now `"use client"` with an opt-in `animate` prop: an
  on-load timeline (title wipe-up + rise, meta stagger, banner clip+scale reveal) and a
  CSS looped bob on the scroll arrow. `animate` defaults off, so home/about/product/
  mission heroes are unchanged.
- **Token fix from the rebrand:** two `--color-gray` refs (dropped in the Relai token
  swap) updated to `--color-text-muted` so the stat/QR captions stay muted, not white.
- **Verification:** `next build` (7 routes static) + ESLint clean. Raw-CDP self-QA on
  `next start`: `html.lenis` present (off under reduced motion); hero title settles at
  `opacity:1`; after scripted scroll-through **all 15 reveal targets end visible (0
  stuck hidden)**; reduced-motion shows everything at load with no animation; the home
  page still renders with the client `Hero` + global `SmoothScroll`.

#### Decisions / assumptions
- **Smooth scroll is global, not page-scoped** — Lenis owns the document scroller, so a
  single layout-level instance is the correct integration (and the reference applies it
  site-wide). Flip to a page-scoped mount if only `/arsenal-1` should smooth-scroll.
- **The WebGL/Theatre.js bits aren't reproduced** — those are bespoke and compiled; the
  reproducible scroll/reveal/parallax feel is mirrored with GSAP.

### 2026-06-28 — New `SiteNav` (Anduril-style top nav), page-scoped on `/` + `/arsenal-1`

Rebuilt Anduril's primary header as a Relai-themed top nav — a full-bleed bar that's
transparent over the hero and fills to a solid surface on scroll, plus a full-screen
mobile drawer. Structural reconstruction of the source anatomy (logo left · centered
links · right utility cluster · hamburger → drawer with CONTACT/SOCIAL), not a visual
copy. Scope was confirmed up front: **bar + mobile drawer only** (no desktop mega-menu
panels), **page-scoped** (not a global swap), **project tokens** (no Anduril red), and
links **remapped to real routes**.

- **New `components/SiteNav/`** (`"use client"`): fixed bar wrapped in the existing
  `Container`; absolutely-centered links (`Product / About / Mission / Arsenal-1`);
  right cluster = **Contact** (reuses the existing `ContactModal`) + **Book a Demo**
  (`/book-a-demo`); logo reuses the shared `Logo`. Below 1024px the links/cluster
  collapse to a hamburger that opens a full-screen drawer (`Home` + the routes +
  Book a Demo, then `CONTACT` → Contact modal and `SOCIAL` → LinkedIn, mirroring the
  source). Scroll→fill uses the same `scrollY > 40` listener pattern as `Header`; the
  drawer reuses `ContactModal`'s body-scroll-lock + Escape handling.
- **New `components/SiteHeader/`** — a thin `"use client"` switch: renders `SiteNav`
  on `/` and `/arsenal-1`, the existing `Header` everywhere else. `layout.js` renders
  `<SiteHeader />` in place of `<Header />` (one-line swap; other routes unchanged).
- **Themed via the project's own `.theme-*` system, not a private prop.** The nav
  takes a `theme` prop that applies the global `.theme-dark` / `.theme-light` class on
  the header; all colors read semantic tokens (`--color-text-primary`,
  `--color-bg-primary`, `--color-stroke-muted`), so the bar/drawer match whatever hero
  they overlay with zero hardcoded values. Both mounted routes currently render on the
  dark default, so both pass `theme="dark"` (transparent white-on-dark bar → solid
  black on scroll; black drawer). Flip a route to `"light"` in `SiteHeader` if it
  adopts a `.theme-light` hero.
- **Built across the Korr→Relai token rebrand.** Mid-build, `tokens.css` was swapped to
  the dark-default Relai palette (`.theme-light`/`.theme-dark` scopes, mono accent,
  sharp radii). An initial pass that hardcoded the old light tokens via a `tone` prop
  rendered inverted once the new tokens landed; reworking it onto the `.theme-*`
  mechanism + semantic tokens fixed it and made it rebrand-proof. Hovers moved from the
  (now mono) accent color to a `0.6` opacity dim.
- **Verification:** `next build` (7 routes static) + ESLint clean. Headless-Chrome + a
  raw-CDP driver self-QA against `next start`: confirmed computed `color`/`background`
  per state (transparent → `--color-bg-primary` on scroll), the hamburger renders below
  1024px, and captured the top / scrolled / open-drawer states on `/` and `/arsenal-1`
  at desktop and mobile.

#### Decisions / assumptions
- **Korr `Logo` kept** (not an Anduril mark): the nav routes point at real Relai pages,
  so a Korr/Relai wordmark is the coherent choice — and reusing the shared `Logo` means
  it updates automatically when the rebrand swaps that component.
- **`Search` and the `Company` mega-panel were dropped** (no search backend / company
  route); the right cluster maps to the real Contact + Book-a-Demo actions instead.
- **Drawer is opaque**, not translucent-frosted — a deliberate token-only choice
  (`color-mix` of a nested var mis-compiled in this toolchain; a solid themed surface is
  robust across dev/prod and fully tokenized).

### 2026-06-28 — New `/arsenal-1` page (Anduril Arsenal-1 rebuild) + reusable dark hero

Rebuilt Anduril's full **Arsenal-1** page as a new route, composed entirely from the
project's primitives and tokens. Same convention as the `Capabilities` work: a
structural reconstruction re-themed onto the system (black/white/green tokens +
ABCFavorit), keeping the source copy. New route only — the Korr home and all other
routes are untouched.

- **Route:** `app/arsenal-1/page.js` (server component) — Hero → `StatList` →
  `ImageRow` → `Explore` → `CtaBanner` → `TalentSection`, each non-hero section
  wrapped in `Reveal` for the scroll-in motion used elsewhere.
- **Shared `Hero` extended, not forked.** Per the brief ("rebuild the current hero to
  match the reference"), the one shared `Hero` gained **opt-in** props — `meta` (label
  lines), `tag` (`[A-1]`), `scrollIndicator` (down arrow → `scrollTo`), `mediaAspect`
  (desktop ratio override via a `--hero-media-pb-lg` custom prop), and `tone="dark"`.
  Defaults reproduce the old behavior exactly, so home/about/product/mission render
  unchanged (verified). The giant display title is scoped to `.dark .title` (a
  clamp() display size, à la `Capabilities`' numerals) so only the dark hero grows;
  the Korr `--font-h1` heroes are unaffected.
- **New section components** (all `Section`+`Container`, dark via the `.root.theme`
  doubled-class trick): `StatList` (centered statement + hairline-separated stat rows,
  value/label left · description right), `ImageRow` (two-up gallery), `Explore`
  (heading + QR on the left, isometric site map right; QR swaps to an "Explore ↗" link
  on mobile), `CtaBanner` (two-column closing statement + action), `TalentSection`
  (the light "Stay On Our Radar" band + numbered roles list).
- **QR code generated locally** (`public/images/arsenal-qr.svg`, white modules) and
  served via `next/image unoptimized` — the optimizer was caching a stale copy and
  `next/image`'s SVG path adds CSP/`Content-Disposition: attachment` friction for a
  trivial first-party vector, so bypassing it is simpler and reliable.
- **Token mapping / no invention:** dark surfaces `--color-bg-dark`/`--color-white`,
  green stays the accent, faint rules `--color-stroke-light` (dark) and
  `--color-stroke-muted` (light). The "Stay On Our Radar" band has no exact warm-sand
  token in the system, so it uses `--color-bg-secondary` (see Open Items).
- **Verification:** `next build` (7 routes, `/arsenal-1` static) + ESLint clean.
  Headless-Chrome + CDP self-QA at 1280 desktop and a true 390px mobile
  (`scrollWidth == clientWidth`, zero overflowing page elements); confirmed the home
  hero is visually identical to before the `Hero` change.
- **Fidelity pass (vs side-by-side reference).** Type sizes/borders tuned to the
  source by measuring rendered widths over CDP: dark hero title scoped down to ~90px
  at 1024 (`clamp(2.5rem, .5rem + 8vw, 8rem)`); stat values enlarged to
  `clamp(2.5rem, 1rem + 4vw, 4rem)` with the desktop value column pinned to `18rem`
  (between `$2 Billion`'s 241px and `$900 Million+`'s 348px) so the long values wrap
  to two lines exactly like the source while `4000+`/`$2 Billion` stay single-line
  (mobile keeps them all one line); CtaBanner title down to ~34px so "Shape The
  Future…" sets in two lines; `TalentSection` subheading `--font-h2 → --font-h3` so
  "We Are Hiring…" fits one line; role numerals to `--font-tagline`. **Removed the
  hero `[A-1]`-row hairline** — the source has no border there. Audited every rule:
  borders now appear only where the reference has them (stat-row separators, the
  talent band divider, role separators).

#### Decisions / assumptions
- **Placeholder imagery.** No Arsenal-1 photos exist in the repo, so existing assets
  stand in (hero → `product-architecture`, gallery → `concrete` + `about-why`,
  site map → `mission-globe`). Swap by replacing the files / `src` props.
- **Header/Footer left as the global Korr chrome** (out of scope — the brief only
  asked to rebuild the hero). The page is dark; the shared nav/footer stay Korr's.
- **CTA/role links are placeholders** (`href="#"`); wire to real destinations later.
- Copy is the source's verbatim Anduril Arsenal-1 text, kept for parity.

### 2026-06-28 — New `Capabilities` tabbed-pane section (Anduril `ProductQualitiesSlice` rebuild)

Replicated Anduril's "Capabilities" tabbed pane as a token-driven section and mounted
it on the home page. Controlled reconstruction of the structure + mechanics, not a
visual copy of the Anduril brand — it re-themes automatically when the project tokens
are swapped.

- **New component** `components/Capabilities/` (`index.jsx` + `Capabilities.module.css`),
  a `"use client"` section. One `activeIndex` drives everything. Wrapped in the
  existing `Section` + `Container` primitives; images via `next/image` (`fill`).
- **Full-fidelity animation suite** (GSAP via `useGSAP`, all behind
  `prefers-reduced-motion`): sliding tab underline (`scaleX`+`translateX`, expo ease),
  odometer counters — small `01–04` and the giant `1–4` roll one slot in the travel
  direction incl. wrap — a left-to-right title wipe, per-word description stagger
  (each word clipped in its own mask box), and an image crossfade/slide between panels.
- **Title wipe technique:** the source applies an SVG `<mask>` to the title; that
  fragment-referenced mask is unreliable on HTML elements in Blink/WebKit, so the same
  left-to-right reveal is done with an animated CSS gradient `mask-image` (`--reveal`
  tweened 0→120%) — identical visual, cross-browser safe.
- **Token mapping (no hardcoded hex, no new tokens):** dark section `--color-black` /
  `--color-white`; light card `--color-gray-light` / `--color-text-primary`; faint tab
  rule `--color-stroke-light`; active underline `--color-white`. The dark-section bg
  beats `Section`'s `.default` via a doubled-class selector (`.root.theme`).
- **Layout:** desktop = left rail (counter top / numeral bottom) · body (title +
  description) · image right, with panels grid-stacked so the card sizes to the tallest.
  Mobile (≤768px) = horizontal-scroll tab bar + a single stacked column
  (counter → title → description → numeral → image) via `display: contents` + `order`.
- **Mobile fix found in verification:** the image column collapsed to 0×0 on mobile
  because `align-self: start` (a desktop grid rule) controls the *cross axis* in the
  mobile flex column; added `align-self: stretch; width: 100%` for `.media` at ≤768px.
- **Assets:** the 4 source diagrams were downloaded (cropped to 16:9) into
  `/public/images/capability-*.{jpg,png}` — no remote image host added.
- **Content:** the real 4-tab capability copy is the component's default `items` prop
  (kept for screenshot parity); swap via props.

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

- **Arsenal-1 imagery is placeholder.** `/arsenal-1` reuses existing repo photos as
  stand-ins (and a generated QR). Drop real assets into `public/images/` and update the
  `src` props in `app/arsenal-1/page.js` for the hero, the two-up gallery, and the
  isometric site map.
- **No warm-sand surface token.** The reference's "Stay On Our Radar" band is a warm
  sand tone; the system has no equivalent, so `TalentSection` uses
  `--color-bg-secondary` (light gray). Add a token + swap if exact match is wanted.
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
