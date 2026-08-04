import FluidCards from "@/components/FluidCards";
import { meta, scenarios, cards } from "@/content/platform";

export const metadata = meta;

export default function PlatformSandboxPage() {
  return (
    <FluidCards
      scenarios={scenarios}
      cards={cards}
      tone="dark"
      introPosition="top"
    />
  );
}
