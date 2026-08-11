"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Logo from "@/components/Logo";
import MobileMenu from "@/components/MobileMenu";
import MenuToggle from "@/components/MenuToggle";
import { nav } from "@/content/site";
import styles from "./Header.module.css";

// Mobile overlay: the full set, leading with Home.
const menuLinks = [nav.home, ...nav.primary, nav.cta];

// Routes that render on the LIGHT theme. Header lives OUTSIDE RouteTheme (see
// layout.js), so it doesn't inherit the route's theme class — it sets its own
// here so the always-on logo reads the right foreground (dark-on-light /
// light-on-dark). Mirrors LIGHT_ROUTES in RouteTheme.
const LIGHT_ROUTES = new Set([
  "/about",
  "/book-a-demo",
  "/sandbox/board-hero",
  "/sandbox/product-hero",
]);

// Prefix-matched light routes — must mirror LIGHT_PREFIXES in RouteTheme so the
// logo/links pick the dark foreground on the white /news/<slug> article pages.
// (The bare /news index stays dark and is intentionally not matched here.)
const LIGHT_PREFIXES = ["/news/"];

// Routes whose hero is dark-topped on DESKTOP but light-topped on MOBILE (the
// original CompositeHero: full-bleed video on desktop, clean light copy zone on
// mobile). The logo goes dark only at the TOP of these routes on mobile; once
// scrolled it reverts to the normal (route) theme so it stays legible over the
// dark sections below. (Home "/" is NOT here: it now runs CompositeHero12, whose
// mobile is a dark video — the logo stays white over it.)
const MOBILE_LIGHT_ROUTES = new Set(["/sandbox/composite-hero"]);

export default function Header() {
  const pathname = usePathname();
  const routeLight =
    LIGHT_ROUTES.has(pathname) ||
    LIGHT_PREFIXES.some((prefix) => pathname.startsWith(prefix));
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobile, setMobile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const light =
    routeLight || (mobile && !scrolled && MOBILE_LIGHT_ROUTES.has(pathname));

  // Frost on scroll (> 40), plus a "smart header": the whole bar leaves upward
  // on scroll-down (past a small threshold) and returns on any scroll-up.
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (y > lastY && y > 80) setHidden(true);
      else if (y < lastY) setHidden(false);
      lastY = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Track the mobile breakpoint so the dark-topped-on-desktop heroes above can
  // flip the logo dark where their mobile top is light.
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const apply = () => setMobile(query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`${styles.header} ${light ? "theme-light" : "theme-dark"} ${
          scrolled ? styles.scrolled : ""
        } ${hidden ? styles.hidden : ""}`}
      >
        <Link href={nav.brand.href} className={styles.logo} aria-label={nav.brand.ariaLabel}>
          <Logo height={22} />
        </Link>

        {/* Desktop pill: wordmark + primary links + the filled CTA, all inside
            one frosted glass capsule. The glass is always light, so the
            wordmark is scoped `theme-light` — the Logo reads
            --color-text-primary, which resolves to black there (same idiom as
            menuLogo below). */}
        <div className={styles.navGroup}>
          <Link
            href={nav.brand.href}
            className={`${styles.wordmark} theme-light`}
            aria-label={nav.brand.ariaLabel}
          >
            <Logo height={18} />
          </Link>

          <ul className={styles.list}>
            {nav.primary.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link href={nav.cta.href} className={styles.cta}>
            {nav.cta.label}
          </Link>
        </div>
      </header>

      {/* Mobile nav. The toggle, brand mark, and overlay live at the top level
          (outside <header>) so they sit above the menu's modal layer and stay
          interactive while the menu is open. All hidden at >= 1024px. */}
      <div
        className={`${styles.menuToggle} ${light ? "theme-light" : "theme-dark"} ${
          hidden && !menuOpen ? styles.hidden : ""
        }`}
      >
        <MenuToggle open={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
      </div>

      {/* The in-nav logo is hidden under the open panel (it's below the modal
          layer), so render a copy above it. The open frost is always light, so
          scope it `theme-light` — the Logo reads --color-text-primary, which
          flips to black there, so it themes itself dark-on-frost. It reveals
          with the menu links via a clipped drop-in (see Header.module.css). */}
      {menuOpen && (
        <Link
          href={nav.brand.href}
          className={`${styles.menuLogo} theme-light`}
          aria-label={nav.brand.ariaLabel}
          onClick={closeMenu}
        >
          <Logo height={22} className={styles.menuLogoMark} />
        </Link>
      )}

      <MobileMenu
        open={menuOpen}
        onClose={closeMenu}
        links={menuLinks}
        tagline="Redefining Freight"
      />
    </>
  );
}
