// BoardHero content (sandbox) — Structure A homepage hero, consumed by
// app/sandbox/board-hero/page.js via <BoardHero content={boardHero} board={dashboard} />.
// Headline-led: copy row up top, the full ops board (content/dashboard.js)
// below. The reference's floating nav pill is the site Header — not repeated
// here. textMobile is the reference's shortened mobile subhead, not new copy.

export const meta = {
  title: "Board Hero — Sandbox",
  description:
    "Structure A homepage hero: headline-led copy over the full Relai ops board, bleeding off the fold on desktop, fit-to-width with a carrier trust strip on mobile.",
};

export const boardHero = {
  title: "Redefining Freight",
  text: "Relai is the first unified platform for port and freight logistics — connecting vessel, terminal, yard, and truck into a single, real-time system.",
  textMobile:
    "The first unified platform for port and freight logistics — vessel, terminal, yard, and truck in one real-time system.",
  actions: [
    { label: "See the Platform", href: "/product", variant: "primary" },
    { label: "Book a demo", href: "/book-a-demo", variant: "ghost" },
  ],
  // Mobile-only strip anchored under the board so the lower half isn't empty.
  trust: {
    eyebrow: "Trusted across the port",
    logos: ["MAERSK", "MSC", "ONE", "CMA CGM", "HAPAG"],
  },
};
