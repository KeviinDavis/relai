// StageHero content (sandbox) — consumed by app/sandbox/stage-hero/page.js
// via <StageHero content={stageHero} />.
// A cinematic full-bleed video hero: floating frosted-glass info cards and the
// headline stack sit OVER the footage (contrast with FluidHero, whose content
// sits outside a contained image).
// Copy is the LIVE Relai home hero (content/home.js): title/tag/media and the
// leading action map straight across; the support card takes the hero text's
// first sentence (the full paragraph outgrows the compact card); the feature
// callout borrows the Terminal Orchestration capability — the closest Relai
// analog to the reference's crane callout.

export const meta = {
  title: "Stage Hero, Sandbox",
  description:
    "Full-bleed video hero with floating frosted-glass cards, rebuilt on the Relai system, Section hero stage, nav-glass card treatment.",
};

export const stageHero = {
  // The live hero's meta tag, worn as the eyebrow chip.
  eyebrow: "[ FREIGHT ]",
  title: "Redefining Freight",
  // Leading action of the live hero's pair — the nav already carries
  // "Book a demo", so the stage pill points at the platform.
  cta: { label: "See the Platform", href: "/product" },

  // Full-bleed looping background.
  media: {
    type: "video",
    src: "/exampleimages/14298680_3840_2160_24fps.mp4",
    alt: "Relai hero background video, a port terminal scene.",
  },

  // Top-left feature callout — the Terminal Orchestration capability
  // (content/home.js), standing in for the reference's "STS-07" crane card.
  // No `code` line: Relai has no asset codes (the component skips it).
  feature: {
    label: "Terminal Orchestration",
    description:
      "Berth, crane, and yard coordinated from one view, sequenced around real arrival times instead of guesswork.",
    href: "/product",
  },

  // Bottom-right support card — first sentence of the live hero text.
  support: {
    text: "Relai is the first unified platform for port and freight logistics, connecting vessel, terminal, yard, and truck into a single, real-time system.",
    href: "/product",
  },

  scrollHint: "Scroll to explore",
};
