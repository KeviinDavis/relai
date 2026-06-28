"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import SiteNav from "@/components/SiteNav";

// Routes that use the Relai SiteNav, and the theme of the hero the bar sits
// over (drives the project's .theme-* token set on the nav). Both routes
// currently render on the dark default theme; flip to "light" here if a route
// adopts a .theme-light hero. Every other route keeps the existing Header.
const NAV_ROUTES = {
  "/": "dark",
  "/mission": "dark",
};

export default function SiteHeader() {
  const pathname = usePathname();
  const theme = NAV_ROUTES[pathname];

  return theme ? <SiteNav theme={theme} /> : <Header />;
}
