// About page content. Data only — app/about/page.js wires these into components.
// Consumers: app/about/page.js

// Component: app/about/page.js (Next metadata)
export const meta = {
  title: "About",
  description:
    "Relai is building the coordination layer the supply chain never had — closing the gaps between vessel, terminal, yard, and carrier.",
};

// Component: Hero
export const hero = {
  eyebrow: "About",
  title: "Building the platform",
  media: {
    type: "video",
    src: "/exampleimages/about.mp4",
    alt: "A container terminal seen from above.",
  },
};

// Component: TextSection
export const intro = {
  paragraphs: [
    "Until now, logistics software has only ever managed one piece of the journey. Coordinating across the rest — vessel, terminal, yard, carrier — has been left to email, phone calls, and spreadsheets. Relai is the first platform that closes those gaps instead of adding to them.",
    "Relai was built by people who ran terminal operations and lived the cost of broken handoffs firsthand. A modern supply chain needs a system that speaks to every part of the journey while serving the people at each step. That's how Relai was born.",
  ],
};

// Component: SplitSection
export const whyRelai = {
  eyebrow: "Why Relai",
  title: "Bridging the supply chain and modern technology",
  paragraphs: [
    "In 2022, we founded Relai near the Port of Long Beach with a clear mission: to close the gap between how global freight moves and the technology meant to coordinate it.",
    "From the outset, the goal was to build the coordination layer the supply chain never had. As cloud platforms reshape every industry, logistics has a rare opportunity to modernize — cutting cost, idle, and emissions at the same time. With a cloud-native platform at its core, a freight network becomes faster, more adaptable, and more efficient.",
    "We're seeing Relai's impact across 14 live terminals today.",
  ],
  media: {
    src: "/images/image-about-why.svg",
    alt: "Operations team coordinating freight at a terminal.",
  },
};

// Component: Leadership
export const leadership = {
  title: "Leadership",
  people: [
    {
      name: "Elena Marchetti",
      role: "Co-founder & CEO",
      image: "/images/leadership-elena-marchetti.svg",
    },
    {
      name: "David Okafor",
      role: "Co-founder & CTO",
      image: "/images/leadership-david-okafor.svg",
    },
    {
      name: "Sofia Reyes",
      role: "Head of Terminal Operations",
      image: "/images/leadership-sofia-reyes.svg",
    },
    {
      name: "Daniel Cho",
      role: "Head of Product",
      image: "/images/leadership-daniel-cho.svg",
    },
  ],
};

// Component: SplitSection
export const mission = {
  eyebrow: "Mission",
  title: "A total transformation of how freight moves",
  paragraphs: [
    "Relai's mission is to give logistics operators technology they can use to thrive in a volatile, fast-moving world. Our vision is nothing less than a total transformation of freight — redefining it as a coordinated, transparent, low-carbon system that moves at the speed of modern trade.",
  ],
  media: {
    src: "/images/image-about-mission.svg",
    alt: "A connected view of a freight network.",
  },
  actions: [{ label: "Read our mission", href: "/mission", variant: "primary" }],
  reverse: true,
};
