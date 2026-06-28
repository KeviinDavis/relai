import Section from "@/components/Section";
import Container from "@/components/Container";
import Media from "@/components/Media";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import styles from "./SplitSection.module.css";

export default function SplitSection({
  eyebrow,
  title,
  paragraphs = [],
  media,
  actions = [],
  reverse = false,
  tone = "light",
  aspectRatio = "4/5",
}) {
  const isDark = tone === "dark";
  return (
    <Section className={`${styles.section} ${isDark ? styles.dark : ""}`}>
      <Container>
        <div className={`${styles.grid} ${reverse ? styles.reverse : ""}`}>
          <div className={styles.text}>
            {eyebrow && (
              <Eyebrow variant={isDark ? "dark" : "default"}>{eyebrow}</Eyebrow>
            )}
            {title && <h2 className={styles.title}>{title}</h2>}
            {paragraphs.map((p, i) => (
              <p key={i} className={styles.paragraph}>
                {p}
              </p>
            ))}
            {actions.length > 0 && (
              <div className={styles.actions}>
                {actions.map((a) => (
                  <Button
                    key={a.label}
                    href={a.href}
                    variant={a.variant || "primary"}
                  >
                    {a.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className={styles.figure}>
            <Media
              type="image"
              src={media.src}
              alt={media.alt || ""}
              fill
              aspectRatio={aspectRatio}
            />
          </div>
        </div>
      </Container>
    </Section>
  );
}
