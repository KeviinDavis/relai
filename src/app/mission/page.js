import Hero from "@/components/Hero";
import StatList from "@/components/StatList";
import ImageRow from "@/components/ImageRow";
import Explore from "@/components/Explore";
import CtaBanner from "@/components/CtaBanner";
import TalentSection from "@/components/TalentSection";
import { meta, hero, stats, gallery, explore, partner, talent } from "@/content/mission";

export const metadata = meta;

export default function MissionPage() {
  return (
    <>
      <Hero content={hero} />
      <StatList content={stats} />
      <ImageRow content={gallery} />
      <Explore content={explore} />
      <CtaBanner content={partner} />
      <TalentSection content={talent} />
    </>
  );
}
