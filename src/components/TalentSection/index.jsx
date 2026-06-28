import Section from "@/components/Section";
import Container from "@/components/Container";
import Button from "@/components/Button";
import styles from "./TalentSection.module.css";

const pad = (n) => String(n).padStart(2, "0");

// Light "Stay On Our Radar" band: a talent-network CTA, then a roles band with a
// numbered list of open role areas.
export default function TalentSection({
  heading,
  text,
  cta,
  rolesHeading,
  rolesText,
  rolesCta,
  roles = [],
}) {
  return (
    <Section variant="default" className={`${styles.root} ${styles.theme}`}>
      <Container>
        <div className={styles.band}>
          <h2 className={styles.heading}>{heading}</h2>
          <div className={styles.body}>
            <div className={styles.row}>
              {text && <p className={styles.text}>{text}</p>}
              {cta && (
                <Button href={cta.href} variant={cta.variant || "secondary"}>
                  {cta.label}
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className={styles.band}>
          <h3 className={styles.subheading}>{rolesHeading}</h3>
          <div className={styles.body}>
            <div className={styles.row}>
              {rolesText && <p className={styles.text}>{rolesText}</p>}
              {rolesCta && (
                <Button href={rolesCta.href} variant={rolesCta.variant || "secondary"}>
                  {rolesCta.label}
                </Button>
              )}
            </div>

            {roles.length > 0 && (
              <ol className={styles.roles}>
                {roles.map((role, i) => (
                  <li key={role} className={styles.role}>
                    <span className={styles.roleNum}>{pad(i + 1)}</span>
                    <span className={styles.roleName}>{role}</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </div>
      </Container>
    </Section>
  );
}
