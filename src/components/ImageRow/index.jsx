import Image from "next/image";
import Section from "@/components/Section";
import Container from "@/components/Container";
import styles from "./ImageRow.module.css";

// A row of equal-weight images (two-up on desktop, stacked on mobile).
export default function ImageRow({ images = [] }) {
  return (
    <Section variant="default" className={`${styles.root} ${styles.theme}`}>
      <Container>
        <div className={styles.grid}>
          {images.map((img) => (
            <figure key={img.src} className={styles.figure}>
              <Image
                src={img.src}
                alt={img.alt || ""}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={styles.img}
              />
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
