# Relai Rebrand — Legacy Audit (READ-ONLY)

**Scope:** Inventory every reference to the old brand (Korr), old industry (insurance),
old typeface (ABCFavorit), reference brands (Anduril / Arsenal-1), reference partners
(Tokio Marine / Wellcove / Chad Hersh), and hardcoded/legacy colors & assets.
**No files were changed.** This is reconnaissance only.

`tokens.css` and `globals.css` are treated as already-Relai per the brief; they are
audited for confirmation only and not flagged as defects (one exception called out in §3/§9).

---

## 1. BRAND IDENTITY — "Korr" / gokorr / korr-inc

**110 occurrences of "Korr" across 15 source files.** Below are the brand-as-identity
hits (chrome, metadata, logo, social). Page-body copy uses of "Korr" are in §2.

### Visible chrome (Critical)
| File:Line | Text | What it is |
|---|---|---|
| [Header/index.jsx:33](src/components/Header/index.jsx#L33) | `aria-label="Korr — home"` | Logo link aria (header used on /about, /mission, /product, /book-a-demo) |
| [Header/index.jsx:39](src/components/Header/index.jsx#L39) | `korr` | **Literal visible text** — the "home pill" wordmark shown when scrolled |
| [SiteNav/index.jsx:78](src/components/SiteNav/index.jsx#L78) | `aria-label="Korr — home"` | Logo link aria (nav used on / and /arsenal-1) |
| [SiteNav/index.jsx:157](src/components/SiteNav/index.jsx#L157) | `Contact Korr` | Visible drawer button label |
| [SiteNav/index.jsx:28](src/components/SiteNav/index.jsx#L28) | `https://www.linkedin.com/company/korr-inc/` | Social link URL |
| [Footer/index.jsx:32](src/components/Footer/index.jsx#L32) | `<strong>Korr</strong> is a cloud-based insurance management platform` | Footer blurb |
| [Footer/index.jsx:34](src/components/Footer/index.jsx#L34) | `…Korr offers the fastest path to AI` | Footer blurb |
| [Footer/index.jsx:84](src/components/Footer/index.jsx#L84) | `© 2026 Korr` | **Copyright line** |
| [Footer/index.jsx:88](src/components/Footer/index.jsx#L88) | `https://www.linkedin.com/company/korr-inc/` | Social link URL |
| [ContactModal/index.jsx:28](src/components/ContactModal/index.jsx#L28) | `aria-label="Contact Korr"` | Modal aria |
| [ContactForm/index.jsx:9](src/components/ContactForm/index.jsx#L9) | `heading = "We'd like to talk about partnering with Korr"` | Default form heading |
| [ContactForm/index.jsx:31](src/components/ContactForm/index.jsx#L31) | `…A member of the Korr team will reach…` | Success message |
| [ContactForm/index.jsx:93](src/components/ContactForm/index.jsx#L93) | `Looking to get acquainted with Korr?` | Form helper text |

### Logo / wordmark (Critical)
| File:Line | Text | What it is |
|---|---|---|
| [Logo/index.jsx:1](src/components/Logo/index.jsx#L1) | `// Korr wordmark — exact path from the source site` | Comment |
| [Logo/index.jsx:9](src/components/Logo/index.jsx#L9) | `aria-label="Korr"` | **The `<path>` draws the literal letterforms K‑O‑R‑R.** This SVG *is* the Korr logo — needs a Relai wordmark, not just a string swap. |

### Metadata (Critical — see also §6)
| File:Line | Text |
|---|---|
| [layout.js:8](src/app/layout.js#L8) | `metadataBase: new URL("https://www.gokorr.com")` |
| [layout.js:10](src/app/layout.js#L10) | `default: "Korr — Redefining Insurance"` (`<title>`) |
| [layout.js:11](src/app/layout.js#L11) | `template: "%s — Korr"` (per-page title suffix) |
| [layout.js:14](src/app/layout.js#L14) | meta description — "Korr is the first truly versatile insurance platform…" |
| [layout.js:16](src/app/layout.js#L16) | `openGraph.title: "Korr — Redefining Insurance"` |

### Code comments mentioning Korr (Low)
- [Header.module.css:62](src/components/Header/Header.module.css#L62) — `/* the "korr" text pill only shows once scrolled */`
- [Hero/Hero.module.css:42](src/components/Hero/Hero.module.css#L42) — `…so Korr pages are unaffected`
- [tokens.css:5](src/styles/tokens.css#L5) — `Drop-in replacement for the Korr tokens.`
- [tokens.css:42](src/styles/tokens.css#L42) — `layout/scale carried over from Korr build`
- **README.md** — ~20 mentions (project changelog: lines 129, 142–143, 156, 169, 205–206, 252–254, 337, 351–393). Historical log, not user-facing.

---

## 2. COPY / CONTENT — insurance domain

**79 insurance-family matches** (insurance/insurer/insurtech/policy/claims/underwriting/
premium/TPA/policyholder). All current copy is insurance; none is freight yet.
Grouped by the file that owns the copy:

### [src/app/page.js](src/app/page.js) — Home (Hero, Intro, Stepper, Testimonials, Shortcuts)
- L13 `title="Redefining Insurance"`
- L14 Hero text — "first truly versatile **insurance platform**—streamlining **claims**, simplifying **policy administration**… across the **insurance value chain**."
- L24–27 `id="why-korr"`, "Insurance has evolved…", `capsule="Why Korr"`, "enabling **carriers** to launch products faster…"
- L38 "Legacy systems hold you back…"
- L44 "Insurance is all about expecting the unexpected…"
- L50 "no-code rules engine…"
- L56 "reliability and scale modern **insurers** expect…"
- L62 interface copy
- L71–80 **Testimonial: "Robert Pick, EVP & Chief Information Officer"** + L78 **"Chad Hersh, Global Life Insurance Industry Lead, AWS"**
- L82 cloud-native insurance quote
- L85–87 **"Claims Supervisor, Wellcove"** testimonial
- L98 "venture-backed **insurtech**… supported by leading global insurers such as **Tokio Marine**… born in **New York**…"
- L104 BlackBerry/"modernizing insurance" card
- L111 "Empowering the **insurance industry** to operate at the speed of change."

### [src/app/about/page.js](src/app/about/page.js)
- L8 meta desc — "Founded in 2021 in **New York City**, Korr is building the most innovative **insurance platform**…"
- L27–28 "Until now, **insurance software** has added extra work…"; "Korr's experience implementing insurance solutions…"
- L34 `title="Bridging insurance and modern technology"`
- L36 "established Korr in New York City…"
- L38 "240,000 policies currently in production…"
- L42 `alt: "Why Korr."`
- L48 `title="A total transformation of insurance"`
- L50 mission/vision insurance copy

### [src/app/mission/page.js](src/app/mission/page.js)
- L8 meta — "Korr's mission… redefining **insurance** as a sector…"
- L16 `title="The Korr Mission"`
- L23–24 "modern and innovative platform for the **insurance industry**…", vision copy
- L30 `title="Founded to build the most innovative insurance platform"`
- L32 "founded in 2021 in New York City…"
- L33 "decades of experience in **insurance IT**… your **policyholders** and stakeholders."

### [src/app/product/page.js](src/app/product/page.js)
- L9 meta — "cloud-native core **insurance solution**…"
- L17 `title="Finally, a core system focused on supporting your business"`
- L30 "cloud-native core insurance solution…"
- L38–39 "**Insurance** runs on rules, workflows…"; "unifying **policy, claims, and billing**…"
- L52 "rating logic… any **policy structure**…"
- L64 lead — "One of the largest **carriers** in the US went live… through their **TPA**…"
- L74–75 system-of-record copy
- L97–163 **FAQ block** (insurance-heavy): "240,000+ policies", "design partner **Wellcove**", "500,000 policies", "cyber risk **insurance**", "wide range of **insurance lines**", "any **insurance project**", etc.

### [src/app/book-a-demo/page.js](src/app/book-a-demo/page.js)
- L7 meta — "the **insurance interface** that enables change at the speed of insurance."
- L15–16 "Get a Closer Look At Korr…", "insurance interface of the system…"
- L25 `alt: "…Korr's web-based product interface in green and white."` (also references old green)
- L27 `formHeading="We'd like to talk about partnering with Korr"`

### [src/components/Footer/index.jsx](src/components/Footer/index.jsx)
- L16 CSS comment `/* Left — future of insurance */` ([Footer.module.css:16](src/components/Footer/Footer.module.css#L16))
- L30 `<h2>The future of insurance</h2>`
- L32–35 "cloud-based **insurance management platform** built specifically for **carriers, agents, and TPAs**…"
- L54 "Ready to replace your outdated **insurance software**…"

### Named reference partners (insurance) — Critical
| File:Line | Entity | Where it feeds |
|---|---|---|
| [page.js:73,80,98](src/app/page.js#L72) | **Tokio Marine** | Testimonial carousel + "About" statement |
| [page.js:78–80](src/app/page.js#L78) | **Chad Hersh (AWS)** | Testimonial carousel |
| [page.js:71](src/app/page.js#L71) | **Robert Pick, EVP & CIO** | Testimonial carousel |
| [page.js:85–87](src/app/page.js#L85), [product/page.js:100](src/app/product/page.js#L100) | **Wellcove** | Testimonial + FAQ "design partner" |

---

## 3. COLOR / HARDCODED HEX (component CSS only — tokens.css/globals.css excluded)

Only **one** component CSS file hardcodes a color that should be a token; the rest are
mask/shadow primitives (black/transparent), which are mechanically required, not brand colors.

| File:Line | Value | Property | Verdict |
|---|---|---|---|
| [ContactModal/ContactModal.module.css:9](src/components/ContactModal/ContactModal.module.css#L9) | `rgba(32, 35, 31, 0.55)` | `background-color` (modal scrim) | **FLAG.** `32,35,31` = `#20231f` — the **legacy near-black** at 55%. Should reference a token (e.g. `var(--color-surface)` via `color-mix`, or a dedicated scrim token). |
| [Capabilities/Capabilities.module.css:157,158,163,164](src/components/Capabilities/Capabilities.module.css#L157) | `#000` | `-webkit-mask-image` / `mask-image` gradient stops | Benign — black = "reveal" in an opacity mask, not a brand color. Leave as-is. |
| [Capabilities/Capabilities.module.css:159,165](src/components/Capabilities/Capabilities.module.css#L159) | `rgba(0, 0, 0, 0)` | mask gradient stop | Benign — transparent mask stop. |
| [Header/Header.module.css:57](src/components/Header/Header.module.css#L57) | `rgba(0, 0, 0, 0.12)` | `box-shadow` | Benign shadow; optionally tokenize. |
| [Header/Header.module.css:113](src/components/Header/Header.module.css#L113) | `rgba(0, 0, 0, 0.08)` | `box-shadow` | Benign shadow; optionally tokenize. |

**Legacy hex confirmation:**
- `#34d601` (old Korr green) — **not present** in any source file. Only in README changelog (L279, L365). ✅ removed from tokens.
- `#20231f` (old near-black) — **still present** in [tokens.css:22](src/styles/tokens.css#L22) as `--color-surface`, and duplicated in raw rgb form in ContactModal (above). See §9 for the decision needed.

---

## 4. FONTS — ABCFavorit

- **No active `@font-face` anywhere.** The only `font-face` hits are *comments* in
  [globals.css:7-10](src/app/globals.css#L7) and [tokens.css:10](src/styles/tokens.css#L10)
  explaining how to add one. Primary/secondary fonts now resolve to Helvetica/system via
  `--font-primary` / `--font-secondary` (no ABCFavorit reference in CSS).
- **No `ABCFavorit` reference in any `src/` code.** ✅ unhooked from the build.
- **But the 10 font files still ship in [public/fonts/](public/fonts/)** — orphaned, and
  ABCFavorit is a licensed commercial typeface (ABC Dinamo). See §5.
- README mentions ABCFavorit at L156, L359, L390, L466 (log only).

---

## 5. ASSETS

### Fonts — `public/fonts/` (10 files, ALL orphaned & licensed → remove)
No code references any of these (tokens use system Helvetica):
`ABCFavorit-Bold.woff/.woff2`, `ABCFavorit-BoldItalic.woff/.woff2`,
`ABCFavorit-Regular.woff/.woff2`, `ABCFavorit-RegularItalic.woff/.woff2`,
`ABCFavoritMono-Regular.woff/.woff2`.

### Images — `public/images/`

**Brand / reference-tied (must become placeholders — Critical):**
| File | Referenced at | Depicts |
|---|---|---|
| [carousel-tokio.webp](public/images/carousel-tokio.webp) | [page.js:72](src/app/page.js#L72) | **Tokio Marine** logo (insurance) |
| [carousel-chad.webp](public/images/carousel-chad.webp) | [page.js:79](src/app/page.js#L79) | **Chad Hersh** headshot (AWS exec) |
| [carousel-wellcove.svg](public/images/carousel-wellcove.svg) | [page.js:86](src/app/page.js#L86) | **Wellcove** logo (insurance partner) |
| [capability-rpo.jpg](public/images/capability-rpo.jpg) | [Capabilities/index.jsx:29](src/components/Capabilities/index.jsx#L29) | **Anduril** defense capability (RPO) |
| [capability-battle-management.png](public/images/capability-battle-management.png) | [Capabilities/index.jsx:38](src/components/Capabilities/index.jsx#L38) | **Anduril** ("Battle Management") |
| [capability-modular-payloads.jpg](public/images/capability-modular-payloads.jpg) | [Capabilities/index.jsx:47](src/components/Capabilities/index.jsx#L47) | **Anduril** ("Modular Payloads") |
| [capability-mesh-comms.png](public/images/capability-mesh-comms.png) | [Capabilities/index.jsx:56](src/components/Capabilities/index.jsx#L56) | **Anduril** ("Mesh Comms") |
| [arsenal-qr.svg](public/images/arsenal-qr.svg) | [arsenal-1/page.js:79](src/app/arsenal-1/page.js#L79) | QR for the **Arsenal-1** (Anduril ref) experience |
| [demo-illustration.svg](public/images/demo-illustration.svg) | [book-a-demo/page.js:24](src/app/book-a-demo/page.js#L24) | Abstract product-UI illustration; alt calls it "Korr's web-based product interface **in green and white**" (old brand green) |

> SVGs (`carousel-wellcove.svg`, `arsenal-qr.svg`, `demo-illustration.svg`) contain no
> plaintext `<text>` brand strings, but `carousel-wellcove.svg` is the Wellcove mark by
> purpose and `arsenal-qr.svg` is the Arsenal-1 QR — both are brand-tied regardless.

**Neutral / reusable (generic visuals, keep — but note insurance-flavored alt text):**
about-hero.webp, about-why.webp, concrete.webp, home-about.webp, home-mission.webp,
mission-globe.webp, product-architecture.webp, product-feature-1/2/3.webp,
step-concept/adaptability/build/product.webp.

**Orphaned images (present in `public/images/` but ZERO code references):**
- [product-ai.webp](public/images/product-ai.webp)
- [carousel-concept.webp](public/images/carousel-concept.webp)
- [mission-hero.webp](public/images/mission-hero.webp)

### Video — `public/video/`
| File | Referenced at | Note |
|---|---|---|
| [hero.mp4](public/video/hero.mp4) | [page.js:19](src/app/page.js#L19) | Home hero bg — review footage for brand/industry fit |
| [mission.mp4](public/video/mission.mp4) | [mission/page.js:17](src/app/mission/page.js#L17) | Mission hero bg — same |

### Favicon
- [src/app/favicon.ico](src/app/favicon.ico) — 25.9 KB, 16/32px (MS icon). Next auto-serves
  it as the site favicon. **Almost certainly the Korr mark → replace (Critical).**

---

## 6. METADATA / SEO / CONFIG

| File:Line | Item | Carries old brand? |
|---|---|---|
| [layout.js:8](src/app/layout.js#L8) | `metadataBase` = `https://www.gokorr.com` | **Yes — Korr domain** |
| [layout.js:10-11](src/app/layout.js#L10) | `<title>` default + template ("Korr — Redefining Insurance" / "%s — Korr") | **Yes** |
| [layout.js:13-14](src/app/layout.js#L13) | meta description (insurance) | **Yes** |
| [layout.js:15-21](src/app/layout.js#L15) | `openGraph` title + description (insurance) | **Yes** |
| Per-page `metadata` | about/mission/product/book-a-demo/arsenal-1 each export `title` + `description` | **Yes** (insurance + Arsenal-1) |
| [package.json:2](package.json#L2) | `"name": "studio-system-core"` | Template name (not Korr, but stale) |
| [src/app/favicon.ico](src/app/favicon.ico) | favicon | **Likely Korr** |
| OG/Twitter image | none defined | — (no `og:image` / `twitter:` tags exist) |
| manifest / robots / sitemap | **none present** | — (none found anywhere) |
| [next.config.mjs](next.config.mjs) | no brand strings; `dangerouslyAllowSVG` for local SVGs | clean |
| [jsconfig.json](jsconfig.json), [eslint.config.mjs](eslint.config.mjs), [.gitignore](.gitignore) | no brand strings | clean |
| env vars | none in repo | — |

---

## 7. COMPONENT / CLASS / ROUTE / KEY NAMES

**No component, CSS class, or variable is literally named `Korr` or `Insurance`.** The
naming is generic-systemic (Hero, Footer, Stepper, Testimonials, etc.). The off-brand
*structural* names are all from the **Anduril / Arsenal-1** reference rebuild:

| Kind | Name | Location |
|---|---|---|
| **Route folder** | `arsenal-1` | [src/app/arsenal-1/](src/app/arsenal-1/) → URL `/arsenal-1` |
| Nav link label + href | `{ label: "Arsenal-1", href: "/arsenal-1" }` | [SiteNav/index.jsx:15](src/components/SiteNav/index.jsx#L15) |
| Route→theme key | `"/arsenal-1": "dark"` | [SiteHeader/index.jsx:13](src/components/SiteHeader/index.jsx#L13) |
| Component | `Capabilities` (Anduril "ProductQualitiesSlice" rebuild; defense content) | [src/components/Capabilities/](src/components/Capabilities/) |
| Data keys | `capability-rpo`, `battle-management`, `modular-payloads`, `mesh-comms` (+ titles/copy) | [Capabilities/index.jsx:28-56](src/components/Capabilities/index.jsx#L28) |
| Component | `Explore` (renders the Arsenal-1 QR) | alt "QR code linking to the Arsenal-1 experience" [Explore/index.jsx:54](src/components/Explore/index.jsx#L54) |
| Hero prop/comment | `meta` default e.g. `["Designed by Anduril", "Built in Ohio"]`; comments cite "Arsenal-1 reference" | [Hero/index.jsx:19-20](src/components/Hero/index.jsx#L19), [Hero.module.css:5](src/components/Hero/Hero.module.css#L5) |
| Global utility class | `.hero-wordmark` — comment "Anduril-style display" | [globals.css:109](src/app/globals.css#L109) |
| Token comment | `--font-display … (Anduril)` | [tokens.css:57](src/styles/tokens.css#L57) |
| CSS comment | "remapped from Anduril's domains to relai's real routes" | [SiteNav/index.jsx:10](src/components/SiteNav/index.jsx#L10) |

> Anduril/Arsenal copy lives in [src/app/arsenal-1/page.js](src/app/arsenal-1/page.js):
> "Designed by Anduril" (L19), "Rebuilding the arsenal of democracy… partner with Anduril"
> (L89), "new Anduril roles open locally in Ohio" (L95), "Find your future at Anduril" (L98),
> plus the whole Arsenal-1 facility narrative (L11, L18, L41, L53 — "$900M", "5M+ sq ft",
> "4000+ new jobs", "Ohio"). **8 Anduril + 20 Arsenal hits in src.**

---

## 8. SUMMARY TABLE

| # | Category | Count (src) | Priority | Notes |
|---|---|---|---|---|
| 1 | "Korr" brand string | 110 across 15 files | **Critical** | + ~20 in README (log, Low). Logo SVG draws K-O-R-R letterforms. |
| 1 | gokorr.com domain | 1 (layout.js) | **Critical** | metadataBase |
| 1 | korr-inc LinkedIn URL | 2 (Footer, SiteNav) | **Critical** | |
| 2 | Insurance-domain copy | 79 matches | **Critical** | All page bodies + Footer; visible. |
| 2 | Reference partners (Tokio/Wellcove/Chad/Pick) | 10 | **Critical** | Logos + named testimonials. |
| 3 | Hardcoded legacy color in component CSS | 1 real (ContactModal `rgba(32,35,31,…)`) | Medium | + 4 benign mask/shadow blacks. |
| 3 | `#34d601` old green | 0 in src | ✅ | Confirmed removed (README log only). |
| 3 | `#20231f` old near-black | 1 token + 1 component | **Decision** | Survives as `--color-surface`; see §9. |
| 4 | ABCFavorit active references | 0 in code | ✅ | Unhooked. |
| 5 | ABCFavorit font files (licensed) | 10 files | Medium | Orphaned in public/fonts → remove. |
| 5 | Brand/reference images | 9 files | **Critical** | Tokio/Wellcove/Chad + 4 Anduril capabilities + Arsenal QR + demo SVG. |
| 5 | Orphaned images | 3 files | Low | product-ai, carousel-concept, mission-hero — 0 refs. |
| 5 | Favicon | 1 | **Critical** | Likely Korr mark. |
| 6 | Metadata (title/desc/OG/domain) | layout.js + 5 page metas | **Critical** | |
| 6 | package.json name | 1 (`studio-system-core`) | Medium | Stale template name. |
| 7 | Anduril / Arsenal-1 structure | 8 + 20 | **Critical / Decision** | Route, nav link, Capabilities, Explore, Hero defaults, copy. |
| — | Code comments (Korr/Anduril) | ~8 | Low | Logo, Hero, tokens, SiteNav, Header CSS. |

**Totals:** ~3 Critical clusters (Korr brand & metadata · insurance copy & partners ·
Anduril/Arsenal reference content + their images/favicon), Medium (orphaned licensed fonts,
ContactModal color, package name), Low (README log + CSS comments + 3 orphan images).

---

## 9. AMBIGUOUS — needs your call

1. **`#20231f` legacy near-black in tokens.** The brief listed `#20231f` as a legacy color
   *and* said tokens.css is already Relai. It is **still live** at [tokens.css:22](src/styles/tokens.css#L22)
   (`--color-surface`) and hardcoded in [ContactModal.module.css:9](src/components/ContactModal/ContactModal.module.css#L9).
   → Is Relai deliberately keeping this near-black as its surface color (then only the
   ContactModal raw value needs tokenizing), or should the surface value itself change?

2. **"carrier" / "carriers."** Every current use is an **insurance carrier**
   ([page.js:27,56,75](src/app/page.js#L27), [product/page.js:64](src/app/product/page.js#L64),
   [Footer/index.jsx:33](src/components/Footer/index.jsx#L33)) — but "carrier" is also a core
   **freight-logistics** term. Rewrite the copy, or keep the word and re-point its meaning?

3. **The entire `/arsenal-1` route + `Capabilities` + Hero "reference" defaults.** Per the
   README these are intentional **Anduril** rebuilds kept for parity. Does Relai (a freight
   brand) keep an "Arsenal-1"-style facility page (renamed/re-themed), or is the whole route +
   its 4 defense "capability" images + the "Arsenal-1" nav link removed?

4. **`demo-illustration.svg` alt — "green and white."** Alt text references the old brand
   **green** ([book-a-demo/page.js:25](src/app/book-a-demo/page.js#L25)). Update alt only, or
   is the illustration itself off-brand and needs replacing?

5. **3 orphaned images + 10 orphaned fonts.** Safe to delete (zero references), but confirm
   you don't intend to wire any of them up before I (later) remove them.

6. **`studio-system-core` (package.json name).** Not "Korr," but a stale template name —
   rename to `relai` during the scrub, or leave it?

---

*Generated read-only. No source files were modified. Counts are case-insensitive over
`src/` (README mentions noted separately as project-log/Low).*
