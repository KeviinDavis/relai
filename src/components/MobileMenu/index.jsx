"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import styles from "./MobileMenu.module.css";

gsap.registerPlugin(useGSAP);

// Two-digit badge formatting for the optional `count` (e.g. 9 -> "09").
const twoDigit = (n) => String(n).padStart(2, "0");

/**
 * Standalone, parent-controlled mobile menu overlay.
 *
 * Renders the full-screen panel only — the toggle button lives separately
 * (see components/MenuToggle) so the parent can place it anywhere. The parent
 * owns `open` and is expected to mount this on mobile breakpoints only, so no
 * matchMedia "is mobile" guard is needed here; the panel relies on mount /
 * unmount.
 *
 * Motion: the panel unrolls downward from the nav (clip-path grows from the
 * top) and rolls back up on close; the links + tagline reveal with a vertical
 * clip stagger (drop in from the top of their clip). Under prefers-reduced-motion the panel still opens/closes — just
 * instantly, since the menu is functional rather than decorative.
 */
export default function MobileMenu({ open, onClose, links = [], tagline }) {
  const scope = useRef(null);
  const bgRef = useRef(null);
  const linkWrapRefs = useRef([]);
  const taglineRef = useRef(null);
  const hasBeenOpened = useRef(false);
  const menuTl = useRef(null);

  // Drive the open / close timelines off the `open` dependency. useGSAP is the
  // project's gsap.context wrapper (scoping + cleanup on unmount); by default it
  // does NOT revert between dependency changes, so each run just kills the
  // in-flight timeline and builds the next one.
  useGSAP(
    () => {
      const bg = bgRef.current;
      if (!bg) return;

      const anchors = linkWrapRefs.current
        .map((wrap) => wrap && wrap.querySelector("a"))
        .filter(Boolean);
      const tagP = taglineRef.current
        ? taglineRef.current.querySelector("p")
        : null;
      const reveals = [...anchors, tagP].filter(Boolean);

      const reduce = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      // Never leave a half-played timeline running when state flips.
      if (menuTl.current) menuTl.current.kill();

      if (open) {
        hasBeenOpened.current = true;

        if (reduce) {
          gsap.set(bg, { clipPath: "inset(0% 0% 0% 0%)" });
          gsap.set(reveals, { visibility: "visible", yPercent: 0 });
          return;
        }

        // Park the reveals BEFORE the timeline renders — a synchronous gsap.set
        // (applied in this pre-paint layout effect) rather than a deferred
        // tl.set(), so the link text never paints at its resting position for a
        // frame before the panel unrolls. That one-frame flash is the bug.
        gsap.set(anchors, { visibility: "visible", yPercent: -110 });
        if (tagP) gsap.set(tagP, { visibility: "visible", yPercent: -110 });

        const tl = gsap.timeline();
        menuTl.current = tl;
        // Panel unrolls downward from the nav (top), growing to full height.
        tl.to(
          bg,
          { clipPath: "inset(0% 0% 0% 0%)", duration: 0.55, ease: "power3.inOut" },
          0
        );
        // Links + tagline drop into their clip once the panel is moving.
        tl.to(
          anchors,
          { yPercent: 0, stagger: 0.03, duration: 0.55, ease: "power3.inOut" },
          0.25
        );
        if (tagP)
          tl.to(
            tagP,
            { yPercent: 0, duration: 0.55, ease: "power3.inOut" },
            0.25
          );
        return;
      }

      // Closing — never fire on the first mount (panel is already off-screen).
      if (!hasBeenOpened.current) return;

      if (reduce) {
        gsap.set(bg, { clipPath: "inset(0% 0% 100% 0%)" });
        gsap.set(reveals, { visibility: "hidden" });
        return;
      }

      const tl = gsap.timeline();
      menuTl.current = tl;
      if (tagP) tl.to(tagP, { yPercent: -110, duration: 0.3, ease: "power2.in" });
      tl.to(
        anchors,
        { yPercent: -110, stagger: 0.02, duration: 0.3, ease: "power2.in" },
        "-=0.2"
      );
      // Panel rolls back up into the nav.
      tl.to(
        bg,
        { clipPath: "inset(0% 0% 100% 0%)", duration: 0.5, ease: "power3.inOut" },
        "-=0.15"
      );
      tl.set(anchors, { visibility: "hidden" });
      if (tagP) tl.set(tagP, { visibility: "hidden" });
    },
    { scope, dependencies: [open] }
  );

  // Body scroll lock + Escape-to-close while open (mirrors ContactModal).
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <nav
      ref={scope}
      aria-label="Primary"
      aria-hidden={!open}
      className={`${styles.menuWrap} ${open ? styles.menuWrapOpen : ""}`}
    >
      <div ref={bgRef} className={styles.menuBg} />

      <ul className={styles.menuLinks}>
        {links.map((link, i) => (
          <li
            key={link.href}
            ref={(el) => {
              linkWrapRefs.current[i] = el;
            }}
            className={styles.linkWrap}
          >
            <Link href={link.href} className={styles.link} onClick={onClose}>
              <span className={styles.clip}>
                <span>{link.label}</span>
              </span>
              {link.count != null && (
                <span className={styles.count}>{twoDigit(link.count)}</span>
              )}
            </Link>
          </li>
        ))}
      </ul>

      {tagline && (
        <div ref={taglineRef} className={styles.tagline}>
          <p>{tagline}</p>
        </div>
      )}
    </nav>
  );
}
