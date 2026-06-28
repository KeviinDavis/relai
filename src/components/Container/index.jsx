import styles from "./Container.module.css";

// variant: "default" (1280) | "content" (1024) | "narrow" (832)
export default function Container({ children, variant = "default", className = "" }) {
  return (
    <div className={`${styles.container} ${styles[variant] || ""} ${className}`}>
      {children}
    </div>
  );
}
