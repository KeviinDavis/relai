import Section from "@/components/Section";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Button from "@/components/Button";
import Media from "@/components/Media";
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

// Cinematic framed video hero: the headline stack and the frosted-glass
// info cards float OVER the footage (contrast with FluidHero, whose content
// sits outside a contained image). Section's `hero` variant does the layering —
// the first child becomes the absolute background, everything after it a
// z-lifted overlay.
// The hero's CONTENT is theme-invariant: the overlay is scoped `theme-dark`
// (white headline over the footage; nav-glass cards with their own
// `theme-light` rescope). tone: "light" (default) | "dark" | "inherit"
// changes only the painted surround behind the video — the root's theme class
// scopes the section's --color-bg-primary frame; "inherit" lets it track
// ThemeFadeZone. No client JS — <video> is declarative.
export default function StageHero({ content = {}, tone = "light" }) {
  const { eyebrow, title, cta, media, feature, support, scrollHint } = content;
  const themeClass =
    tone === "dark" ? "theme-dark" : tone === "inherit" ? "" : "theme-light";

  return (
    <Section variant="hero" className={`${themeClass} ${styles.stage}`}>
      <Media
        type={media.type || "video"}
        src={media.src}
        alt={media.alt}
        fill
        priority={media.type === "image"}
      />

      <Container className={`theme-dark ${styles.overlay}`}>
        {/* Top-left feature callout */}
        {feature && (
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
        )}

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

        {/* Bottom-right support card */}
        {support && (
          <a href={support.href} className={`theme-light ${styles.card} ${styles.support}`}>
            <p className={styles.cardBody}>{support.text}</p>
            <ArrowIcon />
          </a>
        )}

        {/* Right-edge scroll hint */}
        {scrollHint && <span className={styles.scrollHint}>{scrollHint}</span>}
      </Container>
    </Section>
  );
}
