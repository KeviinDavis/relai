"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-triggered reveal. Wraps any content and fades/translates it in once
 * as it enters the viewport. Set `stagger` to animate direct children in
 * sequence. No-ops under prefers-reduced-motion.
 */
export default function Reveal({
  children,
  as: Tag = "div",
  y = 32,
  delay = 0,
  duration = 0.9,
  stagger = 0,
  className = "",
}) {
  const ref = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const targets = stagger ? ref.current.children : ref.current;
      gsap.from(targets, {
        opacity: 0,
        y,
        duration,
        delay,
        stagger: stagger || 0,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref }
  );

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
