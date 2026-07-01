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

### 2026-07-01 — News: uniform list thumbnails + real Pacific Gateway photo

The three compact `News` rows rendered thumbnails at three different heights
because each item carried its own `aspectRatio` (`16/9`, `3/2`, `2.6/1`) and the
`Media` fill wrapper sizes off that value. Aligned all list items to `3/2`,
matching the "Relai cuts idle time and emissions" card the user picked as the
reference — the thumbnail column is a fixed width, so equal ratios now render
equal sizes. **Why data, not CSS:** `aspectRatio` is the prop that exists to
control this, and the article Hero reads only `image.src`/`image.alt` (not
`aspectRatio`), so the change is scoped to the list. Also swapped Pacific
Gateway off the leftover `/images/news-pacific-gateway.svg` placeholder to the
real `newsheros/news2.jpg` (the only one of the four hero photos not yet wired
in), with an alt describing its stacked-containers/yard-equipment content.

### 2026-06-30 — Book-a-Demo form: client-only submit state machine

`ContactForm` gained real submit behavior (still **no backend, no network, no
navigation** — all state lives in the component). Modeled four states
`idle | submitting | error | success`:

- **Validation on submit** (`noValidate`, JS-driven). Full Name, Email, and
  Message are all required; Email must match a standard format. Invalid submits
  keep every typed value, don't navigate, and render an inline message under the
  offending field (`aria-describedby` + `aria-invalid` wire each error to its
  input). Editing a field clears just that field's error.
- **submitting** — on a valid submit we hold a ~700ms pending pace (Submit
  disabled, label → "Sending…"), then land on success. Purely UX timing, not a
  request; the timer is cleared on unmount.
- **success** — the fields are replaced **in place** inside the same `formWrap`
  (surrounding heading/layout untouched, so nothing shifts). Copy uses the
  captured name — _"Thanks, {name} — we'll be in touch."_ (falls back to the
  nameless line when empty) — plus a walkthrough line and a quiet "Send another
  request" reset control.

**Decisions:** Message was made mandatory (asked). Errors are styled in the
existing **monochrome** text tokens — the palette has no error/red token and the
contract forbids inventing one, so errors read as emphasis, not color. The
field→confirmation swap uses a small opacity fade, gated behind
`prefers-reduced-motion` so it cuts instantly. Focus moves to the confirmation
heading on success. "Send another request" is a real `<button>` (an action, not
navigation). Only the shared `ContactForm` was touched — the modal is unused, so
no other surface was considered.

### 2026-06-30 — Shared type scale (sizes) + flat line-height 1 site-wide

Used the article page (`/news/[slug]` — the one page that exercises every level:
Hero title, eyebrow, meta, lead, body, share labels) as the reference, captured
its scale, and rolled it out to the whole site.

- **Shared size scale (7 roles):** Display/H1 32→78 · H2 24→32 · H3 20→24 ·
  Lead 18→22 · Body 16 · Small 14 · Eyebrow 12. Sizes reuse the existing clamps;
  `--font-lead` is the only new size. Body/Lead now have real tokens (the article
  body previously borrowed `--font-h5` and the lead `--font-h3` — heading tokens
  doing body work); Body is a 16px base with Lead stepping above it.
- **Line-height is a flat `1` across the whole project** — a deliberately tight
  house style that matches how the article page always read. Set `body`,
  `h1–h6`, `p`, and every `--leading-*` token to 1, and normalized the ~46 local
  numeric `line-height` overrides scattered across ~25 components to 1 in one
  pass. **Note:** an earlier draft of this change briefly opened the article body
  to 1.6/lead 1.4 (misreading the brief's "inverse" line) — reverted; the whole
  site is 1.
- **One family site-wide.** `--font-secondary` is aliased to `--font-primary`
  (already byte-identical Helvetica) — single family source, no visual change, no
  edits to the 17 referencing files.
- **Weights:** the shared scale uses 400/500 only. Oversized display **bold**
  (dark Hero title, StatList figures, Logo) is intentionally retained.
- **Deferred:** a few inline px annotations next to former line-heights (e.g.
  `/* 22px */`) are now stale since the computed height changed; harmless, left
  for a cleanup pass.

### 2026-06-30 — Align move-count figures across the site

Product/FAQ states "200,000+ container moves per month" (target 1M/month by end
of 2026) — an annualized 2.4M/year — but the Mission stat said "1.2M+ container
moves a year," half that. Aligned Mission to the annualized Product figure:

- `content/mission.js`: stat value `1.2M+` → `2.4M+`, and its description
  "over a million container handoffs annually" → "over two million …" to match.
- Product copy kept exactly as-is (its current/target growth story is
  internally consistent and is the anchor figure).
- No code change: `CountUp` parses `2.4M+` the same as `1.2M+` (numeric `2.4` +
  static `M+` suffix).

Reviewed but left: the News article's qualitative "thousands of moves a week"
(per-terminal impact prose, not a network-total figure — no numeric conflict).

### 2026-06-30 — News: fix contradictory article timeline (dates + prose)

The "Relai closes its Series B" article (08/05/2025) referenced the real-time
handoff pilot and the idle/emissions article as *past* events, but both were
dated later (10/07 and 12/18). Moved both before Series B so the feed reads
newest-at-top in its existing order (no reordering of the array):

- Real-time handoff pilot: `10/07/2025` → `04/16/2025`
- Cuts idle/emissions: `12/18/2025` → `05/28/2025`
- Pacific Gateway (06/20/2025) and Series B (08/05/2025) unchanged.

Final order, top → bottom: `08/05 > 06/20 > 05/28 > 04/16` (pilot earliest,
Series B most recent). All dates live only in `content/news.js`; the `/news`
index and `/news/[slug]` pages both read `article.date` from it, so the edits
propagate everywhere.

Then made the **body cross-links** consistent with the new order — every inline
article link now points *backward* in time. Three forward-references were
removed by reframing the copy (no dates or article order touched):

- Emissions body no longer cites "the company's recent **Series B**" (Series B is
  now later) — reworded to a self-contained line about scaling integration +
  analytics.
- Pilot body no longer says the layer is scaling "following its **Series B**" —
  reworded to drop the anachronistic reference.
- Pilot body no longer links forward to the later **idle/emissions** article
  ("has since seen at scale") — reframed as forward-looking ("expects at scale").
  As the earliest article it now carries no cross-links, which is correct.

Verified: 0 forward/inconsistent cross-links remain; `content/news.js` parses and
still exports all four articles.

### 2026-06-30 — Footer: fix nav IA + remove dead hrefs/modal (site-wide)

`Footer` is shared across every page, so these apply everywhere:

- **Careers** → `/mission` (was `/about`) — the open roles live on the Mission
  page (`TalentSection`).
- **Contact** → now a link to `/book-a-demo` (was a `<button>` opening
  `ContactModal`). That modal was triggered only from the footer, so its wiring
  is removed: dropped `useState`, the `ContactModal` import/render, the
  `action === "contact"` branch, the now-dead `.linkButton` CSS, and the
  `"use client"` directive — `Footer` is now a clean Server Component.
- **Added Mission + News** to the footer nav so it mirrors the header IA. Order:
  `Home · Product · FAQ · Mission · About · News · Contact · Careers`.
- **LinkedIn removed** entirely (no live profile). `social` is now `[]`; the
  footer/drawer social rows are guarded so no empty `<ul>` is left behind.

Footer now has **zero `#` / dead hrefs** (`FAQ → /product#faq` is a valid
section anchor, kept). `ContactModal` still exists but is no longer referenced by
the footer.

### 2026-06-30 — Social links: render as non-clickable labels

Relai has no live social profiles yet, so the social row (currently just
LinkedIn) was a placeholder `href="#"` link. Made social entries non-clickable
everywhere they render: dropped the meaningless `href` from `content/site.js`,
and render each as a `<span>` instead of an `<a>` in both the site-wide `Footer`
and the (dormant) `SiteNav` drawer. The label still shows; it just no longer
links or shows a hover-underline affordance. With the Mission CTA fix below, the
site now has **zero `#` hrefs**.

### 2026-06-30 — Mission: resolve four placeholder `#` CTAs

The Mission page had four dead `href: "#"` links (a bare `#` scrolls to page top,
which reads as a bug). Resolved all of them — data-only changes in
`content/mission.js`, plus one small component guard:

- **Partner With Relai**, **Join Our Talent Network**, **Explore Open Roles** →
  `/book-a-demo` (an existing page; all three are "get in touch" intents, so the
  demo page is the natural catch-all). No new build.
- **Explore** (under "Explore the Network") — removed. There's no interactive
  explorer/QR to link to, so the network SVG now stands on its own. `Explore`
  defaulted `href = "#"` and rendered the link unconditionally, so dropping the
  content href alone wouldn't hide it — instead the component now only renders
  the link when an `href` is supplied (`{href && …}`), keeping it reusable for a
  future page that does have an explorer/QR.
- The six role line-items (01–06) stay a **static list** — they're plain strings,
  not trivially linkable, and carry no `#`.

Out of scope / left as-is: the footer's **LinkedIn** social link is still `href="#"`
by design — a site-wide placeholder (see `content/site.js`, "no Relai LinkedIn yet"),
not a Mission CTA.

### 2026-06-30 — News article pages: `/news/[slug]` (Anduril `NewsArticleContent` rebuild)

**What:** Gave every link in the home `News` band a real destination. New dynamic
route `app/news/[slug]/page.js` renders each article as a **light** editorial page:
the shared `Hero` (big title over the article's placeholder image) above a new
`NewsArticleContent` band rebuilt from Anduril's `NewsArticleContent` slice — a sticky
left column (article summary + a **Share** row with decorative `X / LI / RD` buttons)
beside a right-hand rich-text body (a larger `.lead` paragraph, then body paragraphs,
with inline links). Previously all four `/news/<slug>` links 404'd.

- **One template, content-driven.** `content/news.js` gained a `slug`, a `body`
  (`{ lead, paragraphs }`) per article, and exports `articles` / `articleSlugs` /
  `getArticle(slug)`. The page reads from those, so adding an article to `news` gives it
  a page, a static param, and metadata automatically. `generateStaticParams` prerenders
  all four; an unknown slug hits `notFound()`.
- **Rich-text model (no new dep).** Each `paragraphs` entry is either a string (plain
  `<p>`) or an array of segments, where a string is text and `{ text, href }` is an
  inline link (rendered via `next/link`) — mirrors the source's occasional inline links
  without a markdown/CMS renderer. Body copy is **unique placeholder per article** (freight
  newsroom copy, cross-linking the four articles), flagged in `news.js` to swap for a real
  feed later.
- **Primitives only.** `Section` + `Container` wrap the band; the placeholder image reuses
  each article's existing `news-*.svg` through the `Hero` media path. No new primitives,
  folders, deps, or tokens; all spacing/type/color via tokens.
- **Light route via the existing mechanism.** `RouteTheme` now also treats any `/news/`
  path as light (a `LIGHT_PREFIXES` prefix match alongside the exact `/about` /
  `/book-a-demo` set), so the whole page — hero, body, **and Footer** — paints white and
  the film-grain flips to dark, exactly like `/about`. The legacy light-styled `Header`
  already reads correctly on white (same as About/Book-a-Demo), so the nav needed no change.
- **Layout:** mobile-first single column (summary/share stacked above the body); at
  **1024px** it fans out to the source's 12-column grid — left info at cols 1–4 (sticky,
  offset below the fixed nav), body at cols 6–12 capped to a `44rem` measure.
- **Share buttons are decorative** (match the source markup + `aria-label`s, no click
  behavior) — so the component stays a Server Component with no client boundary.
- **Verification:** `next build` clean — `/news/[slug]` prerenders all four slugs as SSG,
  TypeScript + lint pass (12 routes total).

**Decisions / assumptions:** left `.summary` reuses the article `title` (the source repeats
the headline there); hero `eyebrow` = "News", `meta` = the date. "Similar News" and the
sticky share-bar (separate source slices) and a `/news` index were out of scope. Desktop
completed first, then the mobile stack pass — both in this build.

### 2026-06-30 — Home: new `News` section (Anduril `NewsFeaturedSlice` rebuild)

**What:** Added `components/News`, a newsroom band rebuilt from Anduril's
`NewsFeaturedSlice` (their `/solid-rocket-motors` page) — a "News" header + hairline
rule, one highlighted article (date · large title · description · "Read more", with a
3:2 image), then a list of compact rows (date · title · "Read more" + a small
right-aligned thumbnail). Mounted on the home page after `Shortcuts`, before the Footer.
New `content/news.js` holds the data (1 featured + 3 list items).

- **Primitives only, no invention:** wrapped in `Section` + `Container`, images through
  the shared `Media` primitive (`fill` + per-item `aspectRatio`), motion through the
  existing `useReveal` hook. No new primitives, folders, deps, or tokens.
- **Surface:** dark. Uses `Section variant="default"` under the global `theme-dark`
  class, so the background resolves to `--color-bg-primary` (black) and all type/hairlines
  flip to their dark-theme token values automatically — a dark band re-asserted inside the
  home page's light region (the sanctioned `theme-dark`-inside-light pattern). The dark
  `#20231f` placeholder boxes blend into the black surface (like the dark Capabilities
  diagrams).
- **Motion:** `useReveal` drives the heading wipe (`data-reveal-mask`), the featured
  image clip-settle (`data-reveal-image`), and the per-block fade-rise (`data-reveal`).
  The signature per-row top rule that *draws in* (`scaleX 0→1`, expo ease) isn't a
  `useReveal` primitive, so it's a small local `useGSAP` over `[data-reveal-border]`.
  The rule defaults to `scaleX(1)` in CSS, so under `prefers-reduced-motion` (where the
  GSAP no-ops) the rules still show. "Read more" gets a left-origin underline wipe +
  arrow nudge on hover (token-driven, mirrors `Explore`'s inline arrow — there's no
  shared arrow-link primitive and `Button` is a chip).
- **Responsive:** mobile-first; the featured stacks (image on top via `order`) and rows
  keep title-left / small-thumb-right. The two-column featured + wider thumb column
  (`clamp(10rem, 15vw, 16rem)`) switch in at **1024px**, matching the project's unified
  desktop breakpoint (and `Shortcuts`).

**Decisions / assumptions:** placement = home (moved into the Testimonials `Reveal`
wrapper); content = placeholder copy; images use the site's dark-box SVG placeholder
convention — four new `public/images/news-*.svg` (dark `#20231f` fill, inset
`#ffffff26` border, mono `IMAGE` label + caption), one per slot with a `viewBox`
matching that slot's aspect ratio (featured 3:2, then 16:9 / 3:2 / 2.6:1). `alt` text
still describes the intended real photo, so swapping the `src` for a real asset needs no
other change. The source's hidden header "view all" link was omitted to match the live
site; `Read more` links point at `/news/<slug>` placeholders (no article routes exist yet).

### 2026-06-30 — Mission: count-up animation on "The mission in numbers"

**What:** Added `components/CountUp`, a small client component that animates the
numeric part of each stat in `StatList` from 0 → target when it scrolls into view.
Wired it into `StatList` in place of the static value `<span>`; the mission page's
stat values (`mission.js`) are unchanged.

**Why / how:** Ported the idea from another project's self-contained
`IntersectionObserver` + `requestAnimationFrame` `CountUp`, but rebuilt it on the
project's own GSAP/ScrollTrigger system instead of a second raw-rAF animation stack —
so it fires in sync with `useReveal`'s row reveal (`top 85%`, `once`) and reuses the
same `prefers-reduced-motion` guard. The original snippet only animated pure-digit
strings, so every Mission value (`"920+ hrs"`, `"68%"`, `"1.2M+"`, `"11%"`) would have
rendered static; `CountUp` instead parses the leading number off each string, animates
it (`toFixed` so `1.2M+` counts `0.0 → 1.2`), and holds the suffix static.
`tabular-nums` on the figure keeps digit width from jittering as it ticks. No content
changes, no new deps, no new tokens; backward-compatible (final text is identical, and
non-numeric values render unchanged).

### 2026-06-30 — Product: new `ProcessList` (pinned scroll-scrubbed steps)

**What:** Added `components/ProcessList`, a scroll-driven replacement for the product
page's `Stepper`, cloning the mechanics of the good-fella "animatedListSection" (the
"How we work." section). The product page now renders `ProcessList` with the same
`stepper` content; `Stepper` is left in place for reuse elsewhere.

- **Pinning:** desktop wraps the content in a tall track (`min-height: var(--steps) *
  80vh` → 320vh for 4 steps) and pins the inner via CSS `position: sticky` — the whole
  header/list/media holds still while scroll progress drives the sequence. This replaces
  Stepper's flow-layout + per-block `ScrollTrigger` enter/leave model.
- **Engine:** one scrubbed `ScrollTrigger` reads `progress`. Active row = `round(p*(N-1))`
  (discrete, CSS-transitioned); the marker square's Y glides between row centers and its
  rotation interpolates `p*900deg` every frame via a direct transform write. CSS sticky +
  Lenis (already wired in `SmoothScroll`) avoids GSAP pin-spacer interplay.
- **Active treatment:** rows share a fixed indent (`padding-left: --space-8xl`) and never
  shift horizontally — active is just `opacity:1`, others `opacity:0.4`, and the marker
  square travels down the left gutter to mark the active step. (Dropped the per-row
  `translateX` after first review — it pushed the active row toward the page edge.) Step
  label is number (`01`–`04`, from index) + `h3` title (`step.capsule`) + muted body.
- **Media:** vertical filmstrip — frames stacked in a flex column, shown via
  `translateY(active * -100%)` with a 0.7s ease; `object-fit: cover` at 4/5. Current SVGs
  render as placeholders until 4/5 art replaces them. Dropped Stepper's `2/4` counter and
  capsule-heading overlay.
- **Color:** the marker square + image tint use `--color-accent` (mono — white on dark),
  **not** an orange brand color. `tokens.css` states relai has no brand accent, so no token
  was added or invented.
- **Mobile (<1024):** plain vertical stack — each step's text then its 4/5 image. No
  carousel, no scroll-sync (replaces Stepper's horizontal snap carousel).

### 2026-06-30 — Capabilities: fix uneven "01 / 04" counter baseline

**What:** The "01" sat higher than the "/ 04" on every breakpoint. Cause: the "01"
is an odometer roll (`.counterRoll`) with `overflow: hidden`, which makes an
inline-block report its baseline as its *bottom edge*. Combined with
`align-items: baseline` and the roll's `height: 1.4em`, flexbox aligned the roll's
bottom edge to the "/ 04" text baseline, leaving the digit floating ~0.6em high.

- **`.counter`** — `align-items: baseline` → `flex-end`, added `line-height: 1`.
- **`.counterRoll`** — `height` `1.4em` → `1em`.
- With matched 1em line-boxes bottom-aligned, the glyph baselines now coincide. The
  odometer animation is unaffected (it rolls by `yPercent`, relative to the element's
  own height). Applies to all breakpoints since the rule isn't media-scoped.

### 2026-06-30 — Capabilities: right-align the mobile label

**What:** Pushed the capability label (e.g. "Vessel Intelligence") to the right end
of the card on mobile via `justify-self: end` on `.title`. It's `width: fit-content`
in the grid's right column, so its right edge lands at the card's content edge —
flush to the end of the container but inside the existing padding (not edge-to-edge).

- Mobile-only; desktop 3-column layout untouched.

### 2026-06-30 — Capabilities: larger mobile diagram

**What:** The mobile diagram read too small. Lifted its cap from `max-width: 60%`
to `100%` so it fills its grid column (right column of the bottom row) instead of
sitting at 60% of it. Still right/bottom-aligned next to the numeral.

- Mobile-only, single value. Further size is bounded by the column width, which is
  set by the rail column + `column-gap`; shrinking that gap would widen the column
  (and the diagram) further if needed.

### 2026-06-30 — Capabilities: mobile description spans full width

**What:** On mobile the description was sitting in the right column (indented under
the label). Moved it to span both columns (`grid-column: 2` → `1 / -1`) so it
left-aligns under the `01 / 04` counter and the numeral — sharing a left edge with
them, which reads as more balanced and matches the reference.

- Mobile-only; row layout is now: counter | label (row 1), full-width description
  (row 2), numeral | diagram (row 3). Desktop 3-column layout untouched.

### 2026-06-30 — Capabilities: mobile layout reworked to match reference

**What:** On mobile (≤768px) the panel went from a single full-width column
(counter → label → description → numeral → full-bleed diagram) to the source's
compact 2-column layout.

- **`.panel`** — mobile now keeps `display: grid` (was flex column) with
  `grid-template-columns: auto 1fr`. Left column is the rail (counter top, numeral
  bottom); right column stacks label → description → diagram.
- **Explicit grid placement** (replaced the old `order` flow): counter `1/1`, title
  `2/1`, description `2/2`, numeral `1/3`, media `2/3`.
- **Numeral** bottom-aligns to the diagram (`align-self: end`) and gets a modest
  mobile size bump (`clamp(4.5rem, 14vw, 6rem)`) so it reads as a pair with it.
- **Diagram** is no longer full-bleed — `max-width: 60%`, `justify-self: end`,
  bottom-aligned, so it sits smaller and right-aligned like the reference.
- **Rail→content gap** widened (`column-gap` `clamp(1rem,5vw,2rem)` →
  `clamp(2.5rem,12vw,4rem)`) so the label/description start further right of the
  counter, matching the reference's wider gap.
- Desktop layout untouched; this is the deferred mobile pass.

### 2026-06-30 — Capabilities: tightened proportions to match reference

**What:** Pulled the home `Capabilities` card closer to the reference layout — smaller
copy, narrower measure, shorter card, smaller numeral, framed diagram. Dark theme kept.

- **Description** — `max-width` 32ch → 26ch (shorter line length) and `font-size`
  cap 1.875rem → 1.5rem (30px → 24px).
- **Card height** — `min-height` cap 30rem → 22rem, closing the dead space that
  pushed the giant numeral far below the text.
- **Giant numeral** — `font-size` cap 11rem → 8rem so it stops dominating the
  shorter card.
- **Body gap** — label→description gap cap 1.75rem → 1.25rem (tighter rhythm).
- **Diagram** — added a `1px solid var(--color-stroke-muted)` frame on `.figureClip`
  to match the reference's bordered diagram box.
- All values stay clamp/token-based; no structural or color change.

### 2026-06-30 — Capabilities: flipped from light to dark

**What:** The home `Capabilities` section now renders dark instead of light. Swapped
its theme wrapper class from `theme-light` to `theme-dark` in `Capabilities/index.jsx`.

- **One-word change, no restyle** — the component already styles everything through
  semantic tokens (`--color-bg-primary`, `--color-bg-secondary`,
  `--color-text-primary/secondary`, `--color-stroke`, `--color-stroke-light`).
  `.theme-dark` (tokens.css) remaps exactly those, so the whole section inverts
  with no per-property edits and no hardcoded values.
- **Bonus fit** — the four diagram SVGs have a dark surface baked in, so they now
  blend into the dark `--color-bg-secondary` card instead of contrasting against a
  light panel.
- Updated the stale "Light section" comment at the top of `Capabilities.module.css`.

### 2026-06-30 — Product Stepper: reuse the four Capabilities diagram SVGs

**What:** Repointed the four `Stepper` step images on the product page from their
`public/images/step-*.svg` placeholders to the same rebrand diagrams now used in
`Capabilities` (`public/svgs/relai-*.svg`), matched by step `capsule`: Vessel
Intelligence → `relai-vessel-intelligence`, Terminal Orchestration →
`relai-terminal-orchestration`, Drayage & Handoff → `relai-drayage-handoff`,
Emissions & Idle → `relai-emissions-idle`.

- **`content/product.js` only** — swapped the four `steps[].image` paths. No
  component or CSS change.
- **Fit note (not restyled):** the Stepper card is portrait/near-square
  (`aspect-ratio 100/111.21` desktop, `100/97.96` mobile) with `object-fit:
  contain` and a `--color-black` background, whereas these SVGs are 16:9. They
  render as a horizontally-centered band; because each SVG's baked-in dark surface
  matches the black card, the contain letterboxing blends rather than showing bars.
  The diagram therefore fills the card's width but not its full height — left as-is
  per "don't restyle," flagged for review.
- **Old `step-*.svg` placeholders kept** in `public/images/` (now unused).

### 2026-06-30 — Capabilities: real diagram SVGs replace placeholders

**What:** Swapped the four `Capabilities` diagram slots from their generic
`public/images/capability-*.svg` placeholders to the rebrand diagrams in
`public/svgs/relai-*.svg`, mapped by tab — Vessel Intelligence (01) →
`relai-vessel-intelligence`, Terminal Orchestration (02) →
`relai-terminal-orchestration`, Drayage & Handoff (03) → `relai-drayage-handoff`,
Emissions & Idle (04) → `relai-emissions-idle`.

- **`content/home.js` only** — repointed the four `image.src` values. No component
  or CSS change: the slot is already `aspect-ratio: 16/9` with `object-fit: cover`,
  and each SVG is a self-contained `viewBox 0 0 640 360` (16:9) with the dark
  surface baked in, so it fills the existing slot with no crop and no restyling.
- **`alt` text left unchanged** — already describes each diagram accurately.
- **Old `capability-*.svg` placeholders kept** in `public/images/` (now unused);
  left in place rather than deleted since removal wasn't in scope.

### 2026-06-28 — Leadership: portrait above each name/role

**What:** Each person in `Leadership` now stacks a portrait above the name +
role, rendered through the shared `Media` primitive (`fill`, `4/5`). Dropped the
old `border-top` row dividers and per-row padding — they read as a list, which no
longer suits an image-card grid — and switched the grid to gap-based spacing
(`--space-4xl` base, `--space-6xl` row-gap once multi-column).

- **4 new placeholder SVGs in `public/images/`** (`leadership-<first>-<last>.svg`),
  one per leader, following the site's existing dark-box convention (`#20231f`
  fill, inset `#ffffff26` border, mono `PORTRAIT` label + dimmed name caption),
  matching `testimonial-portrait.svg`. `viewBox` is `800×1000` (4/5) so
  `preserveAspectRatio="…slice"` fills the slot cleanly; font sizes hold the same
  ratio-of-shorter-side as the other placeholders.
- **Wired each person an `image`** in `content/about.js` pointing at its SVG.
- Component keeps a token-colored fallback box (`--color-bg-secondary`) for any
  person without an `image`, and stays forward-compatible — swap the `image` for
  a real headshot and nothing else changes.

**Why:** Requested portraits over the names, using the same placeholder images as
the rest of the site rather than a flat box.

### 2026-06-28 — Hero title reveal: clip-wipe → slide-up mask

**What:** Replaced the title's entrance tween. It was a `clip-path: inset()`
top-down wipe combined with `yPercent: 35` + opacity. Now the `<h1>` is wrapped
in a `.titleMask` (`overflow: hidden`) and slides up from `yPercent: 120 → 0`.

**Why:** With `--leading-display: 1`, the clip rectangle was the tight 1em line
box, so the wipe sliced straight through the glyphs and the descenders only
appeared at the very end when `clearProps` dropped the clip — the heading read as
"not showing the full letters" for most of the animation. A slide-up mask reveals
the line from a clean bottom edge: glyphs are always whole, descenders are never
sliced, and the `clearProps` hack is gone.

**Tradeoffs / details:** The title `font-size` moved from `.title` onto
`.titleMask` so the descender/ascender bleed can be expressed in `em` and scale
with the fluid heading. The mask uses `padding-block: 0.14em` (room so
`overflow: hidden` doesn't crop the tight line-height-1 caps/tails) with a
matching `margin-block: -0.14em` so vertical rhythm is unchanged — `0.14em` stays
under `--space-l` (1.25rem) even at the 8rem dark title. `120%` clears the mask +
bleed at every title size and line count (overshoot is harmless under the clip).

### 2026-06-28 — Global film-grain / noise overlay on the page background

Recreated the Figma "Noise" effect (Mono, fine grain, white @ 10% over the black
fill) as a site-wide texture. The page background color was already true black
(`--color-bg-primary`), so the only new work was the grain.

- **Mechanism** — a single fixed, `pointer-events: none` `body::before` overlay in
  `globals.css`, sized to the viewport, sitting above page content but below the
  nav/modals (`--z-overlay`). No new component, no dependencies.
- **The grain** — an `feTurbulence` fractal-noise SVG (`--noise-image` in
  `tokens.css`) whose noise is routed into the **alpha channel** via `feColorMatrix`,
  so it can drive a CSS alpha mask. `baseFrequency` maps to Figma's "Noise size";
  `--noise-opacity` (0.12) maps to the 10%. Both are the tuning knobs.
- **Theme-aware (whole site)** — the masked grain is painted with a solid color that
  flips: white on the dark default, black on light routes via
  `body:has(> .theme-light)::before`. This works because RouteTheme/Header already
  add the global `theme-light` class to a direct child of `<body>` on `/about` and
  `/book-a-demo`.
- **Why mask + flipped color, not `mix-blend-mode`** — pure `#000`/`#fff`
  backgrounds collapse blend modes (anything × 0 = 0), so a blend would show no
  grain on the actual page extremes. Masking a theme-flipped solid color is robust
  on both and needs no JS.

### 2026-06-28 — Standalone GSAP `MobileMenu` overlay (parent-controlled)

New self-contained, full-screen mobile menu that is **not** coupled to any header
— a controlled overlay driven by an `open` prop, intended to be mounted only on
mobile breakpoints. Built to a detailed motion spec; the panel slides in
right-to-left and back out to the right, while links + tagline reveal with a
vertical clip stagger.

- **`components/MobileMenu/`** — the overlay panel only. Props: `open`, `onClose`,
  `links` (`[{ href, label, count? }]`), optional `tagline`. Animation runs through
  `useGSAP({ scope, dependencies: [open] })` — the repo's existing `gsap.context`
  wrapper (Hero/Reveal/Stepper) — keeping `hasBeenOpened` (so close never fires on
  first mount) and `menuTl` (killed before each new timeline) refs as specified.
  Mirrors `ContactModal`'s body-scroll-lock + Escape-to-close. Since the parent
  mounts it on mobile only, there's no `matchMedia`/resize logic.
- **`components/MenuToggle/`** — the toggle is a separate component so it can be placed
  anywhere. Two bars (a hamburger) that morph into an X while open; styled as a chip
  (like the old Header menu chip) so it stays legible over both the page and the frost.
- **Wired into `Header` (replaces the old white mobile menu).** Below 1024px the Header
  now renders `MenuToggle` (top-right, above the modal layer so it stays clickable to
  close) + the `MobileMenu` overlay, fed the full nav (Home, Product, About, Mission,
  Book a Demo) with a "Redefining Freight" tagline. Toggle + overlay sit at the top
  level (outside the fixed `<header>`'s `z-nav` stacking context) so the overlay's
  `--z-modal` layer actually paints above the bar. The throwaway demo harness used
  during the build was removed.
- **Removed the old `.mobileMenu`** (and its `.mobileLink`/`.mobileContact` styles).
  This also retires a latent bug there — its links were white-on-white (only the gray
  "Contact" showed). **Behavior change:** the old menu's Contact-modal shortcut is gone
  on mobile (it only ever lived in that menu; "Book a Demo" remains the CTA). Easy to
  re-add as a menu action if wanted.
- **Token substitutions** (flagged, none invented): panel background reuses the
  existing frosted-menu treatment — `--color-nav-glass` + `backdrop-filter: blur(12px)`
  — so, like the old Header frosted pill, the foreground is `--color-black` (the spec's
  `--color-text-primary` would be white-on-white). Tagline's literal `2rem` → `--font-h2`
  (fluid, maxes at 2rem); missing `--leading-normal` → `--leading-heading`. The
  full-screen panel sits at `--z-modal` (not the spec's "nav layer").
- **Reduced motion**: unlike the decorative GSAP sections (which no-op), the menu still
  opens/closes — just instantly — since it's functional.

### 2026-06-28 — Every image slot is now a uniform SVG placeholder

Swept the whole site onto the existing dark-box placeholder convention (the
`MEDIA — …` / mono-caption SVGs already used for the hero, capabilities, and
testimonial). All remaining real raster images (`.webp`) now point at generated
placeholder SVGs, so the project shows consistent "drop the real asset here"
boxes until final media lands.

- **16 new placeholder SVGs in `public/images/`**, one per slot, each self-contained
  (dark `#20231f` fill, inset `#ffffff26` border, mono primary label + dimmed caption)
  with a `viewBox` whose aspect matches its container so `preserveAspectRatio="…slice"`
  fills cleanly without cropping the border. Naming mirrors usage: `media-*` (heros),
  `card-*` (home shortcut + footer cards), `image-*`/`step-*` (split + stepper),
  `gallery-*` (mission ImageRow), `map-network` (Explore). Font sizes scale at a fixed
  ratio of the viewBox's shorter side, matching the pre-existing `media-hero`/`portrait`.
- **Repointed 16 content `src`s** across `home`, `about`, `product`, `mission`, `site`.
  Labels by category: `MEDIA — ABOUT/PLATFORM`, `DIAGRAM` (freight network), `MAP`
  (network), `IMAGE` (everything else); captions name the slot (e.g. "Why Relai",
  "Vessel Intelligence", "Get in touch").
- **`alt` text left unchanged** — it still describes the intended asset, so it's already
  correct once a real image replaces the placeholder. Only the `src` moved.
- **Orphaned `.webp` files were left in place** (non-destructive) — now unreferenced and
  safe to delete. The disabled `_mission-legacy/page.js` and the brand favicons/logo
  marks were intentionally left untouched.

### 2026-06-28 — About + Book-a-Demo render fully white (route-level theme)

Made `/about` and `/book-a-demo` **entirely white** — every section *and the shared
Footer* — while Home/Product/Mission stay dark. Realises the theme-scoping intent already
noted in `tokens.css` ("light on About/Book-a-Demo").

- **New `components/RouteTheme/`** (`"use client"`) — a thin route-aware wrapper placed in
  `layout.js` around `<main>` + `<Footer>`. On a `LIGHT_ROUTES` match it adds the global
  `theme-light` class (flips the semantic token set) plus a white surface
  (`--color-bg-primary`) and foreground (`--color-text-primary`), so the page's transparent
  light-tone sections (`Hero`/`TextSection`/`SplitSection`) inherit dark text. It always
  renders a `flex:1` column so the body's sticky-footer layout is unchanged on every route.
  Add a route to the set to make it white — no per-page or per-component edits.
- **Why a wrapper, not component edits.** `Hero`/`TextSection`/`SplitSection`/`FormSection`
  are shared with the dark routes, so editing their CSS would flip Product/Mission too.
  Scoping the theme at the layout is the design system's sanctioned "page wrapper" pattern
  and the only way to also reach the shared `Footer`.
- **`Footer` → semantic tokens** so it flips inside `theme-light`: bg `--color-bg-dark` →
  `--color-bg-primary`, text `--color-white` → `--color-text-primary`, and the three
  `--color-gray-light` link/subhead colors (invisible on white) → `--color-text-secondary`.
  On the dark routes these resolve to the same black/white, so those footers are unchanged
  (bar a marginally deeper grey on the secondary text). The white demo card gained a
  `--color-stroke-muted` hairline for definition on the white footer (invisible on dark).
- **Nav needs no change** — these routes use the legacy light-styled `Header` (black logo,
  white pills), which already reads correctly on white.
- **Verification:** `next build` clean (8 routes static). Headless-Chrome captures confirm
  `/about` + `/book-a-demo` are white head-to-foot with legible dark type, while `/` (dark
  hero/intro → white mid-block → **dark footer**) and `/mission` (all dark) are unchanged.

### 2026-06-28 — Real Relai logo + brand favicons wired in

Replaced the placeholder wordmark and the neutral favicon with the supplied brand
assets (dropped at `public/RelaiLogos/`, now integrated and the staging folder removed).

- **`Logo` is now the real lockup** — `components/Logo/index.jsx` renders the **inline
  SVG mark** (three offset bars, `currentColor`) + the **live `RELAI` wordmark** in
  `--font-primary` (never baked into an image). Co-located `Logo.module.css` replaces the
  old inline-styled reference; the only dynamic value is `--logo-height` (the mark height),
  passed as a custom property so the gap/wordmark scale in `em` and proportions stay locked.
  **API unchanged** (`{ className, height }`), so the existing `SiteNav` (header + drawer)
  and legacy `Header` call sites upgrade automatically. Resolves the `needs-real-asset`
  note from the Korr→Relai scrub.
- **Themes itself.** The wrapper reads `--color-text-primary` (the project's foreground
  token), so the lockup paints white on the dark nav/footer and would flip to black under
  any `.theme-light` surface — consistent with the zero-radius monochrome system.
- **Footer brand.** Added the live `Logo` to the footer bottom cluster as a home link
  (`aria-label` from `nav.brand`), above the `© 2026 Relai` line.
- **Favicons.** Brand `favicon.ico` → `src/app/favicon.ico` (App Router file convention,
  auto-linked). `favicon.svg`, `favicon-32.png`, `apple-touch-icon.png` → `public/`,
  referenced via `metadata.icons` in `content/site.js` (SVG + 32px PNG fallback + apple).
- **Brand SVGs** `relai-mark.svg` + `relai-lockup.svg` → `public/images/` (asset-SVG home).
  The reference `Logo.jsx` was preserved at `docs/Logo.reference.jsx`.

### 2026-06-28 — Home flips white from Capabilities down (Footer stays dark)

The home page (`/`) was all-dark. Made **Capabilities → Testimonials → Shortcuts** a single
continuous **white** block — Hero/Intro stay dark above, the Footer stays dark below.

- **Driven by the existing `.theme-light` system, not new colors.** Each of the three
  sections now carries the global `theme-light` class (the same mechanism `SiteNav` uses),
  so every semantic token flips to dark-on-white in one move — including borders
  (`--color-stroke` / `--color-stroke-light` invert to dark hairlines automatically).
- **Raw tokens → semantic tokens** so the flip actually takes effect: `Capabilities`
  (`--color-black`/`--color-white` → `--color-bg-primary`/`--color-text-primary`, active
  underline → `--color-stroke`, card → `--color-bg-secondary`) and `Testimonials`
  (section bg/text, logo card → `--color-bg-secondary`, and four `--color-gray-light`
  text colors — invisible on white — → `--color-text-secondary`).
- **Inherited color re-asserted on `Shortcuts`.** `color` is set on `<body>` (computes to
  white there), so a `theme-light` subtree keeps inheriting white unless re-declared;
  added `color: var(--color-text-primary)` to the section. This also fixes a latent issue —
  `Capabilities`' card text was `--color-text-primary` (white) on a light card, i.e. nearly
  invisible; under `theme-light` it's now black-on-light.
- **No black seams.** `Shortcuts` used `margin-top/bottom` (which would expose the black
  body background as strips inside the white block) → converted to `padding-top/bottom`
  (same 140/46px and 120/72px values) so the white runs unbroken to the Footer.

Scope is home-only — these three components are used solely on `/`, so editing them
directly is safe.

### 2026-06-28 — Hero `tag` label moves above the heading

The bracketed section label (`tag`, e.g. `[ FREIGHT ]`, `[ MISSION ]`, `[ PLATFORM ]`,
`[ DEMO ]`) now renders **above** the `<h1>` instead of in the meta block beneath it —
across every hero, at all breakpoints (it's a DOM-order change, not responsive). One edit
to the shared `Hero` covers all five pages.

- **`Hero/index.jsx`** — `tag` lifted out of the post-title `metaRow` into its own `<span>`
  directly before the title, tagged `data-hero-tag`. `hasMeta` no longer counts `tag`, so a
  tag-only hero (Home/Product/Demo) renders no empty meta block. The entrance timeline gives
  the relocated tag the eyebrow's `from(y:16, opacity:0)` at t=0, so it reads as a top label.
- **`Hero.module.css`** — `.tag` gains `align-self: flex-start` (matches `.eyebrow` in the
  flex column). `.metaRow` switches `space-between` → `flex-end` so Mission's lone scroll
  arrow keeps its right alignment now that the tag no longer shares the row.

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

- **Line-height is a flat `1` everywhere**, including multi-line body copy (FAQ
  answers, form text, footer, testimonials). This is the intended tight house
  style, but a few long-paragraph spots may read cramped — flag any specific
  place that needs air and it can get a local exception. A handful of inline px
  comments next to former line-heights are now stale and worth a cleanup pass.
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
