"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./VideoParallax.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Scroll-driven vertical parallax on a video. The video is taller than its
// section window; as the section travels through the viewport the video drifts
// vertically, so the section acts as a moving window onto it. Rebuilt on the
// project's GSAP + Lenis stack (see SmoothScroll), which keeps ScrollTrigger in
// sync with smooth scroll automatically.
export default function VideoParallax({ src = "/exampleimages/Relai.mp4" }) {
  const scope = useRef(null);

  useGSAP(
    () => {
      const section = scope.current;
      const video = section.querySelector("[data-parallax-video]");
      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (reduced) return;

      // Drift the oversized video layer ±16.66% of its height as the section
      // crosses the viewport. The scrub range (section top hits viewport bottom →
      // bottom clears viewport top) mirrors framer's offset ["start end","end start"].
      gsap.fromTo(
        video,
        { yPercent: -16.66 },
        {
          yPercent: 16.66,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    },
    { scope }
  );

  return (
    <div className={styles.wrapper}>
      <div ref={scope} className={styles.section}>
        <div className={styles.videoLayer}>
          <video
            className={styles.video}
            data-parallax-video
            src={src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  );
}
