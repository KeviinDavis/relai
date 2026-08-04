"use client";

import { useRef } from "react";
import Eyebrow from "@/components/Eyebrow";
import { useReveal } from "@/components/Reveal/useReveal";
import styles from "./Intro.module.css";

// tone: "light" (default) | "dark" — scopes the section via the global
// theme classes, matching the FluidHero/FluidCards/LogoWall convention.
export default function Intro({ content = {}, tone = "light" }) {
  const { excerpt, capsule, body, id } = content;
  const scope = useRef(null);
  useReveal(scope);
  const themeClass = tone === "dark" ? "theme-dark" : "theme-light";

  return (
    <section className={`${themeClass} ${styles.section}`} id={id} ref={scope}>
      <div className={styles.tag} data-reveal>
        <Eyebrow>{capsule}</Eyebrow>
      </div>
      <p className={styles.excerpt} data-reveal-mask>{excerpt}</p>
      {body && (
        <p className={styles.body} data-reveal>{body}</p>
      )}
    </section>
  );
}
