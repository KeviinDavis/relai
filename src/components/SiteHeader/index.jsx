"use client";

import { usePathname } from "next/navigation";
import SiteNav from "@/components/SiteNav";

// SiteNav is the universal site menu, used on every route. Its `theme` drives
// the project's .theme-* token set on the bar so the nav stays legible over
// each route's hero. Every current hero is dark (white type on the black
// page), so the default is "dark"; add a route here mapped to "light" only if
// it ever adopts a .theme-light hero.
const NAV_THEME = {};

export default function SiteHeader() {
  const pathname = usePathname();
  const theme = NAV_THEME[pathname] ?? "dark";

  return <SiteNav theme={theme} />;
}
