"use client";

import { useRef } from "react";
import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import { useReveal } from "@/components/Reveal/useReveal";
import styles from "./Intro.module.css";

export default function Intro({ excerpt, capsule, body, id, links = [] }) {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <section className={styles.section} id={id} ref={scope}>
      <div className={styles.top}>
        <p className={styles.excerpt} data-reveal-mask>{excerpt}</p>
        {links.length > 0 && (
          <ul className={styles.links} data-reveal>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {body && (
        <div className={styles.main} data-reveal data-reveal-stagger>
          <div className={styles.tag}>
            <Eyebrow>{capsule}</Eyebrow>
          </div>
          <p className={styles.body}>{body}</p>
        </div>
      )}
    </section>
  );
}
