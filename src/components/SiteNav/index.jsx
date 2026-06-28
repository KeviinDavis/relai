"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import Container from "@/components/Container";
import ContactModal from "@/components/ContactModal";
import { nav, social } from "@/content/site";
import styles from "./SiteNav.module.css";

// Mobile drawer — the full menu (adds Home + the Book a Demo CTA).
const drawerLinks = [nav.home, ...nav.primary, nav.cta];

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
              href={nav.brand.href}
              className={styles.logo}
              aria-label={nav.brand.ariaLabel}
              onClick={closeMenu}
            >
              <Logo height={26} />
            </Link>

            <nav className={styles.links} aria-label="Primary">
              {nav.primary.map((link) => (
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
                  {nav.contact.label}
                </button>
                <Link href={nav.cta.href} className={styles.action}>
                  {nav.cta.label}
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
            {drawerLinks.map((link) => (
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
                {nav.contact.drawerLabel}
              </button>
            </div>

            <div className={styles.metaBlock}>
              <span className={styles.metaLabel}>Social</span>
              <div className={styles.social}>
                {social.map((s) => (
                  <a
                    key={s.href}
                    className={styles.metaLink}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {s.label}
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
