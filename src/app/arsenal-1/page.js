import Hero from "@/components/Hero";
import StatList from "@/components/StatList";
import ImageRow from "@/components/ImageRow";
import Explore from "@/components/Explore";
import CtaBanner from "@/components/CtaBanner";
import TalentSection from "@/components/TalentSection";

export const metadata = {
  title: "Arsenal-1",
  description:
    "Arsenal-1 is a hyperscale manufacturing facility built in Ohio — rebuilding the arsenal of democracy with over $900M of investment, 5M+ sq ft, and 4000+ new jobs.",
};

export default function Arsenal1Page() {
  return (
    <>
      <Hero
        title="Arsenal-1"
        meta={["Designed by Anduril", "Built in Ohio"]}
        tag="[A-1]"
        scrollIndicator
        scrollTo="#content"
        tone="dark"
        animate
        mediaAspect="56.25%"
        media={{
          type: "image",
          src: "/images/product-architecture.webp",
          alt: "Aerial view of the Arsenal-1 hyperscale manufacturing site in Ohio.",
        }}
      />

      <StatList
        id="content"
        heading="Hyperscale Manufacturing"
        items={[
          {
            value: "$900 Million+",
            label: "Capital Investment",
            description:
              "Over $900 Million of capital investment into rebuilding the Arsenal, representing one of the largest manufacturing investments in the region.",
          },
          {
            value: "5 Million Sqft+",
            label: "Manufacturing Space",
            description:
              "5 Million+ sq ft of manufacturing space, making it one of the largest industrial facilities in Ohio.",
          },
          {
            value: "4000+",
            label: "New Jobs",
            description:
              "Arsenal-1 represents the single largest job creation event in Ohio history, bringing 4000+ new direct jobs across the state.",
          },
          {
            value: "$2 Billion",
            label: "Annual Economic Output",
            description:
              "$2 Billion a year in projected annual economic output, contributing to Ohio's robust manufacturing economy.",
          },
        ]}
      />

      <ImageRow
        images={[
          {
            src: "/images/concrete.webp",
            alt: "Precast concrete wall panels being raised by crane during Arsenal-1 construction.",
          },
          {
            src: "/images/about-why.webp",
            alt: "Interior steel structure of the Arsenal-1 manufacturing facility.",
          },
        ]}
      />

      <Explore
        heading="Explore Arsenal-1"
        qr="/images/arsenal-qr.svg"
        map={{
          src: "/images/mission-globe.webp",
          alt: "Isometric satellite map of the Arsenal-1 site and surrounding airfield.",
        }}
        href="#"
      />

      <CtaBanner
        title="Shape The Future Of American Defense In Ohio"
        text="Rebuilding the arsenal of democracy is a shared responsibility that will require our brightest innovators to contribute. Complete this form if your company is ready to partner with Anduril."
        actions={[{ label: "Partner With Us", href: "#", variant: "light" }]}
      />

      <TalentSection
        heading="Stay On Our Radar"
        text="Be the first to know when new Anduril roles open locally in Ohio. Submit your information to express your interest."
        cta={{ label: "Join Our Talent Network", href: "#" }}
        rolesHeading="We Are Hiring For The Following Roles"
        rolesText="Find your future at Anduril."
        rolesCta={{ label: "Explore Open Roles", href: "#" }}
        roles={[
          "Manufacturing Engineering",
          "Manufacturing Operations",
          "Materials & Support",
          "Quality & Compliance",
          "Technicians",
          "Production Test",
        ]}
      />
    </>
  );
}
