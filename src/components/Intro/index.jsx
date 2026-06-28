import Link from "next/link";
import Eyebrow from "@/components/Eyebrow";
import styles from "./Intro.module.css";

export default function Intro({ excerpt, capsule, body, id, links = [] }) {
  return (
    <section className={styles.section} id={id}>
      <div className={styles.top}>
        <p className={styles.excerpt}>{excerpt}</p>
        {links.length > 0 && (
          <ul className={styles.links}>
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {body && (
        <div className={styles.main}>
          <div className={styles.tag}>
            <Eyebrow>{capsule}</Eyebrow>
          </div>
          <p className={styles.body}>{body}</p>
        </div>
      )}
    </section>
  );
}
