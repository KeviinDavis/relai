"use client";

import { usePathname } from "next/navigation";
import styles from "./RouteTheme.module.css";

// Routes that render on the LIGHT (white) theme. The shared chrome wrapped here
// (<main> + Footer) gets the global .theme-light class on these routes, flipping
// the semantic token set so the whole page reads dark-on-white. Every other
// route keeps the dark default. Mirrors the theme-scoping note in tokens.css
// ("light on About/Book-a-Demo"); add a route here to make it white.
const LIGHT_ROUTES = new Set(["/about", "/book-a-demo", "/product"]);

// Prefix-matched light routes — every article under /news/ is a white,
// editorial page (Hero + NewsArticleContent).
const LIGHT_PREFIXES = ["/news/"];

export default function RouteTheme({ children }) {
  const pathname = usePathname();
  const light =
    LIGHT_ROUTES.has(pathname) ||
    LIGHT_PREFIXES.some((prefix) => pathname.startsWith(prefix));

  return (
    <div className={`${styles.region} ${light ? `${styles.light} theme-light` : ""}`}>
      {children}
    </div>
  );
}
