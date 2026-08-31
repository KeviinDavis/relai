import Section from "@/components/Section";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import BoardScaler from "@/components/BoardHero/BoardScaler";
import HeroVideo from "@/components/CompositeHero/HeroVideo";
import MobileSheet from "./MobileSheet";
import styles from "./HeroMobile11.module.css";

// Up-right link affordance — same glyph the CompositeHero/StageHero use.
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

// Hero Mobile — VARIANT 11 (sandbox). A byte-for-byte DUPLICATE of CompositeHero
// on desktop (same three layers over one framed stage: footage / copy column /
// glass board bleeding off the right); the ONLY divergence is the <768px branch,
// which hides the bleeding board and renders a frosted segmented BOTTOM SHEET
// (MobileSheet) over full-bleed footage — the same board data, reflowed.
// Production CompositeHero is untouched; all mobile behavior is scoped here.
export default function HeroMobile11({ content, board }) {
  const { eyebrow, title, description, cta, media } = content;

  return (
    <Section variant="hero" className={`theme-light ${styles.stage}`}>
      <div className={styles.frame}>
        <HeroVideo className={styles.video} src={media.src} poster={media.poster} />
      </div>

      <Container className={`theme-dark ${styles.overlay}`}>
        <div className={styles.lead}>
          {eyebrow && <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>}
          <h1 className={styles.title}>{title}</h1>
          {/* Mobile-only product description — hidden on desktop (byte-identical). */}
          {description && <p className={styles.subhead}>{description}</p>}
          {cta && (
            <Button href={cta.href} variant="solid" className={styles.cta}>
              {cta.label}
              <ArrowIcon />
            </Button>
          )}
        </div>
      </Container>

      {/* Desktop board — bleeds off the right/bottom. Hidden below the breakpoint. */}
      <BoardScaler className={styles.boardLayer} stageClassName={styles.boardMount}>
        <Dashboard content={board} skin="glass" idBase="hero-mobile-11-board" />
      </BoardScaler>

      {/* Mobile-only surface — the segmented bottom sheet. Hidden at/above the breakpoint. */}
      <MobileSheet className={styles.mobileSheet} board={board} />

      {/* Mobile-only progressive blur pinned to the bottom edge — softens the
          hard stop of the hero (stacked layers = increasing blur downward).
          Hidden on desktop. */}
      <div className={styles.bottomBlur} aria-hidden="true">
        <div className={styles.blurLayer} />
        <div className={styles.blurLayer} />
        <div className={styles.blurLayer} />
        <div className={styles.blurLayer} />
        <div className={styles.blurLayer} />
      </div>

      {/* Sandbox label. */}
      <div className={styles.cornerTag}>Mobile variant 11</div>
    </Section>
  );
}
