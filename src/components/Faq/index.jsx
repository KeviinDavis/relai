import Section from "@/components/Section";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import styles from "./Faq.module.css";

export default function Faq({ eyebrow, title, text, items = [] }) {
  return (
    <Section id="faq" className={styles.section}>
      <Container>
        <div className={styles.header}>
          {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
          {title && <h2 className={styles.title}>{title}</h2>}
          {text && <p className={styles.text}>{text}</p>}
        </div>

        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.question} className={styles.item}>
              <details className={styles.details}>
                <summary className={styles.summary}>
                  <span className={styles.question}>{item.question}</span>
                  {item.area && <span className={styles.area}>{item.area}</span>}
                  <span className={styles.icon} aria-hidden="true" />
                </summary>
                <div className={styles.answer}>
                  {item.answer.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
