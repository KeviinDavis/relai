import Image from "next/image";
import Container from "@/components/Container";
import styles from "./LogoWall.module.css";

// Continuously scrolling logo strip. The track holds two identical halves
// so the -50% keyframe translate wraps seamlessly; the second half is
// aria-hidden. Each half repeats the list `repeat` times — a half narrower
// than the viewport exposes a blank region, so repeat must keep
// (logo count × repeat) wider than the widest masked area.
// `tone` puts the global theme class on the root (same mechanism as
// FluidCards / RouteTheme) so the section inverts via semantic tokens.
export default function LogoWall({ content = {}, tone = "light", bg = "solid" }) {
  const { logos = [], duration, pauseOnHover = false, repeat = 2 } = content;
  const themeClass =
    tone === "dark" ? "theme-dark" : tone === "inherit" ? "" : "theme-light";
  const bgClass = bg === "none" ? styles.bgNone : "";

  // Only the first pass of the visible half carries real alt text; every
  // repeated pass is presentational.
  const renderHalf = (isClone) =>
    Array.from({ length: repeat }, (_, pass) =>
      logos.map((logo) => {
        const decorative = isClone || pass > 0;
        return (
          <li
            key={`${pass}-${logo.src}`}
            className={styles.item}
            aria-hidden={!isClone && pass > 0 ? "true" : undefined}
          >
            <Image
              src={logo.src}
              alt={decorative ? "" : logo.alt || ""}
              width={logo.width}
              height={logo.height}
              className={styles.logo}
            />
          </li>
        );
      })
    );

  return (
    <section className={`${styles.root} ${themeClass} ${bgClass}`}>
      <Container>
        <div
          className={`${styles.viewport} ${pauseOnHover ? styles.pausable : ""}`}
          style={duration ? { "--lw-duration": `${duration}s` } : undefined}
        >
          <div className={styles.track}>
            <ul className={styles.group}>{renderHalf(false)}</ul>
            <ul className={styles.group} aria-hidden="true">
              {renderHalf(true)}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
