import LogoWall from "@/components/LogoWall";
import { meta, logoWall } from "@/content/logo-wall";

export const metadata = meta;

export default function LogoWallSandboxPage() {
  return <LogoWall content={logoWall} />;
}
