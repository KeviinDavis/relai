"use client";

import styles from "./MenuToggle.module.css";

/**
 * Standalone toggle for MobileMenu — intentionally decoupled so the parent can
 * place it anywhere (header, bar, floating). It only flips the parent's `open`
 * state; it carries no positioning of its own.
 *
 * Two stacked bars (a hamburger) that morph into an X while the menu is open,
 * so the same control reads as both "open" and "close".
 */
export default function MenuToggle({ open, onToggle }) {
  return (
    <button
      type="button"
      className={`${styles.toggle} ${open ? styles.toggleOpen : ""}`}
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onToggle}
    >
      <span className={styles.bars} aria-hidden="true">
        <span className={styles.bar} />
        <span className={styles.bar} />
      </span>
    </button>
  );
}
