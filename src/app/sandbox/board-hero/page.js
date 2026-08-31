import BoardHero from "@/components/BoardHero";
import { meta, boardHero } from "@/content/board-hero";
import { dashboard } from "@/content/dashboard";

export const metadata = meta;

export default function BoardHeroSandboxPage() {
  return <BoardHero content={boardHero} board={dashboard} />;
}
