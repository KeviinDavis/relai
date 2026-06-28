import Hero from "@/components/Hero";
import TextSection from "@/components/TextSection";
import Stepper from "@/components/Stepper";
import SplitSection from "@/components/SplitSection";
import Faq from "@/components/Faq";

export const metadata = {
  title: "Product",
  description:
    "Vessel tracking, terminal operations, drayage, and emissions — unified into one real-time system built for global logistics.",
};

export default function ProductPage() {
  return (
    <>
      <Hero
        title="Platform"
        tag="[ PLATFORM ]"
        text="Vessel tracking, terminal operations, drayage, and emissions — unified into one real-time system built for global logistics."
        actions={[{ label: "Book a demo", href: "/book-a-demo", variant: "solid" }]}
        media={{
          type: "image",
          src: "/images/product-architecture.webp",
          alt: "Relai platform architecture spanning vessel, terminal, yard, and road.",
        }}
        size="tall"
      />

      <TextSection
        eyebrow="Platform"
        paragraphs={[
          "Relai was built from the ground up as a cloud-native coordination platform for global logistics. It unifies vessel tracking, terminal operations, drayage, and emissions into one real-time system — giving operators the visibility, speed, and control the modern supply chain demands.",
        ]}
      />

      <Stepper
        capsule="How Relai works"
        text="From sea to road, Relai coordinates every leg of the journey — then measures what it saves."
        steps={[
          {
            capsule: "Vessel Intelligence",
            image: "/images/step-concept.webp",
            alt: "Live vessel tracking and predictive ETAs across the network.",
            text: "It starts at sea. Relai ingests live AIS position, weather, and port-congestion data for every vessel inbound to your network, then models arrival windows continuously as conditions change. Instead of a static ETA that's wrong by the time it matters, your team works from a prediction that updates by the hour — and the rest of the operation plans against it.",
          },
          {
            capsule: "Terminal Orchestration",
            image: "/images/step-adaptability.webp",
            alt: "Berth, crane, and yard sequenced against the live ETA.",
            text: "As the vessel approaches, Relai sequences the terminal around it. Berth windows, crane assignments, and yard slots resolve against the live ETA, so labor and equipment are staged for the ship that's actually arriving — not the schedule from a week ago. When an arrival shifts, the plan recalculates and flags the downstream moves that need attention.",
          },
          {
            capsule: "Drayage & Handoff",
            image: "/images/step-build.webp",
            alt: "Terminal, yard, and carrier connected on one system at the handoff.",
            text: "The container's most fragile moment is the handoff to the road. Relai connects terminal, yard, and carrier on one system, so the moment a box is discharged it has a known location, an appointment, and a driver matched to it. No phone tag, no containers sitting idle waiting to be claimed — the relay continues without a gap.",
          },
          {
            capsule: "Emissions & Idle",
            image: "/images/step-product.webp",
            alt: "Idle hours, fuel burn, and emissions measured across every leg.",
            text: "Across every leg, Relai measures what the old systems couldn't see: idle hours, fuel burn, and emissions per move. Every coordination gain — a ship that didn't wait at anchor, a truck that didn't queue at the gate — becomes a quantified reduction in cost and carbon, reported in the same view your team already works from.",
          },
        ]}
      />

      <SplitSection
        eyebrow="Feature"
        title="Designed to deploy fast"
        paragraphs={[
          "Relai handles the complexity — so your team doesn't have to. From terminal integrations to carrier APIs, every connection is configurable out of the box. No custom builds, no patchwork. One flexible platform that fits your network from day one.",
        ]}
        media={{
          src: "/images/product-feature-1.webp",
          alt: "Configurable integrations across terminal and carrier systems.",
        }}
        aspectRatio="4/3"
      />

      <TextSection
        tone="dark"
        lead="One of the largest terminal operators on the West Coast went live on Relai in under four months — across a single port and one carrier network."
        paragraphs={[
          "Your team stays lean. Your data stays clean. Your freight keeps moving.",
        ]}
      />

      <SplitSection
        eyebrow="Feature"
        title="Real-time by design"
        paragraphs={[
          "Relai isn't just connected — it's live. The system of record is the data in your warehouse: no sync jobs, no lag, no ambiguity. Just real-time visibility ready for planning, reporting, and action.",
          "It fits into your existing stack, so you can finally stop working around your core systems.",
        ]}
        media={{
          src: "/images/product-feature-3.webp",
          alt: "Real-time network visibility ready for planning and reporting.",
        }}
        aspectRatio="4/3"
        reverse
      />

      <Faq
        eyebrow="FAQ"
        title="Frequently asked questions"
        text="Here are answers to a few key questions. For anything more specific, we're happy to dig in on a call."
        items={FAQ_ITEMS}
      />
    </>
  );
}

const FAQ_ITEMS = [
  {
    question: "What is Relai's current scale, and what's available?",
    area: "Platform",
    answer: [
      "Relai is live in production, coordinating freight across 14 terminals and 200,000+ container moves per month with our launch partners. We're on track to support 1 million monthly moves by the end of 2026.",
      "Today, Relai powers live vessel tracking, terminal orchestration, and drayage coordination, with emissions analytics rolling out across the platform.",
    ],
  },
  {
    question: "Where does AI fit within Relai?",
    area: "AI",
    answer: [
      "We're bullish on what machine intelligence can do for freight, especially in prediction. Relai uses AI for ETA forecasting, congestion modeling, and decision support — not to remove people from the loop.",
      "It's a pragmatic approach that helps operators move fast while staying in control.",
    ],
  },
  {
    question: "Is Relai a managed service?",
    area: "Operations",
    answer: [
      "Typically, yes. Relai is offered as a fully managed, cloud-native service with enterprise-grade security. For operators who prefer more control, we support hybrid deployments in customer-owned cloud environments.",
    ],
  },
  {
    question: "How is Relai different?",
    area: "Architecture",
    answer: [
      "Most logistics software manages one leg of the journey — the terminal, the fleet, the booking. Relai is the only platform built to coordinate the handoffs between them. Instead of forcing your network onto a rigid data model, Relai adapts to how your freight actually moves.",
    ],
  },
  {
    question: "How long does it take to get started?",
    area: "Onboarding",
    answer: [
      "Onboarding typically takes 3–4 months, depending on network complexity and integrations. We work closely with your team for a smooth rollout. Starting with one corridor or terminal and expanding from there is a proven path to success with Relai.",
    ],
  },
  {
    question: "How does Relai handle complexity?",
    area: "Development",
    answer: [
      "Relai uses a flexible, rules-based configuration model powered by your live network data. You define the logic for routing, handoffs, and exceptions, then evolve it as your operation grows.",
    ],
  },
  {
    question: "What are Relai's guiding design principles?",
    area: "Configuration",
    answer: [
      "Coordination-first: built to manage the seams between systems, not replace the ones that work.",
      "Real-time by default: the live state of your network is the source of truth.",
      "Built for any network: the building blocks to model any port, fleet, or corridor.",
      "Always improving: continuous platform updates that integrate seamlessly.",
    ],
  },
  {
    question: "What systems does Relai integrate with?",
    area: "Integrations",
    answer: [
      "Relai connects to terminal operating systems, AIS vessel feeds, carrier and TMS platforms, and telematics through standards-based APIs. Most connections are configured without code; for complex logic, Relai supports custom rules and workflows with full change management.",
    ],
  },
  {
    question: "What's the first step?",
    area: "Implementation",
    answer: [
      "It starts with a conversation. We'll map your current systems, corridors, and goals, and show you where Relai can cut idle time and emissions. From there, we scope a phased rollout that fits your priorities.",
    ],
  },
];
