// ProductHero content (sandbox) — Structure D homepage hero, consumed by
// app/sandbox/product-hero/page.js via
// <ProductHero content={productHero} board={dashboard} />.
// Product-dominant: compact centered copy, then the ops board
// (content/dashboard.js) fills the fold. The subhead is deliberately the
// short one-liner (Structure A carries the long positioning sentence); the
// reference's floating nav pill is the site Header — not repeated here.

export const meta = {
  title: "Product Hero — Sandbox",
  description:
    "Structure D homepage hero: compact centered copy over the full Relai ops board — the board dominates the viewport and bleeds off the fold (desktop) or off bottom + right with nav and feed leading (mobile).",
};

export const productHero = {
  title: "Redefining Freight",
  text: "One coordinated, real-time system across vessel, terminal, yard, and truck.",
  actions: [
    { label: "See the Platform", href: "/product", variant: "primary" },
    { label: "Book a demo", href: "/book-a-demo", variant: "ghost" },
  ],
};
