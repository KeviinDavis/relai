"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import ContactModal from "@/components/ContactModal";
import Logo from "@/components/Logo";
import { footer, social, nav } from "@/content/site";
import styles from "./Footer.module.css";

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.intro}>
          <div className={styles.introTag}>
            <Eyebrow variant="dark">{footer.eyebrow}</Eyebrow>
          </div>
          <div className={styles.introBody}>
            <h2 className={styles.heading}>{footer.heading}</h2>
            <p className={styles.subheading}>
              <strong>{footer.lead}</strong> {footer.body}
            </p>
          </div>
        </div>

        <div className={styles.panel}>
          <Link href={footer.card.href} className={styles.card}>
            <div className={styles.cardImg}>
              <Image
                src={footer.card.image.src}
                alt={footer.card.image.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.cardImgInner}
              />
            </div>
            <div className={styles.cardData}>
              <Eyebrow>{footer.card.eyebrow}</Eyebrow>
              <p className={styles.cardText}>{footer.card.text}</p>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <ul className={styles.bottomLinks}>
          {footer.links.map((l) =>
            l.action === "contact" ? (
              <li key={l.label}>
                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={() => setModalOpen(true)}
                >
                  {l.label}
                </button>
              </li>
            ) : (
              <li key={l.label}>
                <Link href={l.href}>{l.label}</Link>
              </li>
            )
          )}
        </ul>

        <div className={styles.bottomRight}>
          <Link href={nav.brand.href} className={styles.brand} aria-label={nav.brand.ariaLabel}>
            <Logo height={22} />
          </Link>
          <p className={styles.copyright}>{footer.copyright}</p>
          <ul>
            {social.map((s) => (
              <li key={s.href}>
                <a href={s.href} target="_blank" rel="noopener noreferrer">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </footer>
  );
}
