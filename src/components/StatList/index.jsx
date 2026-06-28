import Section from "@/components/Section";
import Container from "@/components/Container";
import styles from "./StatList.module.css";

// Big centered statement heading over a column of stat rows.
// items: [{ value, label, description }]
export default function StatList({ id, heading, items = [] }) {
  return (
    <Section id={id} variant="default" className={`${styles.root} ${styles.theme}`}>
      <Container>
        {heading && <h2 className={styles.heading}>{heading}</h2>}

        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.label} className={styles.row}>
              <div className={styles.figure}>
                <span className={styles.value}>{item.value}</span>
                <span className={styles.label}>{item.label}</span>
              </div>
              <p className={styles.description}>{item.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
