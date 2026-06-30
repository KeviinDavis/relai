"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/Eyebrow";
import styles from "./ProcessList.module.css";

gsap.registerPlugin(ScrollTrigger);

const pad = (n) => String(n + 1).padStart(2, "0");

// Pinned, scroll-scrubbed process list (good-fella "animatedListSection" mechanics):
// the whole section pins for a tall track; scroll progress drives the active row,
// a gliding/spinning marker square, and a vertical image filmstrip. Mono accent only
// (relai has no brand color). Mobile degrades to a plain stacked list.
export default function ProcessList({ content = {} }) {
  const { capsule, text, steps = [] } = content;
  const [active, setActive] = useState(0);

  const scope = useRef(null);
  const trackRef = useRef(null);
  const rowsRef = useRef([]);
  const squareRef = useRef(null);

  useGSAP(
    () => {
      if (steps.length < 2) return;
      const mm = gsap.matchMedia();

      // Desktop only: pin is CSS sticky; this trigger just reads scroll progress.
      mm.add("(min-width: 1024px)", () => {
        const N = steps.length;
        const square = squareRef.current;
        let centers = [];

        const measure = () => {
          centers = rowsRef.current.map((el) =>
            el ? el.offsetTop + el.offsetHeight / 2 : 0
          );
        };

        const place = (p) => {
          const t = p * (N - 1);
          if (!square || !centers.length) return;
          const lo = Math.floor(t);
          const hi = Math.min(N - 1, lo + 1);
          const y = centers[lo] + (centers[hi] - centers[lo]) * (t - lo);
          square.style.transform = `translateY(${y - square.offsetHeight / 2}px) rotate(${p * 900}deg)`;
        };

        measure();
        place(0);

        const lastActive = { i: -1 };
        const st = ScrollTrigger.create({
          trigger: trackRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          onRefresh: () => {
            measure();
            place(0);
          },
          onUpdate: (self) => {
            const p = self.progress;
            const i = Math.max(0, Math.min(N - 1, Math.round(p * (N - 1))));
            if (i !== lastActive.i) {
              lastActive.i = i;
              setActive(i);
            }
            place(p);
          },
        });

        return () => st.kill();
      });

      return () => mm.revert();
    },
    { scope, dependencies: [steps.length] }
  );

  return (
    <section className={styles.section} id="product" ref={scope}>
      {/* Desktop — pinned, scroll-scrubbed sequence */}
      <div
        className={styles.track}
        ref={trackRef}
        style={{ "--steps": steps.length }}
      >
        <div className={styles.pinned}>
          <div className={styles.inner}>
            <div className={styles.header}>
              <Eyebrow>{capsule}</Eyebrow>
              <p className={styles.headerText}>{text}</p>
            </div>

            <div className={styles.split}>
              <ol className={styles.steps}>
                <span className={styles.marker} ref={squareRef} aria-hidden="true" />
                {steps.map((step, i) => (
                  <li
                    key={step.capsule}
                    ref={(el) => (rowsRef.current[i] = el)}
                    className={styles.row}
                    data-active={i === active}
                  >
                    <span className={styles.num}>{pad(i)}</span>
                    <div className={styles.rowBody}>
                      <h3 className={styles.rowTitle}>{step.capsule}</h3>
                      <p className={styles.rowText}>{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <div className={styles.media}>
                <div
                  className={styles.filmstrip}
                  style={{ transform: `translateY(calc(${active} * -100%))` }}
                >
                  {steps.map((step, i) => (
                    <div className={styles.frame} key={step.capsule}>
                      <Image
                        src={step.image}
                        alt={step.alt || step.capsule}
                        fill
                        sizes="(max-width: 1024px) 90vw, 40vw"
                        className={styles.frameImg}
                      />
                      <span className={styles.tint} aria-hidden="true" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile — plain stacked list (no pin, no scrub) */}
      <div className={styles.mobile}>
        <div className={styles.header}>
          <Eyebrow>{capsule}</Eyebrow>
          <p className={styles.headerText}>{text}</p>
        </div>
        <ol className={styles.mobileList}>
          {steps.map((step, i) => (
            <li className={styles.mobileItem} key={step.capsule}>
              <div className={styles.mobileRow}>
                <span className={styles.mobileLead}>
                  <span className={styles.mobileMarker} aria-hidden="true" />
                  <span className={styles.num}>{pad(i)}</span>
                </span>
                <div className={styles.rowBody}>
                  <h3 className={styles.rowTitle}>{step.capsule}</h3>
                  <p className={styles.rowText}>{step.text}</p>
                </div>
              </div>
              <div className={styles.mobileMedia}>
                <Image
                  src={step.image}
                  alt={step.alt || step.capsule}
                  fill
                  sizes="90vw"
                  className={styles.frameImg}
                />
                <span className={styles.tint} aria-hidden="true" />
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
