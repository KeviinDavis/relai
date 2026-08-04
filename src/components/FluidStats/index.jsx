"use client";

// FluidStats — a fluid hover-expand media + stats row (see content/fluid-stats.js
// for the Relai "mission in numbers" instance). A separate take on the same
// data as FluidCards, in a structured 4-column layout.
//
// One 4-column grid: a media tile (image or video) followed by three tall stat
// cards. All columns rest equal; a :has()-driven grid grows whichever cell is
// hovered (media tile included) and fades the hovered card's description in.
// That interaction is pure CSS; GSAP here only drives the scroll-entrance
// reveals (char split on the stats + media tile move-up) hinted by the
// data-milk-* hooks.

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Container from "@/components/Container";
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function FluidStats({ media, cards = [], tone = "light", bg = "solid" }) {
  const rootRef = useRef(null);
  // Invert with the theme system: put the global theme class on the root so it
  // flips the semantic tokens for this subtree (light = white, dark = black).
  const themeClass =
    tone === "dark" ? "theme-dark" : tone === "inherit" ? "" : "theme-light";
  // bg="none" drops the opaque surface so a parent stage (ThemeFadeZone) shows
  // through; default keeps the self-painted background.
  const bgClass = bg === "none" ? styles.bgNone : "";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Reduced motion (or no JS): CSS leaves everything visible — bail out and
    // never touch it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const splits = [];
    const ctx = gsap.context(() => {
      // Split-text reveals: stat chars rise into place, per the source's
      // data-milk-split hooks. gsap.from + immediateRender:false means the
      // element's natural (visible) state is the resting state — if a trigger
      // somehow never fires, content is never left hidden.
      root.querySelectorAll("[data-milk-split]").forEach((el) => {
        const split = new SplitText(el, { type: "chars" });
        splits.push(split);
        gsap.from(split.chars, {
          yPercent: 110,
          autoAlpha: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Media tile rises into place (data-milk-moveup).
      root.querySelectorAll("[data-milk-moveup]").forEach((el) => {
        gsap.from(el, {
          yPercent: 40,
          autoAlpha: 0,
          duration: 0.9,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      // Positions are computed after fonts/layout settle so above-the-fold
      // triggers fire correctly on load.
      ScrollTrigger.refresh();
    }, root);

    return () => {
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, [media, cards]);

  return (
    <section className={`${styles.impact} ${themeClass} ${bgClass}`} ref={rootRef}>
      <Container>
        <div className={styles.cards}>
          {cards.map((card) => (
            <article key={card.code} className={`${styles.cell} ${styles.card}`}>
              <div className={styles.cardBody}>
                <h2 className={styles.cardCode} data-milk-split="chars">
                  {card.code}
                </h2>
                <div className={styles.cardText}>
                  <p>{card.text}</p>
                </div>
              </div>
              <span className={styles.cardLabel}>{card.label}</span>
            </article>
          ))}
          <div className={`${styles.cell} ${styles.mediaTile}`} data-milk-moveup>
            {media.type === "video" ? (
              <video
                src={media.src}
                poster={media.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
            ) : (
              <Image
                src={media.src}
                alt={media.alt}
                fill
                sizes="(max-width: 767px) 100vw, 50vw"
              />
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
