import FluidHero from "@/components/FluidHero";
import StageHero from "@/components/StageHero";
import BoardHero from "@/components/BoardHero";
import ProductHero from "@/components/ProductHero";
import CompositeHero from "@/components/CompositeHero";
import CompositeHero12 from "@/components/CompositeHero12";
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
import { stageHero } from "@/content/stage-hero";
import { boardHero } from "@/content/board-hero";
import { productHero } from "@/content/product-hero";
import { compositeHero } from "@/content/composite-hero";
import { mobileTitle, description } from "@/content/hero-mobile-12";
import { dashboard } from "@/content/dashboard";
import { news } from "@/content/news";
import { scenarios as impactScenarios, cards } from "@/content/impact";
import { scenarios as platformScenarios, cards as platformCards } from "@/content/platform";
import { media } from "@/content/fluid-stats";
import { logoWall } from "@/content/logo-wall";

export default function Home() {
  return (
    <ThemeFadeZone>
      {/* Hero candidates — swap by moving the comments; exactly ONE mounts.
          Both board heroes share content/dashboard.js. */}
      {/* <FluidHero content={fluidHero} tone="inherit" /> */}
      {/* <StageHero content={stageHero} tone="light" /> */}
      {/* <BoardHero content={boardHero} board={dashboard} /> */}
      {/* <ProductHero content={productHero} board={dashboard} /> */}
      {/* <CompositeHero content={compositeHero} board={dashboard} /> */}
      <CompositeHero12
        content={compositeHero}
        board={dashboard}
        mobileTitle={mobileTitle}
        description={description}
      />
      <LogoWall content={logoWall} tone="inherit" />
      {/* <ThemeBreak /> */}
      <FluidCards scenarios={platformScenarios} cards={platformCards} tone="inherit" introPosition="top" />
      <ThemeBreak />
      <VideoParallax />

      {/* <FluidStats media={media} cards={cards} tone="inherit" /> */}
      <FluidCards scenarios={impactScenarios} cards={cards} tone="inherit" introPosition="bottom" />
      {/* <ThemeBreak /> */}
      <SplitSection content={customerStory} />
      <News content={news} tone="inherit" />
    </ThemeFadeZone>
  );
}
