// Global content shared across the whole site (chrome + metadata).
// Data only — no JSX. Components import these and render them.
//
// Consumers:
//   • app/layout.js        → meta   (Next.js metadata export)
//   • SiteHeader → Header  → nav
//   • SiteHeader → SiteNav → nav, social
//   • Footer               → footer, social

// Component: app/layout.js (Next metadata)
export const meta = {
  // metadataBase intentionally omitted until the Relai domain is live.
  title: {
    default: "Relai, Redefining Freight",
    template: "%s, Relai",
  },
  description:
    "Relai is the first unified platform for port and freight logistics, connecting vessel, terminal, yard, and truck into a single, real-time system.",
  openGraph: {
    title: "Relai, Redefining Freight",
    description:
      "A modern, cloud-native freight-logistics coordination platform built for speed, visibility, and coordination.",
    type: "website",
    locale: "en_US",
  },
  // Favicons. The .ico is served + linked by the App Router file convention
  // (src/app/favicon.ico); these add the SVG (modern), a 32px PNG fallback,
  // and the home-screen apple-touch icon. Files live in /public.
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

// Component: Header, SiteNav (shared primary navigation)
// One canonical set drives both the solid Header and the over-hero SiteNav, so
// the two bars can never drift. "Book a Demo" is the CTA — the right-side
// filled button on both bars. "Contact" opens the modal.
export const nav = {
  brand: { href: "/", label: "Relai", ariaLabel: "Relai home" },
  primary: [
    { label: "Product", href: "/product" },
    { label: "Mission", href: "/mission" },
    { label: "About", href: "/about" },
    { label: "News", href: "/news" },
  ],
  cta: { label: "Book a Demo", href: "/book-a-demo" },
  contact: { label: "Contact", drawerLabel: "Contact Relai" },
  home: { label: "Home", href: "/" },
};

// Component: SiteNav (drawer), Footer (social row)
// Empty until Relai has a live social profile. The footer/drawer social rows
// render nothing when this is empty — no placeholder or dead link is left behind.
export const social = [];

// Component: Footer
export const footer = {
  eyebrow: "Contact",
  heading: "The future of freight",
  lead: "Relai", // rendered <strong> ahead of the body
  body:
    "is a cloud-native coordination platform built for terminals, carriers, and freight operators. With a unified, real-time interface and tools that adapt to any network, Relai gives the supply chain the visibility and control to move faster and cleaner.",
  card: {
    href: "/book-a-demo",
    image: {
      src: "/RelaiImages/footer.jpg",
      alt: "A container terminal at the waterfront.",
    },
    eyebrow: "Get in touch",
    text:
      "Ready to replace the disconnected systems slowing your freight with one platform built to coordinate it all? Schedule a demo today.",
  },
  // Mirrors the header IA (Product · Mission · About · News), plus footer-only
  // utility links (Home, FAQ, Contact, Careers). Careers points to /mission,
  // where the open roles actually live.
  links: [
    { label: "Home", href: "/" },
    { label: "Product", href: "/product" },
    { label: "FAQ", href: "/product#faq" },
    { label: "Mission", href: "/mission" },
    { label: "About", href: "/about" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/book-a-demo" },
    { label: "Careers", href: "/mission" },
  ],
  copyright: "© 2026 Relai",
};
