// FluidHero content (sandbox) — consumed by app/sandbox/fluid-hero/page.js
// via <FluidHero content={fluidHero} />.
// Copy is derived from the LIVE home hero (content/home.js): the title/support
// are its title/text, the actions are its CTAs — rendered in the notch.
// (Eyebrow omitted — the header leads with the title.)

export const meta = {
  title: "Fluid Hero — Sandbox",
  description:
    "Card-in-a-frame feedback hero rebuilt on the Relai system — FluidCards radius family, live home-hero copy.",
};

export const fluidHero = {
  title: "Redefining Freight",
  support:
    "Relai is the first unified platform for port and freight logistics — connecting vessel, terminal, yard, and truck into a single, real-time system. Built for the modern supply chain, Relai turns the handoffs that slow freight down into one coordinated, intelligent flow.",
  // Temporary neutral placeholder — restore /exampleimages/portcontainers.jpg
  // (alt: "Stacked shipping containers at a port terminal") for the real image.
  media: {
    src: "/placeholders/fluid-hero.svg",
    alt: "Image placeholder",
  },
  // Same actions as the live home hero — rendered in the right-hand notch.
  actions: [
    { label: "See the Platform", href: "/product" },
    { label: "Book a demo", href: "/book-a-demo" },
  ],
};
