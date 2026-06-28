// Home page content. Data only — app/page.js wires these into components.
// Consumers: app/page.js

// Component: Hero
export const hero = {
  title: "Redefining Freight",
  tag: "[ FREIGHT ]",
  text:
    "Relai is the first unified platform for port and freight logistics — connecting vessel, terminal, yard, and truck into a single, real-time system. Built for the modern supply chain, Relai turns the handoffs that slow freight down into one coordinated, intelligent flow.",
  actions: [
    { label: "See the Platform", href: "/product" },
    { label: "Book a demo", href: "/book-a-demo" },
  ],
  media: {
    type: "image",
    src: "/images/media-hero.svg",
    alt: "Placeholder for the Relai hero background video — a port terminal at dusk.",
  },
};

// Component: Intro
export const intro = {
  id: "why-relai",
  excerpt:
    "Freight has gone global. The software didn't keep up. Relai replaces the disconnected, decades-old systems that move the world's cargo with a single platform built for speed, visibility, and coordination.",
  capsule: "Why Relai",
  body:
    "Relai began with a simple observation: the supply chain doesn't break in transit — it breaks at the handoffs. Between ship and port. Port and yard. Yard and truck. Each seam runs on its own aging system, and freight loses time, money, and fuel in the gaps. Relai closes them — coordinating every handoff in one platform built for how freight actually moves.",
  links: [
    { label: "Why Relai", href: "/#why-relai" },
    { label: "Platform", href: "/product" },
  ],
};

// Component: Capabilities
// Real Relai capabilities, paired with the four logistics SVGs added for the
// rebrand. (Replaces the placeholder defense defaults previously baked into the
// component.)
export const capabilities = {
  heading: "Capabilities",
  items: [
    {
      title: "Vessel Intelligence",
      description:
        "Live tracking and predictive ETAs across every vessel in your network — so the dock is ready before the ship is.",
      image: {
        src: "/images/capability-vessel-intelligence.svg",
        alt: "Diagram of live vessel tracking and predictive ETAs across a port network.",
      },
    },
    {
      title: "Terminal Orchestration",
      description:
        "Berth, crane, and yard coordinated from one view, sequenced around real arrival times instead of guesswork.",
      image: {
        src: "/images/capability-terminal-orchestration.svg",
        alt: "Diagram of berth, crane, and yard sequenced from a single terminal view.",
      },
    },
    {
      title: "Drayage & Handoff",
      description:
        "The port-to-truck seam, closed — every container with a known location, a next move, and a driver ready for it.",
      image: {
        src: "/images/capability-drayage-handoff.svg",
        alt: "Diagram of the port-to-truck handoff with every container tracked to a driver.",
      },
    },
    {
      title: "Emissions & Idle",
      description:
        "Fuel burn and emissions measured across every leg, turning coordination gains into a cut you can prove.",
      image: {
        src: "/images/capability-emissions-idle.svg",
        alt: "Diagram of fuel burn and emissions measured across every leg of the journey.",
      },
    },
  ],
};

// Component: Testimonials
export const testimonials = {
  items: [
    {
      name: "Marcus Vance — VP of Terminal Operations, Pacific Gateway Lines",
      image: "/images/testimonial-portrait.svg",
      alt: "Portrait of Marcus Vance, VP of Terminal Operations at Pacific Gateway Lines.",
      quote:
        "We'd spent years stitching together systems that were never meant to talk to each other. Relai is the first platform that treats the whole journey as one operation. We can see a vessel three days out and have the yard and drivers sequenced before it berths. The idle time we've cut goes straight to the bottom line — and to our emissions targets.",
    },
  ],
};

// Component: Shortcuts
export const shortcuts = {
  capsule: "Learn More",
  text:
    "Relai is a venture-backed logistics-tech company, supported by leading climate-tech and supply-chain investors. Founded by terminal operators and engineers who watched global trade run on software older than the internet, Relai was built to be the coordination layer the modern supply chain never had.",
  cards: [
    {
      image: "/images/home-about.webp",
      alt: "A team reviewing operations together at a long table.",
      title: "About us",
      text:
        "Trillions of dollars in freight still move on systems built before the cloud. See why we're rebuilding the layer that coordinates global trade.",
      href: "/about",
    },
    {
      image: "/images/home-mission.webp",
      alt: "An illustration of a connected global logistics network.",
      title: "Mission",
      text: "Moving the world's freight with less waste, less idle, and less carbon.",
      href: "/mission",
    },
  ],
};
