// Relai platform content — a "unified platform" pitch rendered through the same
// FluidCards section as content/impact.js, but in the "feature" card anatomy:
// a numbered index + title + body, instead of a big stat "code".
//
// Consumed by app/sandbox/platform/page.js via
// <FluidCards scenarios={scenarios} cards={cards} tone="dark" layout="grid" introPosition="top" />.
//
// Because the cards carry `title` (not `code`) and scenarios carries no `image`,
// FluidCards renders the feature anatomy + the eyebrow/title lead card + the
// decorative menu chip. The existing impact instance is unaffected.

export const meta = {
  title: "Platform — Sandbox",
  description:
    "The unified platform for port and freight logistics — one coordinated flow from open water to the final mile.",
};

// Intro row: big heading (left) + lead panel (right). Eyebrow + bold title +
// dim subtext; no `image`, so the panel shows a decorative menu chip instead
// of a thumb.
export const scenarios = {
  heading:
    "Systems that used to run apart, now one coordinated flow, from open water to the final mile.",
  eyebrow: "The platform",
  title: "The unified platform for port and freight logistics.",
  description: "Vessel, terminal, yard, and truck in one real-time system.",
};

// Feature cards — identical anatomy to content/impact.js (big `code` + body
// `text` + footer `label`), just new copy. The feature name sits in the big
// `code` slot the same way a stat value does in impact.
export const cards = [
  {
    code: "Vessel Intelligence",
    text: "Live tracking and predictive ETAs, from open water to the berth.",
    label: "Know where the ship is",
  },
  {
    code: "Terminal Orchestration",
    text: "Coordinate berth, yard, and resources against real arrival times.",
    label: "Run on live data",
  },
  {
    code: "Drayage & Handoff",
    text: "Sync trucks and gates so the box moves the moment it lands.",
    label: "Close the last mile",
  },
];
