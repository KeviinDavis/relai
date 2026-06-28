import Hero from "@/components/Hero";
import TextSection from "@/components/TextSection";
import SplitSection from "@/components/SplitSection";
import Faq from "@/components/Faq";

export const metadata = {
  title: "Product",
  description:
    "Korr is a powerful, cloud-native core insurance solution—built for scalability, reliability, flexibility, and AI integration.",
};

export default function ProductPage() {
  return (
    <>
      <Hero
        eyebrow="Platform"
        title="Finally, a core system focused on supporting your business"
        actions={[{ label: "Book a demo", href: "/book-a-demo", variant: "solid" }]}
        media={{
          type: "image",
          src: "/images/product-architecture.webp",
          alt: "Architecture.",
        }}
        size="tall"
      />

      <TextSection
        eyebrow="Platform"
        paragraphs={[
          "Korr was built from the ground up as a powerful, cloud-native core insurance solution. Its intuitive design simplifies complex processes, delivering unmatched scalability, reliability, and flexibility. With built-in support for AI integration, Korr empowers modern insurers to work smarter, accelerate innovation, and confidently embrace the future.",
        ]}
      />

      <SplitSection
        eyebrow="Why Korr"
        title="Built for intelligence"
        paragraphs={[
          "Insurance runs on rules, workflows, and deep historical context—yet not a single system of record was built to support AI. Korr changes that.",
          "By unifying policy, claims, and billing into a single, modern platform, Korr becomes the foundation for introducing AI directly into your system of record. From ingesting decades of data to powering smarter workflows, Korr gives your team the structure and flexibility to unlock AI where it matters most.",
        ]}
        media={{
          src: "/images/product-feature-1.webp",
          alt: "AI is essential technology.",
        }}
        aspectRatio="4/3"
      />

      <SplitSection
        eyebrow="Feature"
        title="Designed to launch fast"
        paragraphs={[
          "Korr handles the complexity—so you don’t have to. From rating logic to historical data, every piece is configurable out of the box. No custom builds. No patchwork fixes. Just one flexible platform that supports any product, any policy structure, from day one.",
        ]}
        media={{
          src: "/images/product-feature-2.webp",
          alt: "Configurable platform.",
        }}
        aspectRatio="4/3"
        reverse
      />

      <TextSection
        tone="dark"
        lead="One of the largest carriers in the US went live on Korr in just six months — through their TPA and with one line of business."
        paragraphs={[
          "Your team stays lean. Your system stays clean. Your business moves fast.",
        ]}
      />

      <SplitSection
        eyebrow="Feature"
        title="Smarter tech, tailored for you"
        paragraphs={[
          "Korr isn’t just fast—it’s clean. The system of record is the version in your data warehouse. No sync jobs, no lag, no ambiguity—just real-time data that’s ready for analytics, reporting, and action.",
          "It fits seamlessly into your enterprise stack, so you can move faster, stay accurate, and finally stop working around your core systems.",
        ]}
        media={{
          src: "/images/product-feature-3.webp",
          alt: "Real-time data platform.",
        }}
        aspectRatio="4/3"
      />

      <Faq
        eyebrow="FAQ"
        title="Frequently asked questions"
        text="Here are answers to a few key questions. For more in-depth or specific inquiries, we’re happy to discuss them in a meeting."
        items={FAQ_ITEMS}
      />
    </>
  );
}

const FAQ_ITEMS = [
  {
    question:
      "What is Korr’s current production scale and what components are available?",
    area: "Platform",
    answer: [
      "Korr is live in production, actively managing claims across 240,000+ policies for two clients, in partnership with our design partner Wellcove. We’re on track to support 500,000 policies by the end of 2025.",
      "Today, Korr powers end-to-end claims and intake workflows. Policy administration and billing components are actively being rolled out, expanding our platform into a full-service core system designed for modern insurance operations.",
    ],
  },
  {
    question: "Where does AI fit within the Korr platform?",
    area: "AI",
    answer: [
      "We’re bullish on AI’s potential to transform the insurance industry — especially as enterprises modernize core business processes and the technology behind them. With Korr and AI, digitization efforts that once took months can now happen in days.",
      "Today, our use of AI focuses on automation and decision support — not deterministic outcomes. It’s a pragmatic approach that helps carriers move fast while staying in control.",
    ],
  },
  {
    question: "Is Korr a managed service?",
    area: "Operations",
    answer: [
      "Typically, yes. Korr is offered as a fully managed service, and we carry enterprise-grade cyber risk insurance. For customers who prefer more control, we also support hybrid deployments in customer-owned AWS environments.",
      "Our hosting costs are the lowest in the industry—by design. Contact us to learn more.",
    ],
  },
  {
    question: "How is Korr different?",
    area: "Architecture",
    answer: [
      "We took a radical approach: instead of a traditional SQL backend, Korr uses Amazon S3 for scalable, flexible data storage. This architecture lets us move faster—pulling data from legacy mainframes with ease and supporting a wide range of insurance lines without rigid data constraints. It’s how Korr adapts to your business, not the other way around.",
    ],
  },
  {
    question: "How long does it take to convert from a legacy system to Korr?",
    area: "Conversion",
    answer: [
      "Transitioning from your legacy system to Korr typically takes just 3–6 months, depending on system complexity and your business needs. We partner closely with your team to ensure a smooth, efficient migration. Starting small and gradually expanding your product offerings is a proven path to success with Korr.",
    ],
  },
  {
    question: "How does Korr handle complexity?",
    area: "Development",
    answer: [
      "Korr uses a flexible, rules-based configuration model powered by data—and accelerated with generative AI. You define the logic, tailor it to your needs, and evolve it as your business grows.",
    ],
  },
  {
    question: "What are Korr’s guiding design principles?",
    area: "Configuration",
    answer: [
      "Configuration-First Approach: Korr is designed to prioritize configuration, offering powerful flexibility within the existing codebase—meeting your business needs without altering source code.",
      "Adaptability at Speed: Korr empowers businesses to evolve rapidly by focusing on configuration, eliminating delays so your operations keep pace with market demands.",
      "Built-In Versatility: Korr provides all the essential building blocks for any insurance project, maintained and enhanced by Korr, so your system stays robust and scalable.",
      "Constant Innovation: Korr continuously enhances its platform, delivering new features that integrate seamlessly—keeping your operations ahead of the curve.",
    ],
  },
  {
    question: "Which programming languages does Korr support?",
    area: "Development",
    answer: [
      "Korr is a no-code platform with developer power when you need it. Most configuration is done without code, but for complex rules and workflows, Korr supports JavaScript, Python, and YAML-based customization. With GitHub-integrated tooling and robust change management, Korr keeps your team agile, collaborative, and secure.",
    ],
  },
  {
    question: "What’s the first step?",
    area: "Implementation",
    answer: [
      "It starts with a conversation. We’ll learn about your current systems, goals, and challenges—and show you how Korr can streamline your operations. From there, we can scope a phased rollout that fits your priorities and timeline.",
      "At Korr, we start by refactoring your data—streamlining and structuring it from day one. This accelerates implementation and creates a clean foundation for AI integration within your system of record.",
    ],
  },
];
