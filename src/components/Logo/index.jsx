// Relai wordmark — placeholder text mark (Helvetica) until a real logo asset
// exists. Recolored via currentColor; sized by the `height` prop like the
// original, so existing nav/header usage is unaffected. See needs-real-asset.
export default function Logo({ className = "", height = 30 }) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 30"
      height={height}
      role="img"
      aria-label="Relai"
      fill="currentColor"
    >
      <text
        x="0"
        y="23"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontSize="27"
        fontWeight="700"
        letterSpacing="-0.5"
      >
        RELAI
      </text>
    </svg>
  );
}
