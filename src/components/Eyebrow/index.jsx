import styles from "./Eyebrow.module.css";

// The source's "SectionTag" — a small mono label inside a rounded border.
// variant: "default" | "dark" (on dark bg) | "active" (filled black)
export default function Eyebrow({ children, as = "span", variant = "default", className = "" }) {
  const Tag = as;
  return (
    <Tag className={`${styles.capsule} ${styles[variant]} ${className}`}>
      {children}
    </Tag>
  );
}
