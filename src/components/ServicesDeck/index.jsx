"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import styles from "./styles.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText);

export default function ServicesDeck({
  services = [],
  transitionLength = 1.8, // scroll distance per panel transition, in viewport-heights
}) {
  const sectionRef = useRef(null);

  // useGSAP (not useEffect): its cleanup runs in a layout effect, so the
  // pin-spacer that pin:true wraps around <section> is reverted BEFORE React
  // detaches the node on route change — otherwise removeChild throws.
  useGSAP(
    () => {
      const section = sectionRef.current;
      if (!section || !services.length) return;

      const splits = [];
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        const items = gsap.utils.toArray("[data-item]", section);
        const contents = items.map((item) => item.querySelector("[data-content]"));

        // One paused entrance timeline per panel: seam draw + plus spin,
        // caption word de-blur, capability rule draws.
        const entrances = items.map((item) => {
          const words = [];
          item.querySelectorAll("[data-caption-line]").forEach((line) => {
            const split = new SplitText(line, { type: "words" });
            splits.push(split);
            words.push(...split.words);
          });

          const tl = gsap.timeline({ paused: true });
          tl.fromTo(
            item.querySelector("[data-seam-line]"),
            { width: "0%" },
            { width: "100%", duration: 1.2, ease: "power3.out", immediateRender: true },
            0
          )
            .fromTo(
              item.querySelector("[data-plus]"),
              { rotation: 0 },
              { rotation: 360, duration: 1.2, ease: "power3.out", immediateRender: true },
              0
            )
            .fromTo(
              words,
              { autoAlpha: 0, filter: "blur(12px)" },
              {
                autoAlpha: 1,
                filter: "blur(0px)",
                duration: 0.7,
                stagger: 0.06,
                ease: "power2.out",
                immediateRender: true,
              },
              0.1
            )
            .fromTo(
              item.querySelectorAll("[data-rule]"),
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.9,
                stagger: 0.08,
                ease: "power3.out",
                immediateRender: true,
              },
              0.15
            );
          return tl;
        });

        const played = items.map(() => false);
        const setPlayed = (i, on, instant) => {
          played[i] = on;
          if (!on) entrances[i].pause(0);
          else if (instant) entrances[i].progress(1);
          else entrances[i].play(0);
        };

        // A panel past ~85% of its slide-up runs its entrance; scrolled back past
        // the halfway point it resets so the entrance replays on the next pass.
        const updateActivation = (progress, instant) => {
          const pos = progress * (items.length - 1);
          for (let i = 1; i < items.length; i++) {
            if (pos >= i - 0.15 && !played[i]) setPlayed(i, true, instant);
            else if (pos < i - 0.5 && played[i]) setPlayed(i, false, instant);
          }
        };

        gsap.set(items.slice(1), { yPercent: 100 });

        const master = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${(items.length - 1) * transitionLength * window.innerHeight}`,
            pin: true,
            scrub: true,
            invalidateOnRefresh: true,
            onUpdate: (self) => updateActivation(self.progress, false),
            onRefresh: (self) => updateActivation(self.progress, true),
          },
        });

        items.forEach((item, i) => {
          if (i === 0) return;
          // Incoming panel rises over the previous one while the covered
          // panel's right column drifts up for depth.
          master.to(item, { yPercent: 0, duration: 1, ease: "none" }, i - 1);
          master.to(contents[i - 1], { yPercent: -100, duration: 1, ease: "none" }, i - 1);
        });

        // First panel reveals as the deck scrolls into view.
        ScrollTrigger.create({
          trigger: section,
          start: "top 75%",
          onEnter: () => setPlayed(0, true, false),
          onLeaveBack: () => setPlayed(0, false, false),
        });

        return () => {
          splits.forEach((s) => s.revert());
          splits.length = 0;
        };
      });
    },
    { scope: sectionRef, dependencies: [services, transitionLength], revertOnUpdate: true }
  );

  return (
    <section className={styles.deck} ref={sectionRef}>
      <div className={styles.list}>
        {services.map((service, i) => {
          const captionLines = String(service.caption ?? "").split("\n");
          return (
            <article className={styles.item} data-item key={service.title ?? i}>
              <div className={styles.seam} aria-hidden="true">
                <span className={styles.seamLine} data-seam-line />
                <svg
                  className={styles.plus}
                  data-plus
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  fill="none"
                >
                  <line x1="6.5" y1="0" x2="6.5" y2="13" />
                  <line x1="0" y1="6.5" x2="13" y2="6.5" />
                </svg>
              </div>
              <div className={styles.split}>
                <div
                  className={`${styles.imageBlock} ${service.dark ? styles.dark : ""}`}
                >
                  <span className={styles.caption}>
                    {captionLines.map((line, li) => (
                      <span className={styles.captionLine} data-caption-line key={li}>
                        {line}
                      </span>
                    ))}
                  </span>
                  {service.image?.src && (
                    <img
                      className={styles.image}
                      src={service.image.src}
                      alt={service.image.alt ?? service.title}
                      loading="lazy"
                    />
                  )}
                  {service.image?.srcMobile && (
                    <img
                      className={styles.imageMobile}
                      src={service.image.srcMobile}
                      alt={service.image.alt ?? service.title}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className={styles.contentBlock} data-content>
                  <div className={styles.contentInner}>
                    <div className={styles.titleBlock}>
                      <span className={styles.count}>
                        [ {String(i + 1).padStart(2, "0")} /{" "}
                        {String(services.length).padStart(2, "0")} ]
                      </span>
                      <h2 className={styles.title}>{service.title}</h2>
                      <p className={styles.description}>{service.description}</p>
                    </div>
                    <div className={styles.info}>
                      <span className={styles.infoLabel}>Core capabilities</span>
                      <ul className={styles.infoList}>
                        {service.capabilities.map((capability, j) => (
                          <li className={styles.infoItem} key={capability}>
                            <p>{capability}</p>
                            {j < service.capabilities.length - 1 && (
                              <span className={styles.rule} data-rule />
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
