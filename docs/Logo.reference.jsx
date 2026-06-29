// Logo.jsx — Relai logo system
// The mark is inline SVG; the wordmark is LIVE TEXT (no baked font, crisp at any size,
// accessible, and recolorable). Everything inherits `currentColor`, so set the color on
// a parent (e.g. color: var(--color-fg)) and it themes itself across black/white pages.

export function RelaiMark({ size = 28, className = "", title = "Relai" }) {
  // intrinsic artwork is ~70x70; viewBox padding accounts for stroke
  return (
    <svg
      role="img"
      aria-label={title}
      width={size}
      height={size}
      viewBox="-4 -4 78 78"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinejoin="miter"
      strokeLinecap="square"
      className={className}
    >
      <rect x="0" y="0" width="56" height="18" fill="none" />
      <rect x="14" y="26" width="56" height="18" fill="currentColor" />
      <rect x="0" y="52" width="56" height="18" fill="none" />
    </svg>
  );
}

export function RelaiLogo({ markSize = 26, className = "" }) {
  return (
    <span
      className={className}
      style={{ display: "inline-flex", alignItems: "center", gap: 12, color: "inherit" }}
    >
      <RelaiMark size={markSize} title="" />
      <span
        style={{
          fontFamily: "Helvetica, Arial, sans-serif",
          fontWeight: 700,
          fontSize: markSize * 0.72,   // wordmark a touch smaller than the mark
          letterSpacing: "0.06em",
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        Relai
      </span>
    </span>
  );
}

// Usage:
//   <a href="/" aria-label="Relai — home" style={{ color: "var(--color-fg)" }}>
//     <RelaiLogo markSize={28} />
//   </a>
//
// Mark only (favicon-in-app, loading states, compact spots):
//   <RelaiMark size={20} />
