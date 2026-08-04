import Hero from "@/components/Hero";
import ServicesDeck from "@/components/ServicesDeck";
import TextSection from "@/components/TextSection";
import ProcessList from "@/components/ProcessList";
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
import { services } from "@/content/services-deck";

export const metadata = meta;

export default function ProductPage() {
  return (
    <>
      <Hero content={hero} />
      <ServicesDeck services={services} />
      {/* <TextSection content={intro} /> */}
      {/* <ProcessList content={stepper} />
      <SplitSection content={deployFast} />
      <TextSection content={callout} />
      <SplitSection content={realtime} /> */}
      <Faq content={faq} />
    </>
  );
}
