import Section from "@/components/Section";
import Container from "@/components/Container";
import Media from "@/components/Media";
import Eyebrow from "@/components/Eyebrow";
import ContactForm from "@/components/ContactForm";
import styles from "./FormSection.module.css";

export default function FormSection({
  eyebrow,
  title,
  text,
  media,
  formHeading,
}) {
  return (
    <Section className={styles.section}>
      <Container>
        <div className={styles.grid}>
          <div className={styles.intro}>
            {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
            {title && <h2 className={styles.title}>{title}</h2>}
            {text && <p className={styles.text}>{text}</p>}
            {media && (
              <div className={styles.figure}>
                <Media
                  type="image"
                  src={media.src}
                  alt={media.alt || ""}
                  fill
                  aspectRatio="1/1"
                />
              </div>
            )}
          </div>

          <div className={styles.formWrap}>
            <ContactForm heading={formHeading} showAltLink={false} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
