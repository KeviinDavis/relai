"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./ScrollThemeFade.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── Scroll-driven theme fade (Signifly effect) ─────────────────
   Sections are transparent; one shared wrapper owns background-color
   and color. Each section carries a theme, and a ScrollTrigger per
   section tweens the wrapper to that theme when the section crosses
   the viewport-center line — in either scroll direction. Everything
   drawn in currentColor (kicker, arrow, heading, body) inverts with
   it. GSAP tweens literal color values, so the theme defaults below
   are the project palette (--color-white / --color-black). */

const THEMES = {
  light: { bg: "#ffffff", fg: "#000000" },
  dark: { bg: "#000000", fg: "#ffffff" },
};

const resolveTheme = (s) => ({
  bg: s.bg || THEMES[s.theme || "light"].bg,
  fg: s.fg || THEMES[s.theme || "light"].fg,
});

function ArrowIcon() {
  return (
    <svg
      width="11"
      height="13"
      viewBox="0 0 11 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={styles.kickerIcon}
      aria-hidden="true"
    >
      <path
        d="M10.8 6.5L5.21163 0.5L4.14419 1.64179L7.97442 5.64925L0 5.64925L0 7.35075L7.97442 7.35075L4.14419 11.3582L5.21163 12.5L10.8 6.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ScrollThemeFade({
  sections = [],
  duration = 0.7,
  ease = "power2.inOut",
}) {
  const rootRef = useRef(null);
  const first = resolveTheme(sections[0] || {});

  useGSAP(
    () => {
      const root = rootRef.current;
      const els = gsap.utils.toArray("[data-sft-section]", root);
      if (!els.length) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      const apply = (el) => {
        gsap.to(root, {
          backgroundColor: el.dataset.bg,
          color: el.dataset.fg,
          duration: reduced ? 0 : duration,
          ease,
          overwrite: "auto",
        });
        root.dataset.theme = el.dataset.themeName;
      };

      els.forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          end: "bottom 50%",
          onEnter: () => apply(el),
          onEnterBack: () => apply(el),
        });
      });
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className={styles.stage}
      style={{ backgroundColor: first.bg, color: first.fg }}
      data-theme={sections[0]?.theme || "custom"}
    >
      {sections.map((s, i) => {
        const t = resolveTheme(s);
        return (
          <section
            key={i}
            data-sft-section
            data-bg={t.bg}
            data-fg={t.fg}
            data-theme-name={s.theme || "custom"}
            className={styles.section}
          >
            <div className={styles.inner} data-align={s.align || "left"}>
              {s.kicker && (
                <p className={styles.kicker}>
                  <ArrowIcon />
                  {s.kicker}
                </p>
              )}
              <h2 className={styles.heading}>{s.heading}</h2>
              {s.body && <p className={styles.body}>{s.body}</p>}
            </div>
          </section>
        );
      })}
    </div>
  );
}
