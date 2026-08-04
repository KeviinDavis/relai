import ScrollThemeFade from "@/components/ScrollThemeFade";
import { meta, sections } from "@/content/fade";

export const metadata = meta;

export default function FadeSandboxPage() {
  return <ScrollThemeFade sections={sections} />;
}
