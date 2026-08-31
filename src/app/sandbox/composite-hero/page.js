import CompositeHero from "@/components/CompositeHero";
import { meta, compositeHero } from "@/content/composite-hero";
import { dashboard } from "@/content/dashboard";

export const metadata = meta;

export default function CompositeHeroSandboxPage() {
  return <CompositeHero content={compositeHero} board={dashboard} />;
}
