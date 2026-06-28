import Hero from "@/components/Hero";
import TextSection from "@/components/TextSection";
import SplitSection from "@/components/SplitSection";

export const metadata = {
  title: "Mission",
  description:
    "Korr’s mission is to provide insurers with technology they can use to thrive—redefining insurance as a sector that operates at the speed of change.",
};

export default function MissionPage() {
  return (
    <>
      <Hero
        eyebrow="Mission"
        title="The Korr Mission"
        media={{ type: "video", src: "/video/mission.mp4" }}
        size="tall"
      />

      <TextSection
        paragraphs={[
          "Korr is the modern and innovative platform for the insurance industry — placing thoughtfully innovative technology into the hands of our insurance partners to develop, configure and innovate on products and the business processes to service those products.",
          "Korr’s mission is to provide insurers with technology they can use to thrive in today’s rapidly changing business environment. Korr’s vision is nothing less than a total transformation of insurance — redefining it as a technologically advanced sector that operates at the speed of change to offer the best service possible.",
        ]}
      />

      <SplitSection
        eyebrow="Why Korr"
        title="Founded to build the most innovative insurance platform"
        paragraphs={[
          "Korr was founded in 2021 in New York City with a bold mission: to build the most innovative insurance platform on the planet.",
          "With decades of experience in insurance IT, we understand the industry’s complexities—and how to solve them. At Korr, trust is everything. That’s why we built a platform that puts customer experience first and handles the details, so you can focus on what matters: your policyholders and stakeholders.",
        ]}
        media={{
          src: "/images/mission-globe.webp",
          alt: "A drawing of a globe with details pulled out, a satellite, a city, planes.",
        }}
        aspectRatio="1/1"
      />
    </>
  );
}
