import CompositeHero12 from "@/components/CompositeHero12";
import { meta, mobileTitle, description } from "@/content/hero-mobile-12";
import { compositeHero } from "@/content/composite-hero";
import { dashboard } from "@/content/dashboard";

export const metadata = meta;

// Sandbox preview — composite hero, mobile variant 12 (live-activity stack).
// Desktop is the live hero unchanged; the phone width swaps in the pill stack,
// the descriptive headline, and the paragraph.
export default function HeroMobile12SandboxPage() {
  return (
    <CompositeHero12
      content={compositeHero}
      board={dashboard}
      mobileTitle={mobileTitle}
      description={description}
      variantTag="Mobile variant 12"
    />
  );
}
