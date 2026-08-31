import HeroMobile11 from "@/components/HeroMobile11";
import { meta, heroMobile11 } from "@/content/hero-mobile-11";
import { dashboard } from "@/content/dashboard";

export const metadata = meta;

export default function HeroMobile11SandboxPage() {
  return <HeroMobile11 content={heroMobile11} board={dashboard} />;
}
