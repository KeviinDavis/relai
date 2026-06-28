"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Scroll-driven reveals for a section, mirroring the source's on-enter motion.
 * Tag elements within `scope` with data attributes; this wires the ScrollTriggers:
 *
 *   data-reveal               fade + rise on enter
 *   data-reveal-stagger       (on a parent) stagger its direct children's rise
 *   data-reveal-mask          heading wipe-up (clip-path) + rise
 *   data-reveal-image         media clip-reveal + slow scale settle
 *
 * No-op under prefers-reduced-motion. `once` so nothing re-hides on scroll-up.
 */
export function useReveal(scope, deps = []) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const trig = (el) => ({ trigger: el, start: "top 85%", once: true });

      root.querySelectorAll("[data-reveal-mask]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, yPercent: 18, clipPath: "inset(0 0 100% 0)" },
          {
            opacity: 1,
            yPercent: 0,
            clipPath: "inset(0 0 0% 0)",
            duration: 1,
            ease: "expo.out",
            scrollTrigger: { ...trig(el), start: "top 88%" },
          }
        );
      });

      root.querySelectorAll("[data-reveal-image]").forEach((el) => {
        gsap.fromTo(
          el,
          { clipPath: "inset(0 0 100% 0)", scale: 1.06 },
          {
            clipPath: "inset(0 0 0% 0)",
            scale: 1,
            duration: 1.1,
            ease: "expo.out",
            transformOrigin: "center",
            scrollTrigger: trig(el),
          }
        );
      });

      root.querySelectorAll("[data-reveal]").forEach((el) => {
        const stagger = el.hasAttribute("data-reveal-stagger");
        gsap.from(stagger ? el.children : el, {
          opacity: 0,
          y: 28,
          duration: 0.9,
          ease: "power3.out",
          stagger: stagger ? 0.09 : 0,
          scrollTrigger: trig(el),
        });
      });
    },
    { scope, dependencies: deps }
  );
}
