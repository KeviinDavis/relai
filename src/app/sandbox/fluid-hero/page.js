import FluidHero from "@/components/FluidHero";
import { meta, fluidHero } from "@/content/fluid-hero";

export const metadata = meta;

export default function FluidHeroSandboxPage() {
  return <FluidHero content={fluidHero} tone="light" />;
}
