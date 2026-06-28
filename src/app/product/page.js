import Hero from "@/components/Hero";
import TextSection from "@/components/TextSection";
import Stepper from "@/components/Stepper";
import SplitSection from "@/components/SplitSection";
import Faq from "@/components/Faq";
import {
  meta,
  hero,
  intro,
  stepper,
  deployFast,
  callout,
  realtime,
  faq,
} from "@/content/product";

export const metadata = meta;

export default function ProductPage() {
  return (
    <>
      <Hero content={hero} />
      <TextSection content={intro} />
      <Stepper content={stepper} />
      <SplitSection content={deployFast} />
      <TextSection content={callout} />
      <SplitSection content={realtime} />
      <Faq content={faq} />
    </>
  );
}
