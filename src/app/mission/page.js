import Hero from "@/components/Hero";
import StatList from "@/components/StatList";
import ImageRow from "@/components/ImageRow";
import Explore from "@/components/Explore";
import CtaBanner from "@/components/CtaBanner";
import TalentSection from "@/components/TalentSection";

export const metadata = {
  title: "Mission",
  description:
    "The coordination layer for global freight — built to move the world's cargo with less idle, less waste, and less carbon.",
};

export default function MissionPage() {
  return (
    <>
      <Hero
        title="The Relai Mission"
        meta={["Built at the Port of Long Beach"]}
        tag="[ MISSION ]"
        scrollIndicator
        scrollTo="#content"
        tone="dark"
        animate
        mediaAspect="56.25%"
        media={{
          type: "image",
          src: "/images/media-mission.svg",
          alt: "Placeholder for the Relai mission background video — a port at dusk.",
        }}
      />

      <StatList
        id="content"
        heading="The mission in numbers"
        items={[
          {
            value: "920+ hrs",
            label: "Idle per vessel, yearly",
            description:
              "The average container ship loses the equivalent of nearly 40 days a year waiting: at anchor, at berth, in the yard. Idle time is the supply chain's most expensive habit.",
          },
          {
            value: "68%",
            label: "Still on legacy systems",
            description:
              "More than two-thirds of global freight is coordinated on software written before the cloud. Relai is the layer that finally connects the gaps between them.",
          },
          {
            value: "1.2M+",
            label: "Container moves a year",
            description:
              "Relai coordinates over a million container handoffs annually across its launch network — every one tracked from ship to truck.",
          },
          {
            value: "11%",
            label: "Emissions cut at pilot terminals",
            description:
              "By cutting idle and waiting time, Relai's pilot terminals have measured a double-digit drop in fuel burn and emissions per move.",
          },
        ]}
      />

      <ImageRow
        images={[
          {
            src: "/images/concrete.webp",
            alt: "A container terminal at the waterfront.",
          },
          {
            src: "/images/about-why.webp",
            alt: "Stacked shipping containers in a port yard.",
          },
        ]}
      />

      <Explore
        heading="Explore the Network"
        map={{
          src: "/images/mission-globe.webp",
          alt: "Isometric map of a port network and the corridors Relai coordinates.",
        }}
        href="#"
      />

      <CtaBanner
        title="Shape the future of global freight"
        text="The supply chain is being rebuilt for a lower-carbon, real-time world — and it will take operators, carriers, and ports moving together. If your organization is ready to coordinate freight differently, we'd like to talk."
        actions={[{ label: "Partner With Relai", href: "#", variant: "light" }]}
      />

      <TalentSection
        heading="Stay On Our Radar"
        text="Be the first to know when new Relai roles open. Submit your information to express your interest."
        cta={{ label: "Join Our Talent Network", href: "#" }}
        rolesHeading="We're Hiring For The Following Roles"
        rolesText="Find your future at Relai."
        rolesCta={{ label: "Explore Open Roles", href: "#" }}
        roles={[
          "Terminal Integrations Engineer",
          "Software Engineer, Platform",
          "Data & ML Engineer",
          "Operations Lead, Drayage",
          "Product Designer",
          "Partnerships & Growth",
        ]}
      />
    </>
  );
}
