"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./ThemeFadeZone.module.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/* ── Single scroll-driven page theme fade ───────────────────────
   Same mechanic as ScrollThemeFade, but for the REAL page. Its
   content doesn't use currentColor — every section paints from the
   semantic tokens in tokens.css that flip via .theme-light /
   .theme-dark. So instead of tweening one color, this wrapper OWNS
   the token set (rendered inline in the LIGHT state, SSR-safe) and
   tweens the whole set light↔dark as the <ThemeBreak/> marker
   crosses the viewport-center line. Every descendant reading those
   tokens fades in lockstep. One boundary, one transition.

   TOKENS mirrors the .theme-light / .theme-dark blocks in tokens.css.
   Colors are literal (GSAP tweens values, not CSS var names) and use
   rgba() for the translucent strokes so gsap.utils.interpolate can
   parse them. */

const TOKENS = [
  ["--color-bg-primary", "#ffffff", "#000000"],
  ["--color-bg-secondary", "#f3f2ee", "#20231f"],
  ["--color-text-primary", "#000000", "#ffffff"],
  ["--color-text-secondary", "#484b47", "#b3b3b3"],
  ["--color-accent", "#000000", "#ffffff"],
  ["--color-stroke", "#000000", "#ffffff"],
  ["--color-stroke-muted", "rgba(0,0,0,0.1)", "rgba(255,255,255,0.1)"],
  ["--color-stroke-light", "rgba(0,0,0,0.05)", "rgba(255,255,255,0.15)"],
];

// Inline LIGHT state for the initial render — no flash before GSAP mounts.
const lightVars = TOKENS.reduce((acc, [name, light]) => {
  acc[name] = light;
  return acc;
}, {});

// Zero-height boundary marker. Drop one between the light and dark groups;
// the fade fires when it crosses the viewport center.
export function ThemeBreak() {
  return <div data-theme-break aria-hidden="true" className={styles.break} />;
}

export default function ThemeFadeZone({
  children,
  duration = 0.7,
  ease = "power2.inOut",
}) {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const marker = root.querySelector("[data-theme-break]");
      if (!marker) return;

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // One interpolator per token; proxy.p drives all of them (0 = light,
      // 1 = dark). Interpolating in onUpdate is more reliable than tweening
      // CSS custom properties directly, which GSAP won't color-parse.
      const lerps = TOKENS.map(([name, light, dark]) => [
        name,
        gsap.utils.interpolate(light, dark),
      ]);
      // Film grain (globals.css body::before) lives outside the stage's token
      // scope, so drive its color on <body> directly: black over the light
      // phase (textured white, matching static light routes) → white over dark.
      const grainLerp = gsap.utils.interpolate("#000000", "#ffffff");
      const proxy = { p: 0 };

      const paint = () => {
        lerps.forEach(([name, lerp]) =>
          root.style.setProperty(name, lerp(proxy.p))
        );
        document.body.style.setProperty("--grain-color", grainLerp(proxy.p));
      };

      // Animated transition (crossing the boundary while scrolling).
      const fadeTo = (target) =>
        gsap.to(proxy, {
          p: target,
          duration: reduced ? 0 : duration,
          ease,
          overwrite: "auto",
          onUpdate: paint,
        });

      // Instant sync — no tween. Used on load/resize so a reload while already
      // scrolled past the boundary lands in the correct theme instead of
      // staying stuck in the light default.
      const snapTo = (target) => {
        gsap.killTweensOf(proxy);
        proxy.p = target;
        paint();
      };

      ScrollTrigger.create({
        trigger: marker,
        start: "top 50%",
        onEnter: () => fadeTo(1),
        onEnterBack: () => fadeTo(0),
        onRefresh: (self) => snapTo(self.scroll() >= self.start ? 1 : 0),
      });

      // Drop the body-level grain override on unmount/route change so other
      // routes fall back to their static grain color.
      return () => document.body.style.removeProperty("--grain-color");
    },
    { scope: rootRef }
  );

  return (
    <div ref={rootRef} className={styles.stage} style={lightVars}>
      {children}
    </div>
  );
}
