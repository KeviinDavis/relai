import styles from "./Section.module.css";

export default function Section({
  children,
  className = "",
  variant = "default",
  id,
}) {
  return (
    <section id={id} className={`${styles.section} ${styles[variant]} ${className}`}>
      {children}
    </section>
  );
}