import Section from "@/components/Section";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import HeroVideo from "@/components/CompositeHero/HeroVideo";
import styles from "./CompositeHero12.module.css";

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

// One live-activity pill: a carrier mark (or a red live dot on the breach), the
// mono id, a micro-cap substate, and a right-aligned metric. Geometry (width /
// opacity / z) comes from the caller's className.
function Pill({ className = "", mark, flag = false, id, sub, metric, metricRed = false }) {
  return (
    <div className={`${styles.pill} ${className} ${flag ? styles.pillFlag : ""}`}>
      {flag ? (
        <span className={styles.redlive} aria-hidden="true" />
      ) : (
        <span className={styles.mark} aria-hidden="true">
          {mark}
        </span>
      )}
      <div className={styles.ptxt}>
        <div className={styles.pid}>{id}</div>
        <div className={styles.pst}>{sub}</div>
      </div>
      <span className={`${styles.prt} ${metricRed ? styles.prtRed : ""}`}>{metric}</span>
    </div>
  );
}

// CompositeHero — VARIANT 12 (sandbox). The live-activity treatment at ALL
// widths (it replaces the desktop composite hero for this route only): a dark,
// dimmed, CONTAINED video panel (inset + rounded, not edge-to-edge) with centered
// copy (descriptive headline → paragraph → CTA) and the frosted live-activity
// pill stack landing over the footage — the breaching container the single red
// front pill. The board data is reflowed into the pills (no re-authored content);
// type/width/spacing scale fluidly via clamp(). Shared primitives reused unchanged.
export default function CompositeHero12({
  content,
  board,
  mobileTitle,
  description,
  variantTag,
}) {
  const { eyebrow, title, cta, media } = content;

  // Reflow the real board data (never re-authored) into the four pills + caption.
  const feed = board.feed.rows;
  const back2 = feed[0]; // MSCU 774918-5 · Discharged · Pier T · 4m
  const back3 = feed[1]; // Booking LB-30219 · Customs cleared · 22m
  const back4 = feed[2]; // Drayage #8841 · Gate-out · APM Terminal · 1h
  const breach = board.console.table.rows.find((r) => r.flag) ?? board.console.table.rows[0];
  const stat = (label) => board.console.stats.find((s) => s.label === label)?.value;
  const caption = `${stat("Due today")} due today · ${stat("Exposure")} exposure · tap to open`;

  return (
    <Section variant="hero" className={`theme-light ${styles.stage}`}>
      <div className={styles.frame}>
        <HeroVideo className={styles.video} src={media.src} poster={media.poster} />
      </div>

      <Container className={`theme-dark ${styles.overlay}`}>
        <div className={styles.lead}>
          {eyebrow && <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>}
          {/* Descriptive headline (falls back to the content title). */}
          <h1 className={styles.title}>{mobileTitle || title}</h1>
          {description && <p className={styles.description}>{description}</p>}
          {cta && (
            <Button href={cta.href} variant="solid" className={styles.cta}>
              {cta.label}
              <ArrowIcon />
            </Button>
          )}
        </div>

        {/* Live-activity stack — rear pills first so the breach (last, z-2)
            lands on top. */}
        <div className={styles.activityStack}>
          <Pill
            className={styles.pillBack4}
            mark={back4.mark}
            id={back4.id}
            sub={`${back4.state} · ${back4.loc}`}
            metric={back4.age}
          />
          <Pill
            className={styles.pillBack3}
            mark={back3.mark}
            id={back3.id}
            sub={back3.state}
            metric={back3.age}
          />
          <Pill
            className={styles.pillBack2}
            mark={back2.mark}
            id={back2.id}
            sub={`${back2.state} · ${back2.loc}`}
            metric={back2.age}
          />
          <Pill
            className={styles.pillFront}
            flag
            id={breach.id}
            sub={`Last free day · ${breach.loc}`}
            metric={breach.dem}
            metricRed
          />
          <div className={styles.stackCap}>{caption}</div>
        </div>
      </Container>

      {variantTag && <span className={styles.variantTag}>{variantTag}</span>}
    </Section>
  );
}
