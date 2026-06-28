import Hero from "@/components/Hero";
import TextSection from "@/components/TextSection";
import SplitSection from "@/components/SplitSection";

export const metadata = {
  title: "About",
  description:
    "Founded in 2021 in New York City, Korr is building the most innovative insurance platform—bridging the gap between insurance and modern technology.",
};

export default function AboutPage() {
  return (
    <>
      <Hero
        eyebrow="About"
        title="Developing the platform we wished we had"
        media={{
          type: "image",
          src: "/images/about-hero.webp",
          alt: "Modern and beautiful architecture.",
        }}
        size="tall"
      />

      <TextSection
        paragraphs={[
          "Until now, insurance software has added extra work to your daily tasks. Adapting your legacy solution for today’s needs is a job in itself. Korr is the first platform that saves you work instead of creating more.",
          "Korr’s experience implementing insurance solutions solidified the drive to deliver insurers better technology. Korr’s new, modern solution must fit the needs of many lines of business while presenting a user experience that caters appropriately to each persona. That’s how Korr was born.",
        ]}
      />

      <SplitSection
        eyebrow="Why Korr"
        title="Bridging insurance and modern technology"
        paragraphs={[
          "In 2021, we established Korr in New York City with a clear mission: to bridge the gap between the insurance industry and modern technology.",
          "From the outset, our goal was to create the most innovative insurance platform on the market. As cloud-based software reshapes industries, insurers have a unique opportunity to modernize, reduce costs, and significantly enhance ROI. With a cloud-native platform at its core, an insurance business becomes more efficient, adaptable, and scalable.",
          "We’re seeing Korr’s transformative impact with 240,000 policies currently in production. With more leading insurers coming on board, our upcoming case study will show how Korr is setting a new standard in the industry.",
        ]}
        media={{
          src: "/images/about-why.webp",
          alt: "Why Korr.",
        }}
      />

      <SplitSection
        eyebrow="Mission"
        title="A total transformation of insurance"
        paragraphs={[
          "Korr’s mission is to provide insurers with technology they can use to thrive in a rapidly changing business environment. Korr’s vision is nothing less than a total transformation of insurance — redefining it as a technologically advanced sector that can think on its feet to offer the best service possible.",
        ]}
        media={{
          src: "/images/product-architecture.webp",
          alt: "Mission.",
        }}
        actions={[{ label: "Read our mission", href: "/mission", variant: "primary" }]}
        reverse
      />
    </>
  );
}
