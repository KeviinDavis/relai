"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import ContactModal from "@/components/ContactModal";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { label: "Product", href: "/product" },
  { label: "Book a Demo", href: "/book-a-demo" },
  { label: "About", href: "/about" },
  { label: "Mission", href: "/mission" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
        <Link href="/" className={styles.logo} aria-label="Relai — home">
          <Logo height={28} />
        </Link>

        <div className={styles.navGroup}>
          <Link href="/" className={styles.homePill}>
            relai
          </Link>
          <ul className={styles.list}>
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          type="button"
          className={styles.menuIcon}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {menuOpen && (
        <nav className={styles.mobileMenu} aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={styles.mobileLink}
              onClick={closeMenu}
            >
              {link.label}
            </Link>
          ))}
          <button
            type="button"
            className={styles.mobileContact}
            onClick={() => {
              closeMenu();
              setModalOpen(true);
            }}
          >
            Contact
          </button>
        </nav>
      )}

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
