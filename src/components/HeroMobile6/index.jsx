import Section from "@/components/Section";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import BoardScaler from "@/components/BoardHero/BoardScaler";
import HeroVideo from "@/components/CompositeHero/HeroVideo";
import MobileSheet from "./MobileSheet";
import styles from "./HeroMobile6.module.css";

// SANDBOX — Mobile variant 6 (bottom-sheet peek). A duplicate of CompositeHero:
// the DESKTOP layer stack is byte-for-byte the live hero (video frame → copy
// column → glass Dashboard bleeding off the right/bottom). Only the mobile
// branch changes — below the breakpoint the right-bleeding board is hidden and
// the same feed data reflows into a frosted bottom sheet (see MobileSheet).
// CompositeHero itself is untouched; this reuses its primitives (Section,
// HeroVideo, BoardScaler, Dashboard) so production can't be affected.

// Up-right link affordance — same glyph the StageHero/News link arrows use.
function ArrowIcon({ className = "" }) {
  return (
    <svg
      className={`${styles.arrow} ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function HeroMobile6({ content, board }) {
  const { eyebrow, title, cta, media } = content;

  return (
    <Section variant="hero" className={`theme-light ${styles.stage}`}>
      <div className={styles.frame}>
        <HeroVideo className={styles.video} src={media.src} poster={media.poster} />
      </div>

      <Container className={`theme-dark ${styles.overlay}`}>
        <div className={styles.lead}>
          {eyebrow && <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>}
          <h1 className={styles.title}>{title}</h1>
          {cta && (
            <Button href={cta.href} variant="solid" className={styles.cta}>
              {cta.label}
              <ArrowIcon />
            </Button>
          )}
        </div>
      </Container>

      {/* Desktop board — hidden below the breakpoint (see .boardLayer mobile). */}
      <BoardScaler className={styles.boardLayer} stageClassName={styles.boardMount}>
        <Dashboard content={board} skin="glass" idBase="hero-m6-board" />
      </BoardScaler>

      {/* Mobile-only reflow of the same feed — hidden at desktop widths. */}
      <MobileSheet board={board} className={styles.sheetLayer} />
    </Section>
  );
}
