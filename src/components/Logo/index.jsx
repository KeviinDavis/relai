import styles from "./Logo.module.css";

// Relai logo lockup — the mark is INLINE SVG (recolorable via currentColor) and
// the wordmark is LIVE TEXT in the project font stack (never baked into an
// image, so it stays crisp and accessible). Both halves resolve from the
// wrapper's color, which reads the theme foreground token, so the lockup paints
// itself white-on-dark and dark-on-light automatically.
//
// API is unchanged from the placeholder it replaces: sized by `height` (the
// mark's height in px); the wordmark scales with it. The single dynamic value
// is passed as a CSS custom property — all styling lives in the module.
export default function Logo({ className = "", height = 28 }) {
  return (
    <span
      className={`${styles.logo} ${className}`.trim()}
      style={{ "--logo-height": `${height / 16}rem` }}
    >
      <svg
        className={styles.mark}
        viewBox="-4 -4 78 78"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinejoin="miter"
        strokeLinecap="square"
        aria-hidden="true"
        focusable="false"
      >
        <rect x="0" y="0" width="56" height="18" fill="none" />
        <rect x="14" y="26" width="56" height="18" fill="currentColor" />
        <rect x="0" y="52" width="56" height="18" fill="none" />
      </svg>
      <span className={styles.word}>Relai</span>
    </span>
  );
}
