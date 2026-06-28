"use client";

import { useRef } from "react";
import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import { useReveal } from "@/components/Reveal/useReveal";
import styles from "./Explore.module.css";

// Explore band: heading + QR (desktop) on the left, isometric site map on the right.
// On mobile the QR is replaced by a tappable "Explore" link below the map.
export default function Explore({
  heading,
  qrLabel = "Scan QR Code to explore",
  qr,
  map,
  href = "#",
  linkLabel = "Explore",
}) {
  const scope = useRef(null);
  useReveal(scope);

  return (
    <Section variant="default" className={`${styles.root} ${styles.theme}`}>
      <Container>
        <div className={styles.grid} ref={scope}>
          <h2 className={styles.heading} data-reveal-mask>
            {heading}
          </h2>

          <figure className={styles.map} data-reveal-image>
            <Image
              src={map.src}
              alt={map.alt || ""}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className={styles.mapImg}
            />
          </figure>

          <a className={styles.exploreLink} href={href} data-reveal>
            {linkLabel}
            <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>

          {qr && (
            <div className={styles.qrBlock} data-reveal>
              <span className={styles.qrLabel}>{qrLabel}</span>
              <span className={styles.qr}>
                <Image
                  src={qr}
                  alt="QR code linking to the interactive network experience"
                  width={104}
                  height={104}
                  unoptimized
                />
              </span>
            </div>
          )}
        </div>
      </Container>
    </Section>
  );
}
