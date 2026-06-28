"use client";

import { useEffect, useRef, useState, Fragment } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Section from "@/components/Section";
import Container from "@/components/Container";
import styles from "./Capabilities.module.css";

gsap.registerPlugin(useGSAP);

// Eases mapped from the source's cubic-beziers.
const EASE_UNDERLINE = "expo.out"; // cubic-bezier(0.19, 1, 0.22, 1)
const EASE_ROLL = "power3.inOut"; // cubic-bezier(0.645, 0.045, 0.355, 1)
const EASE_IMAGE = "power2.out";

const pad = (n) => String(n).padStart(2, "0");
const prefersReduce = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Capabilities({ content = {} }) {
  const { heading = "Capabilities", items = [] } = content;
  const [active, setActive] = useState(0);
  const count = items.length;

  const scope = useRef(null);
  const tabsRef = useRef(null);
  const tabRefs = useRef([]);
  const underlineRef = useRef(null);
  const panelRefs = useRef([]);
  const prevRef = useRef(0);
  const mountedRef = useRef(false);

  // --- one slot odometer roll, in the direction of travel ---
  function roll(digits, index, prev, first, reduce, duration) {
    const dir = index >= prev ? 1 : -1;
    digits.forEach((el, i) => {
      if (i === index) {
        if (first || reduce) gsap.set(el, { yPercent: 0 });
        else gsap.fromTo(el, { yPercent: 100 * dir }, { yPercent: 0, duration, ease: EASE_ROLL, overwrite: "auto" });
      } else if (i === prev && !first) {
        gsap.to(el, { yPercent: reduce ? 0 : -100 * dir, duration: reduce ? 0 : duration, ease: EASE_ROLL, overwrite: "auto" });
      } else {
        gsap.set(el, { yPercent: index === prev ? 100 : 100 * dir });
      }
    });
  }

  function positionUnderline(index, animated) {
    const container = tabsRef.current;
    const tab = tabRefs.current[index];
    if (!container || !tab) return;
    gsap.to(underlineRef.current, {
      x: tab.offsetLeft,
      scaleX: tab.offsetWidth / container.offsetWidth,
      duration: animated ? 1 : 0,
      ease: EASE_UNDERLINE,
      transformOrigin: "left center",
      overwrite: "auto",
    });
  }

  // --- entrance animation for the incoming panel's content ---
  function playPanel(panel, reduce) {
    if (!panel) return;
    const title = panel.querySelector("[data-title]");
    const words = panel.querySelectorAll("[data-word]");
    const figure = panel.querySelector("[data-figure]");

    if (title) {
      gsap.killTweensOf(title);
      if (reduce) {
        gsap.set(title, { opacity: 1 });
        title.style.setProperty("--reveal", "120%");
      } else {
        title.style.setProperty("--reveal", "0%");
        gsap.set(title, { opacity: 0 });
        gsap.to(title, { opacity: 1, duration: 0.5, delay: 0.2, ease: EASE_UNDERLINE });
        const wipe = { v: 0 };
        gsap.to(wipe, {
          v: 120,
          duration: 0.7,
          delay: 0.15,
          ease: EASE_UNDERLINE,
          onUpdate: () => title.style.setProperty("--reveal", `${wipe.v.toFixed(1)}%`),
        });
      }
    }

    if (words.length) {
      gsap.killTweensOf(words);
      if (reduce) gsap.set(words, { yPercent: 0, opacity: 1 });
      else
        gsap.fromTo(
          words,
          { yPercent: 115, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.012, ease: "power3.out", delay: 0.1 }
        );
    }

    if (figure) {
      gsap.killTweensOf(figure);
      if (reduce) gsap.set(figure, { yPercent: 0, opacity: 1 });
      else gsap.fromTo(figure, { yPercent: 14, opacity: 0.35 }, { yPercent: 0, opacity: 1, duration: 0.6, ease: EASE_IMAGE });
    }
  }

  function animate(index, prev, first) {
    const reduce = prefersReduce();

    // panels crossfade
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      gsap.to(panel, { opacity: i === index ? 1 : 0, duration: reduce ? 0 : 0.4, ease: "power1.inOut", overwrite: "auto" });
      // counters live inside every panel and stay in sync (matches source)
      roll(panel.querySelectorAll("[data-small]"), index, prev, first, reduce, 0.5);
      roll(panel.querySelectorAll("[data-giant]"), index, prev, first, reduce, 0.45);
    });

    positionUnderline(index, !first && !reduce);
    playPanel(panelRefs.current[index], reduce);
  }

  // mount: measure + set the initial state in a layout effect (no flash)
  useGSAP(
    () => {
      animate(active, active, true);
      const onResize = () => positionUnderline(active, false);
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    },
    { scope }
  );

  // subsequent tab changes
  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      return;
    }
    animate(active, prevRef.current, false);
    prevRef.current = active;
    // animate() reads refs/closures and must run only on active change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const select = (i) => {
    if (i === active) return;
    setActive(i);
  };

  const onKeyDown = (e) => {
    let next = null;
    if (e.key === "ArrowRight") next = (active + 1) % count;
    else if (e.key === "ArrowLeft") next = (active - 1 + count) % count;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = count - 1;
    if (next === null) return;
    e.preventDefault();
    select(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <Section variant="default" className={`${styles.root} ${styles.theme}`}>
      <Container>
        <div className={styles.inner} ref={scope}>
          <h2 className={styles.heading}>{heading}</h2>

          <nav className={styles.tabsNav} aria-label={heading}>
            <div className={styles.tabs} role="tablist" ref={tabsRef} onKeyDown={onKeyDown}>
              <span className={styles.underline} ref={underlineRef} aria-hidden="true" />
              {items.map((item, i) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  id={`capability-tab-${i}`}
                  aria-controls={`capability-panel-${i}`}
                  aria-selected={i === active}
                  tabIndex={i === active ? 0 : -1}
                  className={styles.tab}
                  ref={(el) => (tabRefs.current[i] = el)}
                  onClick={() => select(i)}
                >
                  <span className={styles.tabText}>{item.title}</span>
                </button>
              ))}
            </div>
          </nav>

          <div className={styles.card}>
            {items.map((item, i) => (
              <article
                key={item.title}
                role="tabpanel"
                id={`capability-panel-${i}`}
                aria-labelledby={`capability-tab-${i}`}
                aria-hidden={i !== active}
                className={styles.panel}
                style={{ opacity: i === 0 ? 1 : 0 }}
                ref={(el) => (panelRefs.current[i] = el)}
              >
                <div className={styles.rail}>
                  <div className={styles.counter} aria-hidden="true">
                    <span className={styles.counterRoll}>
                      {items.map((_, n) => (
                        <span key={n} data-small className={styles.counterDigit}>
                          {pad(n + 1)}
                        </span>
                      ))}
                    </span>
                    <span className={styles.counterTotal}>/ {pad(count)}</span>
                  </div>

                  <span className={styles.numeral} aria-hidden="true">
                    {items.map((_, n) => (
                      <span key={n} data-giant className={styles.numeralDigit}>
                        {n + 1}
                      </span>
                    ))}
                  </span>
                </div>

                <div className={styles.body}>
                  <h3 className={styles.title} data-title>
                    {item.title}
                  </h3>
                  <p className={styles.description}>
                    {item.description.split(/\s+/).map((word, w, arr) => (
                      <Fragment key={w}>
                        <span className={styles.wordMask}>
                          <span className={styles.word} data-word>
                            {word}
                          </span>
                        </span>
                        {w < arr.length - 1 ? " " : ""}
                      </Fragment>
                    ))}
                  </p>
                </div>

                <div className={styles.media}>
                  <span className={styles.figureClip}>
                    <span className={styles.figure} data-figure>
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(max-width: 768px) 90vw, 33vw"
                        className={styles.image}
                      />
                    </span>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
