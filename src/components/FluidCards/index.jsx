"use client";

// FluidCards — a fluid hover-expand stat-card section (see content/impact.js
// for the Relai "mission in numbers" instance).
//
// Two blocks:
//   1. Scenarios intro row — big heading (left) + gray lead card w/ thumb (right).
//   2. Fluid-width cards — a :has()-driven grid where the clicked (active) card
//      grows and reveals its description. Expansion is click-driven, not hover, so
//      scrolling past the section never expands/collapses cards; one card is
//      always open (card 1 at rest). The active card carries an `.active` class
//      and the CSS keys off it. GSAP here only drives the scroll-entrance reveals
//      (line split + thumb move-up) hinted by the data-milk-* hooks.

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Container from "@/components/Container";
import styles from "./styles.module.css";

gsap.registerPlugin(ScrollTrigger, SplitText);

function PlusIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden="true">
      <line x1="7.5" y1="0" x2="7.5" y2="15" stroke="currentColor" strokeWidth="1" />
      <line x1="0" y1="7.5" x2="15" y2="7.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function FluidCards({
  scenarios,
  cards = [],
  tone = "light",
  bg = "solid",
  layout = "showcase", // "showcase" = asymmetric 50/25/25 (card 1 open at rest)
  //                       "grid"     = tidy equal columns, each expands on hover
  introPosition = "bottom", // "bottom" = cards then intro; "top" = intro then cards
}) {
  const rootRef = useRef(null);
  // Which fluid card is expanded. Click-driven (not hover) so scrolling past the
  // section never expands/collapses cards. One card is always open — card 1 at
  // rest; clicking another switches which is open.
  const [activeIndex, setActiveIndex] = useState(0);
  // Invert with the theme system: put the global theme class on the root so it
  // flips the semantic tokens for this subtree (light = white, dark = black).
  const themeClass =
    tone === "dark" ? "theme-dark" : tone === "inherit" ? "" : "theme-light";
  const bgClass = bg === "none" ? styles.bgNone : "";
  const layoutClass = layout === "grid" ? styles.layoutGrid : "";

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    // Reduced motion (or no JS): CSS leaves everything visible — bail out and
    // never touch it.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const splits = [];
    const ctx = gsap.context(() => {
      // Split-text reveals: lines / chars rise into place, per the source's
      // data-milk-split hooks. gsap.from + immediateRender:false means the
      // element's natural (visible) state is the resting state — if a trigger
      // somehow never fires, content is never left hidden.
      root.querySelectorAll("[data-milk-split]").forEach((el) => {
        const type = el.getAttribute("data-milk-split") === "chars" ? "chars" : "lines";
        const split = new SplitText(el, { type });
        splits.push(split);
        const targets = type === "chars" ? split.chars : split.lines;
        gsap.from(targets, {
          yPercent: 110,
          autoAlpha: 0,
          duration: 0.8,
          stagger: type === "chars" ? 0.03 : 0.08,
          ease: "power3.out",
          immediateRender: false,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      // Thumbnails rise into place (data-milk-moveup).
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
  }, [scenarios, cards]);

  // Dynamic-width cards.
  const cardsBlock = (
    <div className={styles.cards}>
      {cards.map((card, i) => (
        <article
          key={card.code}
          className={`${styles.card} ${i === activeIndex ? styles.active : ""}`}
          role="button"
          tabIndex={0}
          aria-expanded={i === activeIndex}
          onClick={() => setActiveIndex(i)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              setActiveIndex(i);
            }
          }}
        >
          <div className={styles.cardBody}>
            <h2 className={styles.cardCode}>{card.code}</h2>
            <div className={styles.cardText}>
              <p>{card.text}</p>
            </div>
          </div>
          <div className={styles.cardFooter}>
            <span className={styles.cardLabel}>{card.label}</span>
            <span className={styles.cardIcon} aria-hidden="true">
              <PlusIcon />
            </span>
          </div>
        </article>
      ))}
    </div>
  );

  // Scenarios intro: big heading (left) + lead card (right). The lead card has
  // two shapes: a single lead paragraph + thumb (impact), or an eyebrow + bold
  // title + dim subtext + decorative menu chip (platform) — driven by content.
  const introBlock = (
    <div className={styles.scenariosRow}>
      <h2 className={styles.scenariosHeading} data-milk-split="lines">
        {scenarios.heading}
      </h2>
      <div className={styles.scenariosCard}>
        {scenarios.eyebrow ? (
          <span className={styles.eyebrow}>{scenarios.eyebrow}</span>
        ) : null}
        {scenarios.title ? (
          <>
            <h3 className={styles.leadTitle} data-milk-split="lines">
              {scenarios.title}
            </h3>
            <p className={styles.leadSubtext} data-milk-split="lines">
              {scenarios.description}
            </p>
          </>
        ) : (
          <h3 className={styles.scenariosLead} data-milk-split="lines">
            {scenarios.description}
          </h3>
        )}
        {scenarios.image ? (
          <div className={styles.scenariosThumb} data-milk-moveup>
            <img src={scenarios.image.src} alt={scenarios.image.alt} />
          </div>
        ) : (
          <span className={styles.menuChip} aria-hidden="true">
            &#8943;
          </span>
        )}
      </div>
    </div>
  );

  const introOnTop = introPosition === "top";

  return (
    <section className={`${styles.impact} ${themeClass} ${layoutClass} ${bgClass}`} ref={rootRef}>
      <Container>
        {introOnTop ? (
          <>
            {introBlock}
            {cardsBlock}
          </>
        ) : (
          <>
            {cardsBlock}
            {introBlock}
          </>
        )}
      </Container>
    </section>
  );
}
