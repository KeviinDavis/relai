import Link from "next/link";
import styles from "./Button.module.css";

export default function Button({
  children,
  variant = "primary",
  href,
  className = "",
  ...props
}) {
  const classes = `${styles.button} ${styles[variant]} ${className}`;

  // No href → a real <button>.
  if (!href) {
    return (
      <button className={classes} {...props}>
        {children}
      </button>
    );
  }

  // Internal href → Next <Link> for client-side routing + prefetch.
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  // External href → plain anchor.
  return (
    <a href={href} className={classes} {...props}>
      {children}
    </a>
  );
}
