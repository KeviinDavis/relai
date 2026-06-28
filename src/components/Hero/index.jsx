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
}) {
  const hasAside = Boolean(text || actions.length);

  return (
    <section className={styles.hero}>
      <div className={`${styles.header} ${hasAside ? styles.split : ""}`}>
        <div className={styles.headingCol}>
          {eyebrow && <Eyebrow className={styles.eyebrow}>{eyebrow}</Eyebrow>}
          <h1 className={styles.title}>{title}</h1>
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
        <figure className={styles.mediaContainer}>
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
