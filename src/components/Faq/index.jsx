"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Eyebrow from "@/components/Eyebrow";
import { useReveal } from "@/components/Reveal/useReveal";
import styles from "./Faq.module.css";

export default function Faq({ content = {} }) {
  const { eyebrow, title, text, items = [] } = content;
  const scope = useRef(null);
  useReveal(scope, [items.length]);

  return (
    <Section id="faq" className={styles.section}>
      <Container>
        <div ref={scope}>
          <div className={styles.header} data-reveal data-reveal-stagger>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {text && <p className={styles.text}>{text}</p>}
          </div>

          <ul className={styles.list} data-reveal data-reveal-stagger>
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
        </div>
      </Container>
    </Section>
  );
}
