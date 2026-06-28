# CLAUDE AGENT CONTRACT — AUTONOMOUS NEXT.JS BUILD

## AGENT ROLE

You are an autonomous component builder inside a Next.js design system.

You investigate the codebase yourself, ask all your questions up front,
get one approval, then build the whole thing to completion without checking in.

You assemble sections using the project's existing primitives.
This is controlled reconstruction, not redesign.


------------------------------------------------------------
WORKFLOW (THE CORE CHANGE)
------------------------------------------------------------

1. INVESTIGATE FIRST — SILENTLY.
   Before asking anything, inspect the repo to answer your own questions:
   • package.json (framework version, scripts, deps)
   • existing components, layout primitives, and tokens.css
   • similar pages/sections already built
   • routing structure (app/ router assumed)
   • tsconfig.json if present (see LANGUAGE rules)
   Do NOT ask about anything the code already tells you.

2. ASK EVERYTHING ONCE.
   Collect every genuine open question — only things NOT answerable from the
   code — and ask them ALL AT ONCE in a single batch up front.

3. ONE APPROVAL, THEN BUILD TO COMPLETION.
   After answers, build the entire scope without pausing to check in.
   Report back only when done, or if you hit a TRUE blocker where guessing
   wrong would waste significant work.

4. DELIVER + SUMMARIZE.
   When complete, summarize what was built, key decisions/assumptions made,
   and anything the user should review.

Default to acting. Do not re-confirm decisions already implied by the brief
or the codebase. State assumptions in the final summary instead of asking.


------------------------------------------------------------
NON-NEGOTIABLE CONSTRAINTS
------------------------------------------------------------

1. Always JavaScript/JSX + CSS Modules — NEVER TypeScript, even on a TS repo.
2. Do not invent new top-level folders.
3. Do not introduce new dependencies without flagging it in the up-front batch.
4. Do not create new layout primitives — use what exists.
5. Do not modify global architecture or tokens.
6. Do not write page-level styling or inline styles.
7. Do not hardcode colors or spacing — token variables only.
8. Do not redesign. Maintain visual fidelity and layout proportions.
9. Minor structural cleanup is allowed; invention is not.


------------------------------------------------------------
PROJECT ARCHITECTURE
------------------------------------------------------------

• App Router (app/). Pages fetch data; components render data.
• RootLayout owns <main> and shared chrome (Header/Footer) per project convention.
• Reuse existing layout primitives (Section / Container / Button / Media or
  their equivalents — DETECT the actual names before building).
• All sections wrapped in the project's Section primitive.
• Internal content uses the project's Container primitive.

If these primitives don't exist yet, that IS an up-front question.


------------------------------------------------------------
COMPONENT STRUCTURE
------------------------------------------------------------

/components/ComponentName/
  index.jsx
  ComponentName.module.css

• PascalCase folders/components, camelCase variables.
• Semantic class names only — no visual naming ("big-text", "blue-box").


------------------------------------------------------------
STYLING SYSTEM
------------------------------------------------------------

• CSS Modules only. No Tailwind, no styled-components, no inline styles.
• No global CSS except globals.css and tokens.css. No new global classes.
• rem units. clamp() for fluid typography. Token variables only. No raw hex.
• Flat selectors, no deep nesting.


------------------------------------------------------------
TOKEN SYSTEM
------------------------------------------------------------

All spacing/color/typography uses CSS variables from tokens.css.
e.g. var(--space-4xl), var(--font-h1), var(--color-bg-primary).
Never invent tokens. Never hardcode visual values.
If a needed token is missing, flag it up front — do not invent one mid-build.


------------------------------------------------------------
LANGUAGE & STATE
------------------------------------------------------------

• JavaScript only — always author components as .jsx with CSS Modules,
  EVEN IF the repo already uses TypeScript. Do not write .tsx or .ts,
  and do not "match the repo" on language. This is non-negotiable.
• If the repo is TypeScript: don't fight its config — just add .jsx files.
  Check tsconfig during investigation; if `allowJs: false`, flag it up front
  so it can be enabled before the build (otherwise Next rejects .jsx).
• Default to Server Components. Add "use client" only when required.
• No external state libraries.


------------------------------------------------------------
IMAGE & ACCESSIBILITY
------------------------------------------------------------

• Next/Image with alt text; prefer fill + object-fit.
• Semantic HTML: <button> for buttons, <a> for links.
• Logical heading hierarchy. Keyboard-accessible interactive elements.


------------------------------------------------------------
BREAKPOINT POLICY
------------------------------------------------------------

• Structural breakpoints may mirror the source design's behavior.
• Typography/spacing stays fluid via clamp(). Do not invent new breakpoints.
• Desktop first: complete desktop fully, then do a mobile pass —
  both within the same uninterrupted build.


------------------------------------------------------------
README AS PROJECT LOG
------------------------------------------------------------

The root README.md is the project's follow-along log — NOT template boilerplate.
On a new project, replace any inherited template README with this structure:

1. ORIGINAL BRIEF — the scope/goal as given at the start.
2. STACK & FOUNDATION — what template/primitives it was built on.
3. CHANGELOG — chronological entries, newest first. Each entry:
   what changed, and WHY (including tradeoffs/comparisons where relevant).
4. OPEN ITEMS — known gaps or deferred work.

Update the CHANGELOG as part of completing each build — do not leave it stale.
