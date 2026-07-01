import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import Capabilities from "@/components/Capabilities";
import Testimonials from "@/components/Testimonials";
import Shortcuts from "@/components/Shortcuts";
import News from "@/components/News";
import Reveal from "@/components/Reveal";
import { hero, intro, capabilities, testimonials, shortcuts } from "@/content/home";
import { news } from "@/content/news";

export default function Home() {
  return (
    <>
      <Hero content={hero} />

      <Reveal>
        <Intro content={intro} />
      </Reveal>

      <Capabilities content={capabilities} />

      {/* <Reveal>
        <Testimonials content={testimonials} />
      </Reveal> */}


      <Shortcuts content={shortcuts} />

      <News content={news} />
    </>
  );
}
