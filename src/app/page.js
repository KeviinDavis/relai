import FluidHero from "@/components/FluidHero";
import LogoWall from "@/components/LogoWall";
import FluidCards from "@/components/FluidCards";
import FluidStats from "@/components/FluidStats";
import VideoParallax from "@/components/VideoParallax";
import Intro from "@/components/Intro";
import Capabilities from "@/components/Capabilities";
import Testimonials from "@/components/Testimonials";
import Shortcuts from "@/components/Shortcuts";
import SplitSection from "@/components/SplitSection";
import News from "@/components/News";
import ThemeFadeZone, { ThemeBreak } from "@/components/ThemeFadeZone";
import Reveal from "@/components/Reveal";
import { intro, capabilities, testimonials, shortcuts, customerStory } from "@/content/home";
import { fluidHero } from "@/content/fluid-hero";
import { news } from "@/content/news";
import { cards } from "@/content/impact";
import { scenarios as platformScenarios, cards as platformCards } from "@/content/platform";
import { media } from "@/content/fluid-stats";
import { logoWall } from "@/content/logo-wall";

export default function Home() {
  return (
    <ThemeFadeZone>
      <FluidHero content={fluidHero} tone="inherit" />
      <LogoWall content={logoWall} tone="inherit" />
      <FluidCards scenarios={platformScenarios} cards={platformCards} tone="inherit" introPosition="top" />
      <FluidStats media={media} cards={cards} tone="inherit" />
      <ThemeBreak />
      {/* <VideoParallax /> */}
      <SplitSection content={customerStory} />
      <News content={news} tone="inherit" />
    </ThemeFadeZone>
  );
}
