// CompositeHero content (sandbox) — consumed by app/sandbox/composite-hero/page.js
// via <CompositeHero content={compositeHero} board={dashboard} />.
// Glass board over blue-hour footage: the copy (tag/title/CTA/clip) is the
// live home hero's, same as stage-hero.js; the board data comes verbatim from
// content/dashboard.js — this file only carries the scene and the copy column.

export const meta = {
  title: "Composite Hero — Sandbox",
  description:
    "Blue-hour video hero with the frosted-glass ops board bleeding off the right — copy column locked left, one red beat in the console.",
};

export const compositeHero = {
  eyebrow: "[ FREIGHT ]",
  title: "Redefining Freight",
  cta: { label: "See the Platform", href: "/product" },

  // Contained scene panel — the live hero's clip; the poster is its frame 0,
  // shown instead of motion under prefers-reduced-motion.
  media: {
    src: "/exampleimages/about.mp4",
    poster: "/exampleimages/composite-hero-poster.avif",
    alt: "Placeholder for the Relai hero background video — a port terminal at dusk.",
  },
};
