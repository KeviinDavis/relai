"use client";

import { useRef } from "react";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Media from "@/components/Media";
import { useReveal } from "@/components/Reveal/useReveal";
import styles from "./Leadership.module.css";

// Titled grid of leadership — portrait above name + role per person.
// NEW pattern: the copy doc's About page calls for a leadership list and no
// existing component fit, so this is a thin content section built from the
// shared Section/Container/Media primitives and project tokens only.
// A person renders the Media primitive when given an `image`, otherwise a
// token-colored placeholder box so the layout holds before real headshots land.
export default function Leadership({ content = {} }) {
  const { title, people = [] } = content;
  const scope = useRef(null);
  useReveal(scope, [people.length]);

  return (
    <Section variant="default" className={styles.root}>
      <Container>
        <div ref={scope}>
          {title && (
            <h2 className={styles.heading} data-reveal-mask>
              {title}
            </h2>
          )}

          <ul className={styles.grid} data-reveal data-reveal-stagger>
            {people.map((person) => (
              <li key={person.name} className={styles.person}>
                <div className={styles.portrait} data-reveal-image>
                  {person.image && (
                    <Media
                      type="image"
                      src={person.image}
                      alt={person.name}
                      fill
                      aspectRatio="4/5"
                    />
                  )}
                </div>
                <span className={styles.name}>{person.name}</span>
                <span className={styles.role}>{person.role}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
