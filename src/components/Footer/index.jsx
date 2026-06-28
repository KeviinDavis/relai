"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Eyebrow from "@/components/Eyebrow";
import ContactModal from "@/components/ContactModal";
import styles from "./Footer.module.css";

const BOTTOM_LINKS = [
  { label: "Home", href: "/" },
  { label: "Product", href: "/product" },
  { label: "FAQ", href: "/product#faq" },
  { label: "About", href: "/about" },
  { label: "Contact", action: "contact" },
  { label: "Careers", href: "/about" },
];

export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <footer className={styles.footer}>
      <div className={styles.main}>
        <div className={styles.intro}>
          <div className={styles.introTag}>
            <Eyebrow variant="dark">Contact</Eyebrow>
          </div>
          <div className={styles.introBody}>
            <h2 className={styles.heading}>The future of insurance</h2>
            <p className={styles.subheading}>
              <strong>Korr</strong> is a cloud-based insurance management platform
              built specifically for carriers, agents, and TPAs. With a minimalist
              UI and highly adaptable tools, Korr offers the fastest path to AI
              enablement—empowering your company to lead, not follow.
            </p>
          </div>
        </div>

        <div className={styles.panel}>
          <Link href="/book-a-demo" className={styles.card}>
            <div className={styles.cardImg}>
              <Image
                src="/images/concrete.webp"
                alt="Architectural forms in concrete."
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className={styles.cardImgInner}
              />
            </div>
            <div className={styles.cardData}>
              <Eyebrow>Get in touch</Eyebrow>
              <p className={styles.cardText}>
                Ready to replace your outdated insurance software with a platform
                you’ll be excited to use every day? Schedule a demo today.
              </p>
            </div>
          </Link>
        </div>
      </div>

      <div className={styles.bottom}>
        <ul className={styles.bottomLinks}>
          {BOTTOM_LINKS.map((l) =>
            l.action === "contact" ? (
              <li key={l.label}>
                <button
                  type="button"
                  className={styles.linkButton}
                  onClick={() => setModalOpen(true)}
                >
                  Contact
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
          <p className={styles.copyright}>© 2026 Korr</p>
          <ul>
            <li>
              <a
                href="https://www.linkedin.com/company/korr-inc/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </footer>
  );
}
