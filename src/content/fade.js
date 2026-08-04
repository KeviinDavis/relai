// Scroll-driven theme fade content — consumed by app/sandbox/fade/page.js via
// <ScrollThemeFade sections={sections} />. Each entry is a full-viewport panel;
// `theme` ("light" | "dark") picks the palette the shared wrapper fades TO as
// that panel crosses the viewport center. `bg`/`fg` can override with literal
// colors per panel. Placeholder copy for now — the effect is what's on show,
// not the content.

export const meta = {
  title: "Theme Fade — Sandbox",
  description:
    "Scroll-driven theme fade — the page background and text invert as each section crosses the viewport center.",
};

export const sections = [
  {
    theme: "light",
    kicker: "Scroll to begin",
    heading: "The page reads the section you're looking at.",
    body: "One wrapper owns the background and text color. Every section is transparent — nothing here paints its own backdrop.",
  },
  {
    theme: "dark",
    kicker: "Crossing the center line",
    heading: "As a section passes the middle, the whole stage fades to its theme.",
    body: "A ScrollTrigger fires at the viewport-center line, tweening background and color together over a short ease.",
  },
  {
    theme: "light",
    kicker: "Works both ways",
    heading: "Scroll back up and the fade reverses, section by section.",
    body: "onEnter and onEnterBack share the same handler, so the transition is symmetric in either direction.",
  },
  {
    theme: "dark",
    kicker: "Chrome inverts for free",
    heading: "The kicker, arrow and text are all drawn in currentColor.",
    body: "Because everything inherits the wrapper's color, it flips with the fade automatically — no per-element theming.",
  },
];
