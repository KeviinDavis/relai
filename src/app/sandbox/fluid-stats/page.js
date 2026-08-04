import FluidStats from "@/components/FluidStats";
import { meta, media, cards } from "@/content/fluid-stats";

export const metadata = meta;

export default function FluidStatsSandboxPage() {
  return <FluidStats media={media} cards={cards} />;
}
