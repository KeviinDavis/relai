import Hero from "@/components/Hero";
import FormSection from "@/components/FormSection";

export const metadata = {
  title: "Book a Demo",
  description:
    "Book a demo with Korr’s sales team and learn how Korr can meet your company’s needs—the insurance interface that enables change at the speed of insurance.",
};

export default function BookADemoPage() {
  return (
    <>
      <Hero
        eyebrow="Book a Demo"
        title="Get a Closer Look At Korr"
        text="Ready for the full Korr experience? Book a demo with Korr’s sales team and learn how Korr can meet your company’s needs. Let an expert walk you through the insurance interface of the system that enables change at the speed of insurance."
      />

      <FormSection
        eyebrow="Request a demo"
        title="Let’s find a time to talk"
        text="Tell us a little about your team and what you’re looking to solve. We’ll be in touch to schedule a walkthrough tailored to your business."
        media={{
          src: "/images/demo-illustration.svg",
          alt: "Abstract illustration of Korr’s web-based product interface in green and white.",
        }}
        formHeading="We’d like to talk about partnering with Korr"
      />
    </>
  );
}
