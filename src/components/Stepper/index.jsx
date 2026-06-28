"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Eyebrow from "@/components/Eyebrow";
import styles from "./Stepper.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function Stepper({ content = {} }) {
  const { capsule, text, steps = [] } = content;
  const [active, setActive] = useState(0);
  const scope = useRef(null);
  const scrollerRef = useRef(null);
  const blocksRef = useRef([]);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Desktop: blocks stack vertically; active syncs to vertical scroll.
      mm.add("(min-width: 1024px)", () => {
        const triggers = blocksRef.current.map((el, i) =>
          ScrollTrigger.create({
            trigger: el,
            start: "top 60%",
            end: "bottom 60%",
            onEnter: () => setActive(i),
            onEnterBack: () => setActive(i),
          })
        );
        return () => triggers.forEach((t) => t.kill());
      });

      // Mobile/tablet: blocks are a horizontal scroller; active syncs to scrollLeft.
      mm.add("(max-width: 1023px)", () => {
        const el = scrollerRef.current;
        if (!el) return;
        const onScroll = () => {
          const block = el.children[0];
          const stride = block ? block.offsetWidth : 1;
          const i = Math.round(el.scrollLeft / stride);
          setActive(Math.min(steps.length - 1, Math.max(0, i)));
        };
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
      });

      return () => mm.revert();
    },
    { scope, dependencies: [steps.length] }
  );

  const handleSelect = (i) => {
    setActive(i);
    const el = scrollerRef.current;
    if (el && window.matchMedia("(max-width: 1023px)").matches) {
      const stride = el.children[0] ? el.children[0].offsetWidth : 0;
      el.scrollTo({ left: i * stride, behavior: "smooth" });
    }
  };

  return (
    <section className={styles.section} id="product" ref={scope}>
      <div className={styles.header}>
        <Eyebrow>{capsule}</Eyebrow>
        <p className={styles.headerText}>{text}</p>
      </div>

      <div className={styles.grid}>
        <ul className={styles.blocks} ref={scrollerRef}>
          {steps.map((step, i) => (
            <li
              key={step.capsule}
              ref={(el) => (blocksRef.current[i] = el)}
              className={`${styles.block} ${i === active ? styles.active : ""}`}
              onClick={() => handleSelect(i)}
            >
              <div className={styles.blockTag}>
                <Eyebrow variant={i === active ? "active" : "default"}>
                  {step.capsule}
                </Eyebrow>
              </div>
              <p className={styles.blockText}>{step.text}</p>
            </li>
          ))}
        </ul>

        <div className={styles.sticky}>
          <div className={styles.card}>
            {steps.map((step, i) => (
              <div
                key={step.capsule}
                className={`${styles.slide} ${i === active ? styles.slideActive : ""}`}
                aria-hidden={i !== active}
              >
                <Image
                  src={step.image}
                  alt={step.alt || step.capsule}
                  fill
                  sizes="(max-width: 1024px) 90vw, 33vw"
                  className={styles.slideImg}
                />
              </div>
            ))}
            <div className={styles.cardOverlay}>
              <span className={styles.cardHeading}>{steps[active]?.capsule}</span>
              <span className={styles.cardCounter}>
                {active + 1}/{steps.length}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
