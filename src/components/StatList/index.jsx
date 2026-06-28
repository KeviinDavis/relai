"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import { useReveal } from "@/components/Reveal/useReveal";
import styles from "./StatList.module.css";

// Big centered statement heading over a column of stat rows.
// items: [{ value, label, description }]
export default function StatList({ id, heading, items = [] }) {
  const scope = useRef(null);
  useReveal(scope, [items.length]);

  return (
    <Section id={id} variant="default" className={`${styles.root} ${styles.theme}`}>
      <Container>
        <div ref={scope}>
          {heading && (
            <h2 className={styles.heading} data-reveal-mask>
              {heading}
            </h2>
          )}

          <ul className={styles.list} data-reveal data-reveal-stagger>
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
        </div>
      </Container>
    </Section>
  );
}
