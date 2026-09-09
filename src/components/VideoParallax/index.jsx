"use client";

import { useEffect, useRef, useState } from "react";
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
//
// The clip lives below the fold, so its bytes are deferred: nothing loads until
// the section nears the viewport (IntersectionObserver), and reduced-motion
// users never download it at all — the poster stands in.
export default function VideoParallax({
  src = "/RelaiImages/Relai.mp4",
  poster = "/RelaiImages/parallax-poster.avif",
}) {
  const scope = useRef(null);
  const videoRef = useRef(null);
  const [load, setLoad] = useState(false);

  // Defer the download until the section is within ~one viewport of entering,
  // and only for motion-OK users. Once armed, load() + play() the freshly
  // mounted <source> children.
  useEffect(() => {
    const section = scope.current;
    if (!section) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "100% 0px" }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!load || !video) return;
    video.load();
    video.play().catch(() => {});
  }, [load]);

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
            ref={videoRef}
            className={styles.video}
            data-parallax-video
            poster={poster}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
          >
            {load && <source src={src} type="video/mp4" />}
          </video>
        </div>
      </div>
    </div>
  );
}
