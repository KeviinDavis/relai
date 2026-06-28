import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import styles from "./CtaBanner.module.css";

// Two-column closing statement: large title on the left, copy + actions on the right.
export default function CtaBanner({ title, text, actions = [] }) {
  return (
    <Section variant="default" className={`${styles.root} ${styles.theme}`}>
      <Container>
        <div className={styles.grid}>
          <h2 className={styles.title}>{title}</h2>

          <div className={styles.body}>
            {text && <p className={styles.text}>{text}</p>}
            {actions.length > 0 && (
              <div className={styles.actions}>
                {actions.map((a) => (
                  <Button key={a.label} href={a.href} variant={a.variant || "light"}>
                    {a.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
