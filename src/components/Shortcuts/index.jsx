import Link from "next/link";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import styles from "./Shortcuts.module.css";

export default function Shortcuts({ capsule, text, cards = [] }) {
  return (
    <section className={styles.section}>
      <div className={styles.intro}>
        <div className={styles.introTag}>
          <Eyebrow>{capsule}</Eyebrow>
        </div>
        <p className={styles.introText}>{text}</p>
      </div>

      <div className={styles.grid}>
        {cards.map((card) => (
          <article key={card.title} className={styles.card}>
            <Link href={card.href} className={styles.cardLink}>
              <div className={styles.figure}>
                <Image
                  src={card.image}
                  alt={card.alt || ""}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={styles.img}
                />
              </div>
              <div className={styles.data}>
                <Eyebrow>{card.title}</Eyebrow>
                <p className={styles.text}>{card.text}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
