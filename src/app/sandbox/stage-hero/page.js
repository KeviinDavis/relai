import StageHero from "@/components/StageHero";
import { meta, stageHero } from "@/content/stage-hero";

export const metadata = meta;

export default function StageHeroSandboxPage() {
  return <StageHero content={stageHero} />;
}
