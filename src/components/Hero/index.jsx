"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import styles from "./Hero.module.css";

gsap.registerPlugin(useGSAP);

export default function Hero({ content = {} }) {
  const {
    eyebrow,
    title,
    text,
    actions = [],
    media,
    // Optional dark-hero anatomy — all opt-in.
    meta = [],                 // small label lines under the title
    tag,                       // code tag, e.g. "[ MISSION ]"
    scrollIndicator = false,   // down-arrow scroll cue, aligned to the tag row
    scrollTo = "#content",     // anchor the arrow jumps to
    mediaAspect,               // desktop media ratio override (e.g. "56.25%")
    tone = "light",            // "light" | "dark"
    animate = true,            // play the on-load entrance timeline
  } = content;
  const isDark = tone === "dark";
  const hasAside = Boolean(text || actions.length);
  const hasMeta = Boolean(meta.length || scrollIndicator);
  const figureStyle = mediaAspect ? { "--hero-media-pb-lg": mediaAspect } : undefined;

  const scope = useRef(null);

  useGSAP(
    () => {
      if (!animate) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const root = scope.current;
      const eyebrowEl = root.querySelector("." + styles.eyebrow);
      const tagEl = root.querySelector("[data-hero-tag]");
      const titleEl = root.querySelector("[data-hero-title]");
      const asideEl = root.querySelector("[data-hero-aside]");
      const metaItems = [...root.querySelectorAll("[data-hero-meta] > *")];
      const mediaEl = root.querySelector("[data-hero-media]");
      const supporting = [...metaItems, asideEl].filter(Boolean);

      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      if (eyebrowEl) tl.from(eyebrowEl, { y: 16, opacity: 0, duration: 0.6 }, 0);
      if (tagEl) tl.from(tagEl, { y: 16, opacity: 0, duration: 0.6 }, 0);
      if (titleEl)
        tl.fromTo(
          titleEl,
          { yPercent: 35, opacity: 0, clipPath: "inset(0 0 100% 0)" },
          {
            yPercent: 0,
            opacity: 1,
            clipPath: "inset(0 0 0% 0)",
            duration: 1.1,
            // line-height:1 lets descenders overflow the box; drop the clip at
            // rest so the inset() wipe doesn't keep slicing the glyphs.
            clearProps: "clipPath",
          },
          0.1
        );
      if (supporting.length)
        tl.from(supporting, { y: 20, opacity: 0, duration: 0.8, stagger: 0.12 }, 0.55);
      if (mediaEl)
        tl.fromTo(
          mediaEl,
          { clipPath: "inset(0 0 100% 0)", scale: 1.06 },
          { clipPath: "inset(0 0 0% 0)", scale: 1, duration: 1.2 },
          0.35
        );
    },
    { scope, dependencies: [animate] }
  );

  return (
    <section ref={scope} className={`${styles.hero} ${isDark ? styles.dark : ""}`}>
      <div className={`${styles.header} ${hasAside ? styles.split : ""}`}>
        <div className={styles.headingCol}>
          {eyebrow && (
            <Eyebrow className={styles.eyebrow} variant={isDark ? "dark" : "default"}>
              {eyebrow}
            </Eyebrow>
          )}
          {tag && (
            <span className={styles.tag} data-hero-tag>
              {tag}
            </span>
          )}
          <h1 className={styles.title} data-hero-title>{title}</h1>

          {hasMeta && (
            <div className={styles.meta} data-hero-meta>
              {meta.length > 0 && (
                <p className={styles.metaLines}>
                  {meta.map((line) => (
                    <span key={line} className={styles.metaLine}>
                      {line}
                    </span>
                  ))}
                </p>
              )}

              {scrollIndicator && (
                <div className={styles.metaRow}>
                  <a
                    href={scrollTo}
                    className={styles.scroll}
                    aria-label="Scroll to content"
                  >
                    <svg
                      className={styles.scrollIcon}
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M12 4v16M5 13l7 7 7-7"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        {hasAside && (
          <div className={styles.aside} data-hero-aside>
            {text && <p className={styles.excerpt}>{text}</p>}
            {actions.length > 0 && (
              <div className={styles.ctas}>
                {actions.map((a) => (
                  <Button key={a.label} href={a.href} variant={a.variant || "primary"}>
                    {a.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {media && (
        <figure className={styles.mediaContainer} style={figureStyle}>
          <div className={styles.media} data-hero-media>
            {media.type === "video" ? (
              <video
                className={styles.video}
                src={media.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
            ) : (
              <Image
                src={media.src}
                alt={media.alt || ""}
                fill
                priority
                sizes="100vw"
              />
            )}
          </div>
        </figure>
      )}
    </section>
  );
}
