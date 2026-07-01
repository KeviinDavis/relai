"use client";

import { useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Section from "@/components/Section";
import Container from "@/components/Container";
import Media from "@/components/Media";
import { useReveal } from "@/components/Reveal/useReveal";
import styles from "./News.module.css";

gsap.registerPlugin(ScrollTrigger);

// Newsroom band mirroring the source's NewsFeaturedSlice: a section header,
// one highlighted article (text + large 3:2 image), then a list of compact
// rows (date + title + small thumbnail). Light cream surface via theme-light.
function ReadMore() {
  return (
    <span className={styles.readMore}>
      <span className={styles.readMoreLabel}>Read more</span>
      <span className={styles.arrow} aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none">
          <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      </span>
    </span>
  );
}

export default function News({ content = {}, standalone = false }) {
  const { heading = "News", featured, items = [] } = content;
  const scope = useRef(null);

  // Shared section reveals: heading wipe, featured image clip, row fade-rise.
  useReveal(scope, [items.length]);

  // Per-row top rule "draws" in (scaleX 0 → 1), mirroring the source. Kept
  // local because useReveal has no border primitive. Defaults visible in CSS,
  // so reduced-motion (where this no-ops) still shows the rules.
  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      root.querySelectorAll("[data-reveal-border]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleX: 0 },
          {
            scaleX: 1,
            duration: 1.6,
            ease: "expo.out",
            transformOrigin: "left center",
            scrollTrigger: { trigger: el, start: "top 92%", once: true },
          }
        );
      });
    },
    { scope, dependencies: [items.length] }
  );

  return (
    <Section
      variant="default"
      className={`${styles.root} ${standalone ? styles.standalone : ""} theme-dark`}
    >
      <Container>
        <div ref={scope}>
          <div className={styles.top}>
            <h2 className={styles.heading} data-reveal-mask>
              {heading}
            </h2>
            <div className={styles.rule} />
          </div>

          {featured && (
            <Link href={featured.href} className={styles.featured}>
              <div className={styles.featuredText} data-reveal>
                <p className={styles.date}>{featured.date}</p>
                <h3 className={styles.featuredTitle}>{featured.title}</h3>
                <p className={styles.description}>{featured.description}</p>
                <ReadMore />
              </div>
              <div className={styles.featuredImage} data-reveal-image>
                <Media
                  type="image"
                  src={featured.image.src}
                  alt={featured.image.alt}
                  fill
                  aspectRatio={featured.image.aspectRatio}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
            </Link>
          )}

          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.href} className={styles.item} data-reveal>
                <Link href={item.href} className={styles.itemLink}>
                  <span
                    className={styles.itemBorder}
                    data-reveal-border
                    aria-hidden="true"
                  />
                  <div className={styles.itemLeft}>
                    <p className={styles.date}>{item.date}</p>
                    <h4 className={styles.itemTitle}>{item.title}</h4>
                    <ReadMore />
                  </div>
                  <div className={styles.itemRight}>
                    <div className={styles.thumb}>
                      <Media
                        type="image"
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        aspectRatio={item.image.aspectRatio}
                        sizes="(min-width: 1024px) 15vw, 30vw"
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
