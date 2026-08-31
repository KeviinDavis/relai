// CompositeHero content (sandbox) — consumed by app/sandbox/composite-hero/page.js
// via <CompositeHero content={compositeHero} board={dashboard} />.
// Glass board over dusk harbor footage (anchored ships): the copy (tag/title/CTA) is
// the live home hero's; the board data comes verbatim from content/dashboard.js
// — this file only carries the scene and the copy column.

export const meta = {
  title: "Composite Hero, Sandbox",
  description:
    "Dusk harbor video hero with the frosted-glass ops board bleeding off the right, copy column locked left, one red beat in the console.",
};

export const compositeHero = {
  eyebrow: "[ FREIGHT ]",
  title: "Redefining Freight",
  cta: { label: "See the Platform", href: "/product" },

  // Contained scene panel — the live hero's clip; the poster is its frame 0,
  // shown instead of motion under prefers-reduced-motion.
  media: {
    src: "/exampleimages/example7.mp4",
    poster: "/exampleimages/composite-hero-poster.avif",
    alt: "Cargo ships anchored on calm water at dusk, framed by silhouetted branches.",
  },
};
