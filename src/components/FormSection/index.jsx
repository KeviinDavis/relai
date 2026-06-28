"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Media from "@/components/Media";
import Eyebrow from "@/components/Eyebrow";
import ContactForm from "@/components/ContactForm";
import { useReveal } from "@/components/Reveal/useReveal";
import styles from "./FormSection.module.css";

export default function FormSection({
  eyebrow,
  title,
  text,
  media,
  formHeading,
}) {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.grid} ref={scope}>
          <div className={styles.intro} data-reveal data-reveal-stagger>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {text && <p className={styles.text}>{text}</p>}
            {media && (
              <div className={styles.figure}>
                <Media
                  type="image"
                  src={media.src}
                  alt={media.alt || ""}
                  fill
                  aspectRatio="1/1"
                />
              </div>
            )}
          </div>

          <div className={styles.formWrap} data-reveal>
            <ContactForm heading={formHeading} showAltLink={false} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
