import Section from "@/components/Section";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import Media from "@/components/Media";
import Button from "@/components/Button";
import styles from "./FluidHero.module.css";

// Flat hero (Triloe "Trusted Feedback" reconstruction, de-carded during
// iteration): the tone-painted section IS the surface — split header, then
// a media block with caves carved out of it. No card panel in between.
// tone: "light" (default) | "dark" — scopes the section via the global
// theme classes; every color below is a semantic token, so dark is free.
export default function FluidHero({ content = {}, tone = "light", bg = "solid" }) {
  const { eyebrow, title, support, media, actions = [] } = content;
  const themeClass =
    tone === "dark" ? "theme-dark" : tone === "inherit" ? "" : "theme-light";
  const bgClass = bg === "none" ? styles.bgNone : "";

  return (
    <Section className={`${themeClass} ${styles.frame} ${bgClass}`}>
      <Container>
        <header className={styles.header}>
          {eyebrow && <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>}
          <div className={styles.headerRow}>
            <h1 className={styles.heading}>{title}</h1>
            {support && <p className={styles.support}>{support}</p>}
          </div>
        </header>

        {/* Media block; aspect switches per breakpoint via the CSS var
            chain (--fluid-media-aspect is defined per breakpoint below). */}
        <div className={styles.media}>
          <Media
            src={media.src}
            alt={media.alt}
            fill
            aspectRatio="var(--fluid-media-aspect)"
            priority
            sizes="(max-width: 768px) 100vw, 1280px"
          />

          {/* Empty decorative cave — carved shape only, no content */}
          <div className={`${styles.chip} ${styles.cutout}`} aria-hidden="true" />

          {actions.length > 0 && (
            <div className={`${styles.chip} ${styles.meta}`}>
              {actions.map((a) => (
                <Button
                  key={a.label}
                  href={a.href}
                  variant={a.variant || "primary"}
                  className={styles.cta}
                >
                  {a.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
