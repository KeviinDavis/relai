"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Container from "@/components/Container";
import ContactModal from "@/components/ContactModal";
import styles from "./SiteNav.module.css";

// Center bar links — remapped from Anduril's domains to relai's real routes.
const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "About", href: "/about" },
  { label: "Mission", href: "/mission" },
  { label: "Arsenal-1", href: "/arsenal-1" },
];

// Mobile drawer — the full menu (adds Home + the Book a Demo CTA).
const DRAWER_LINKS = [
  { label: "Home", href: "/" },
  ...NAV_LINKS,
  { label: "Book a Demo", href: "/book-a-demo" },
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/korr-inc/",
  },
];

export default function SiteNav({ theme = "dark" }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Transparent over the hero → frosted on scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll + close on Escape while the drawer is open.
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const openContact = () => {
    setMenuOpen(false);
    setModalOpen(true);
  };

  return (
    <>
      <header
        className={`${styles.navWrapper} ${
          theme === "light" ? "theme-light" : "theme-dark"
        } ${scrolled ? styles.frosted : ""}`}
      >
        <Container>
          <div className={styles.bar}>
            <Link
              href="/"
              className={styles.logo}
              aria-label="Korr — home"
              onClick={closeMenu}
            >
              <Logo height={26} />
            </Link>

            <nav className={styles.links} aria-label="Primary">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className={styles.right}>
              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.action}
                  onClick={() => setModalOpen(true)}
                >
                  Contact
                </button>
                <Link href="/book-a-demo" className={styles.action}>
                  Book a Demo
                </Link>
              </div>

              <button
                type="button"
                className={styles.menuButton}
                aria-label="Open menu"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen(true)}
              >
                <span />
                <span />
              </button>
            </div>
          </div>
        </Container>

        <div
          className={`${styles.drawer} ${menuOpen ? styles.drawerOpen : ""}`}
          aria-hidden={!menuOpen}
        >
          <div className={styles.drawerHeader}>
            <Logo height={24} />
            <button
              type="button"
              className={styles.drawerClose}
              aria-label="Close menu"
              onClick={closeMenu}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>

          <nav className={styles.drawerNav} aria-label="Mobile">
            {DRAWER_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={styles.drawerLink}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={styles.drawerMeta}>
            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>Contact</span>
              <button
                type="button"
                className={styles.metaLink}
                onClick={openContact}
              >
                Contact Korr
              </button>
            </div>

            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>Social</span>
              <div className={styles.social}>
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.href}
                    className={styles.metaLink}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
