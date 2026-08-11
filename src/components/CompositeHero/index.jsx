import Section from "@/components/Section";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import BoardScaler from "@/components/BoardHero/BoardScaler";
import HeroVideo from "./HeroVideo";
import styles from "./CompositeHero.module.css";

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

// Composite hero: three layers over one framed stage. (1) The blue-hour port
// footage is the contained scene panel (Section's `hero` variant pins the
// first child; the frame insets, rounds, and clips it). (2) The copy column
// locks bottom-left on the footage. (3) The existing Dashboard — glass skin —
// bleeds off the frame's right and bottom edges, clipped by its own layer.
// Copy renders BEFORE the board so tab order runs eyebrow → CTA → board
// states; the board layer paints above but is pointer-transparent outside the
// mount, so the CTA stays clickable.
export default function CompositeHero({ content, board }) {
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

      <BoardScaler className={styles.boardLayer} stageClassName={styles.boardMount}>
        <Dashboard content={board} skin="glass" idBase="composite-board" />
      </BoardScaler>
    </Section>
  );
}
