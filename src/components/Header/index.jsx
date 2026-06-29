"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import ContactModal from "@/components/ContactModal";
import { nav } from "@/content/site";
import styles from "./Header.module.css";

// Bar links: the shared primary nav plus the Book a Demo CTA.
const navLinks = [...nav.primary, nav.cta];

// Routes that render on the LIGHT theme. Header lives OUTSIDE RouteTheme (see
// layout.js), so it doesn't inherit the route's theme class — it sets its own
// here so the always-on logo reads the right foreground (dark-on-light /
// light-on-dark). Mirrors LIGHT_ROUTES in RouteTheme.
const LIGHT_ROUTES = new Set(["/about", "/book-a-demo"]);

export default function Header() {
  const pathname = usePathname();
  const light = LIGHT_ROUTES.has(pathname);
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
      <header
        className={`${styles.header} ${light ? "theme-light" : "theme-dark"} ${
          scrolled ? styles.scrolled : ""
        }`}
      >
        <Link href={nav.brand.href} className={styles.logo} aria-label={nav.brand.ariaLabel}>
          <Logo height={28} />
        </Link>

        <div className={styles.navGroup}>
          <ul className={styles.list}>
            {navLinks.map((link) => (
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
          {navLinks.map((link) => (
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
            {nav.contact.label}
          </button>
        </nav>
      )}

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
