"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CountUp.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

// Animates the numeric part of a stat string (e.g. "1.2M+", "920+ hrs",
// "+2.4M") from 0 -> target on scroll-into-view, holding any prefix/suffix
// static. Uses the project's GSAP/ScrollTrigger system so it fires in sync
// with useReveal (top 85%, once).
// Values without a number render unchanged; reduced motion stays static.
export default function CountUp({ value, className = "", duration = 2 }) {
  const ref = useRef(null);
  const raw = String(value);
  // Optional non-numeric prefix + numeric token (with optional thousands
  // commas + decimals) + suffix.
  const match = raw.match(/^(\D*)(\d[\d,]*(?:\.\d+)?)(.*)$/);

  useGSAP(
    () => {
      const node = ref.current;
      if (!node || !match) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const [, prefix, numStr, suffix] = match;
      const target = parseFloat(numStr.replace(/,/g, ""));
      const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
      const counter = { v: 0 };

      // Snap to the starting value before the tween fires on scroll.
      node.textContent = `${prefix}${(0).toFixed(decimals)}${suffix}`;

      gsap.to(counter, {
        v: target,
        duration,
        ease: "power3.out",
        onUpdate: () => {
          node.textContent = `${prefix}${counter.v.toFixed(decimals)}${suffix}`;
        },
        scrollTrigger: { trigger: node, start: "top 85%", once: true },
      });
    },
    { scope: ref, dependencies: [raw] }
  );

  return (
    <span ref={ref} className={`${styles.num} ${className}`}>
      {raw}
    </span>
  );
}
