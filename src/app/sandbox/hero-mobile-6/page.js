import HeroMobile6 from "@/components/HeroMobile6";
import { compositeHero } from "@/content/composite-hero";
import { dashboard } from "@/content/dashboard";
import styles from "./page.module.css";

// SANDBOX — Mobile variant 6 (bottom-sheet peek). Renders a duplicate of the
// composite hero: desktop is byte-for-byte the live hero; below 768px the feed
// reflows into a frosted bottom sheet. Reuses the live hero's content + board
// data verbatim. Preview at a phone width to compare against the sibling
// variants.
export const metadata = {
  title: "Mobile Variant 6: Bottom-sheet peek (Sandbox)",
  description:
    "Composite hero sandbox: desktop identical to the live hero; below the breakpoint the ops feed reflows into a frosted bottom-sheet peek.",
};

export default function HeroMobile6SandboxPage() {
  return (
    <>
      <HeroMobile6 content={compositeHero} board={dashboard} />
      <span className={styles.cornerTag}>Mobile variant 6</span>
    </>
  );
}
