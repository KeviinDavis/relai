import Hero from "@/components/Hero";
import TextSection from "@/components/TextSection";
import SplitSection from "@/components/SplitSection";
import Leadership from "@/components/Leadership";
import { meta, hero, intro, whyRelai, leadership, mission } from "@/content/about";

export const metadata = meta;

export default function AboutPage() {
  return (
    <>
      <Hero content={hero} />
      <TextSection content={intro} />
      <SplitSection content={whyRelai} />
      <SplitSection content={mission} />
      <Leadership content={leadership} />

    </>
  );
}
