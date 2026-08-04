// Relai impact content (mission "in numbers") — consumed by
// app/sandbox/impact/page.js via <FluidCards scenarios={scenarios} cards={cards} />.
//
// Three mission stats from content/mission.js rendered as fluid hover-expand
// cards. The card "code" is the big stat value, the footer "label" is the
// stat's short title, and the body "text" is the full description.
//
// The intro thumb is a neutral gray placeholder — swap `scenarios.image.src`
// for real art later. (The stat cards carry no image.)

export const meta = {
  title: "Impact — Sandbox",
  description:
    "The mission in numbers — three figures that describe the problem Relai exists to fix.",
};

const placeholder = (alt) => ({ src: "/placeholders/impact-thumb.svg", alt });

// Intro row: big heading (left) + gray lead card with a small thumb (right).
export const scenarios = {
  heading: "The mission in numbers",
  description:
    "Every port, vessel, and terminal runs on its own factors. But three numbers describe the problem Relai exists to fix — and the scale it now moves at.",
  image: placeholder("Mission impact overview"),
};

// Fluid-width cards — the first sits pre-expanded at rest; hovering any other
// slides the wide column to it and fades its description in.
// (A fourth mission stat — "11% · Emissions cut at pilot terminals" — was
// dropped to land on three; add it back as a fourth entry to restore it.)
export const cards = [
  {
    code: "920+ hrs",
    label: "Idle per vessel, yearly",
    text: "The average container ship loses the equivalent of nearly 40 days a year waiting: at anchor, at berth, in the yard. Idle time is the supply chain's most expensive habit.",
  },
  {
    code: "68%",
    label: "Still on legacy systems",
    text: "More than two-thirds of global freight is coordinated on software written before the cloud. Relai is the layer that finally connects the gaps between them.",
  },
  {
    code: "2.4M+",
    label: "Container moves a year",
    text: "Relai coordinates over two million container handoffs annually across its launch network — every one tracked from ship to truck.",
  },
];
