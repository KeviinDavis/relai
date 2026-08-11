import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Dashboard from "@/components/Dashboard";
import styles from "./ProductHero.module.css";

// Homepage hero, Structure D — product-dominant. Compact CENTERED copy up
// top (the one structural difference from BoardHero's headline-led split
// row), then the ops board takes over: horizontally centered and bleeding
// off the hero's bottom edge on desktop. On mobile the SAME board — one DOM
// instance, never a simplified twin — renders at a fixed 0.78 scale,
// left-anchored so the nav + activity feed lead legibly while the Console
// runs off the right edge: big and readable over small and complete, by
// design. No carrier trust strip here — that's Structure A (BoardHero).
//
// The floating nav pill from the reference is the site Header — RootLayout
// owns that chrome; this hero only clears space under it.
export default function ProductHero({ content, board }) {
  const { title, text, actions = [] } = content;

  return (
    <Section className={`theme-light ${styles.hero}`}>
      <Container className={styles.copy}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.sub}>{text}</p>
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
      </Container>

      <div className={styles.boardRow}>
        <Dashboard content={board} idBase="product-hero-board" />
      </div>
    </Section>
  );
}
