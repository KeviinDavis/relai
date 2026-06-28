import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Capabilities from "@/components/Capabilities";
import Testimonials from "@/components/Testimonials";
import Shortcuts from "@/components/Shortcuts";
import Reveal from "@/components/Reveal";
import { hero, intro, capabilities, testimonials, shortcuts } from "@/content/home";

export default function Home() {
  return (
    <>
      <Hero content={hero} />

      <Reveal>
        <Intro content={intro} />
      </Reveal>

      <Capabilities content={capabilities} />

      <Reveal>
        <Testimonials content={testimonials} />
      </Reveal>

      <Reveal>
        <Shortcuts content={shortcuts} />
      </Reveal>
    </>
  );
}
