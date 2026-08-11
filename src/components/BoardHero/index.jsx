import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import BoardScaler from "./BoardScaler";
import styles from "./BoardHero.module.css";

// Homepage hero, Structure A — headline-led copy row up top, the full ops
// board below it, horizontally centered and bleeding off the hero's bottom
// edge on desktop; on mobile the same board (one DOM instance, never a
// simplified twin) renders fit-to-width via BoardScaler, with the carrier
// trust strip anchored beneath so the lower half isn't empty.
//
// The floating nav pill from the reference is the site Header — RootLayout
// owns that chrome; this hero only clears space under it.
export default function BoardHero({ content, board }) {
  const { title, text, textMobile, actions = [], trust } = content;

  return (
    <Section className={`theme-light ${styles.hero}`}>
      <Container className={styles.copy}>
        <h1 className={styles.title}>{title}</h1>
        <div className={styles.aside}>
          <p className={styles.sub}>{text}</p>
          {textMobile && <p className={styles.subMobile}>{textMobile}</p>}
          <div className={styles.actions}>
            {actions.map((action) => (
              <Button
                key={action.label}
                href={action.href}
                variant={action.variant === "ghost" ? "secondary" : "primary"}
                className={`${styles.cta} ${
                  action.variant === "ghost" ? styles.ctaGhost : styles.ctaPrimary
                }`}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </Container>

      <BoardScaler className={styles.boardRow} stageClassName={styles.boardStage}>
        <Dashboard content={board} />
      </BoardScaler>

      {trust && (
        <Container className={styles.trustWrap}>
          <div className={styles.trust}>
            <div className={styles.trustEyebrow}>{trust.eyebrow}</div>
            <ul className={styles.trustLogos}>
              {trust.logos.map((logo) => (
                <li key={logo}>{logo}</li>
              ))}
            </ul>
          </div>
        </Container>
      )}
    </Section>
  );
}
