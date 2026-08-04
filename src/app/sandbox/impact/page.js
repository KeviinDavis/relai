import FluidCards from "@/components/FluidCards";
import { meta, scenarios, cards } from "@/content/impact";

export const metadata = meta;

export default function ImpactSandboxPage() {
  return <FluidCards scenarios={scenarios} cards={cards} />;
}
