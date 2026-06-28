"use client";

import { useState } from "react";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import styles from "./Testimonials.module.css";

export default function Testimonials({ items = [] }) {
  const [index, setIndex] = useState(0);
  const count = items.length;
  if (!count) return null;

  const go = (dir) => setIndex((i) => (i + dir + count) % count);
  const active = items[index];
  const counter = `${index + 1}/${count}`;

  return (
    <section className={styles.section}>
      <div className={styles.item}>
        <div className={styles.heading}>
          <Eyebrow variant="dark">Testimonials</Eyebrow>
          <span className={styles.name}>{active.name}</span>
        </div>

        <figure className={styles.media}>
          <div className={styles.card}>
            <Image
              src={active.image}
              alt={active.alt || active.name}
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className={styles.logo}
            />
          </div>
        </figure>

        <span className={styles.nameMobile}>{active.name}</span>
        <blockquote className={styles.quote}>{active.quote}</blockquote>
      </div>

      <nav className={styles.nav} aria-label="Testimonials">
        <button type="button" className={styles.control} onClick={() => go(-1)}>
          Previous
        </button>
        <span className={styles.counter}>{counter}</span>
        <button type="button" className={styles.control} onClick={() => go(1)}>
          Next
        </button>
      </nav>
    </section>
  );
}
