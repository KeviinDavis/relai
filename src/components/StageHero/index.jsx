import Section from "@/components/Section";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import Media from "@/components/Media";
import CountUp from "@/components/CountUp";
import styles from "./StageHero.module.css";

// Up-right link affordance — same glyph the Explore/News link arrows use.
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

// Small shipping-container mark that leads the feature label.
function FeatureMark() {
  return (
    <svg
      className={styles.mark}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <rect x="3" y="7" width="18" height="10" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 7v10M12 7v10M16 7v10" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

// Cinematic full-bleed video hero: the footage runs edge-to-edge and the
// headline stack and frosted-glass info cards float OVER it (contrast with
// FluidHero, whose content sits outside a contained image). Section's `hero`
// variant does the layering — the first child becomes the absolute
// background, everything after it a z-lifted overlay.
// The hero's CONTENT is theme-invariant: the overlay is scoped `theme-dark`
// (white headline over the footage; nav-glass cards with their own
// `theme-light` rescope). tone is kept for API parity but paints nothing
// now that the frame inset is gone. Stays a Server Component — the only
// client JS is the CountUp child ticking the stat figure.
export default function StageHero({ content = {}, tone = "light" }) {
  const { eyebrow, title, cta, media, feature, stat, scrollHint } = content;
  const themeClass =
    tone === "dark" ? "theme-dark" : tone === "inherit" ? "" : "theme-light";

  return (
    <Section variant="hero" className={`${themeClass} ${styles.stage}`}>
      {/* Backdrop = Section's pinned background slot. Holds the responsive
          media pair: desktop asset by default, a separate mobile asset below
          768px when content ships one (media.srcMobile). Works for video or
          image via media.type. */}
      <div>
        <div
          className={`${styles.mediaDesktop} ${media.srcMobile ? styles.hasMobile : ""}`}
        >
          <Media
            type={media.type || "video"}
            src={media.src}
            alt={media.alt}
            fill
            priority={media.type === "image"}
          />
        </div>
        {media.srcMobile && (
          <div className={styles.mediaMobile}>
            <Media
              type={media.type || "video"}
              src={media.srcMobile}
              alt={media.alt}
              fill
              priority={media.type === "image"}
            />
          </div>
        )}
      </div>

      <Container className={`theme-dark ${styles.overlay}`}>
        {/* Top-left feature callout — parked for now, restore by uncommenting. */}
        {/* {feature && (
          <a href={feature.href} className={`theme-light ${styles.card} ${styles.feature}`}>
            <span className={styles.cardHead}>
              <span className={styles.cardLabel}>
                <FeatureMark />
                {feature.label}
              </span>
              <ArrowIcon />
            </span>
            {feature.code && <span className={styles.featureCode}>{feature.code}</span>}
            {feature.description && <p className={styles.cardBody}>{feature.description}</p>}
          </a>
        )} */}

        {/* Bottom-left headline stack — sits directly on the footage */}
        <div className={styles.lead}>
          {eyebrow && (
            <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>
          )}
          <h1 className={styles.title}>{title}</h1>
          {cta && (
            <Button href={cta.href} variant="solid" className={styles.cta}>
              {cta.label}
              <span className={styles.ctaBadge}>
                <ArrowIcon className={styles.ctaArrow} />
              </span>
            </Button>
          )}
        </div>

        {/* Bottom-right stat card — passive (no link), reference weather-card
            anatomy: dotted label, dominant figure, caption, muted detail. */}
        {stat && (
          <div className={`theme-light ${styles.card} ${styles.stat}`}>
            <span className={styles.statLabel}>
              <span className={styles.statDot} aria-hidden="true" />
              {stat.label}
            </span>
            <CountUp value={stat.value} className={styles.statValue} />
            <span className={styles.statCaption}>{stat.caption}</span>
            <span className={styles.statDetail}>{stat.detail}</span>
          </div>
        )}

        {/* Right-edge scroll hint */}
        {scrollHint && <span className={styles.scrollHint}>{scrollHint}</span>}
      </Container>
    </Section>
  );
}
