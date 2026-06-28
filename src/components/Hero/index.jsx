import Image from "next/image";
import Button from "@/components/Button";
import Eyebrow from "@/components/Eyebrow";
import styles from "./Hero.module.css";

export default function Hero({
  eyebrow,
  title,
  text,
  actions = [],
  media,
  // Reference (Arsenal-1) anatomy — all opt-in, so existing pages are unaffected.
  meta = [],                 // small label lines under the title, e.g. ["Designed by Anduril", "Built in Ohio"]
  tag,                       // code tag, e.g. "[A-1]"
  scrollIndicator = false,   // down-arrow scroll cue, aligned to the tag row
  scrollTo = "#content",     // anchor the arrow jumps to
  mediaAspect,               // desktop media ratio override (e.g. "56.25%" for 16:9)
  tone = "light",            // "light" | "dark"
}) {
  const isDark = tone === "dark";
  const hasAside = Boolean(text || actions.length);
  const hasMeta = Boolean(meta.length || tag || scrollIndicator);
  const figureStyle = mediaAspect ? { "--hero-media-pb-lg": mediaAspect } : undefined;

  return (
    <section className={`${styles.hero} ${isDark ? styles.dark : ""}`}>
      <div className={`${styles.header} ${hasAside ? styles.split : ""}`}>
        <div className={styles.headingCol}>
          {eyebrow && (
            <Eyebrow className={styles.eyebrow} variant={isDark ? "dark" : "default"}>
              {eyebrow}
            </Eyebrow>
          )}
          <h1 className={styles.title}>{title}</h1>

          {hasMeta && (
            <div className={styles.meta}>
              {meta.length > 0 && (
                <p className={styles.metaLines}>
                  {meta.map((line) => (
                    <span key={line} className={styles.metaLine}>
                      {line}
                    </span>
                  ))}
                </p>
              )}

              {(tag || scrollIndicator) && (
                <div className={styles.metaRow}>
                  {tag && <span className={styles.tag}>{tag}</span>}
                  {scrollIndicator && (
                    <a
                      href={scrollTo}
                      className={styles.scroll}
                      aria-label="Scroll to content"
                    >
                      <svg
                        className={styles.scrollIcon}
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                      >
                        <path
                          d="M12 4v16M5 13l7 7 7-7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {hasAside && (
          <div className={styles.aside}>
            {text && <p className={styles.excerpt}>{text}</p>}
            {actions.length > 0 && (
              <div className={styles.ctas}>
                {actions.map((a) => (
                  <Button key={a.label} href={a.href} variant={a.variant || "primary"}>
                    {a.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {media && (
        <figure className={styles.mediaContainer} style={figureStyle}>
          <div className={styles.media}>
            {media.type === "video" ? (
              <video
                className={styles.video}
                src={media.src}
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-hidden="true"
              />
            ) : (
              <Image
                src={media.src}
                alt={media.alt || ""}
                fill
                priority
                sizes="100vw"
              />
            )}
          </div>
        </figure>
      )}
    </section>
  );
}
