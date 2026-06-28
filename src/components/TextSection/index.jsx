"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import { useReveal } from "@/components/Reveal/useReveal";
import styles from "./TextSection.module.css";

export default function TextSection({
  eyebrow,
  title,
  lead,
  paragraphs = [],
  actions = [],
  tone = "light",
  align = "left",
  narrow = true,
}) {
  const isDark = tone === "dark";
  const scope = useRef(null);
  useReveal(scope, [paragraphs.length]);

  return (
    <Section className={`${styles.section} ${isDark ? styles.dark : ""}`}>
      <Container variant={narrow ? "narrow" : "default"}>
        <div ref={scope}>
          <div className={`${styles.inner} ${styles[align]}`} data-reveal data-reveal-stagger>
            {eyebrow && (
              <Eyebrow variant={isDark ? "dark" : "default"}>{eyebrow}</Eyebrow>
            )}
            {title && <h2 className={styles.title}>{title}</h2>}
            {lead && <p className={styles.lead}>{lead}</p>}
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
                    variant={a.variant || (isDark ? "solid" : "primary")}
                  >
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
