import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

// ─── METADATA ───────────────────────────────────────────────
export const metadata = {
  // metadataBase intentionally omitted until the Relai domain is live.
  title: {
    default: "Relai — Redefining Freight",
    template: "%s — Relai",
  },
  description:
    "Relai is the first unified platform for port and freight logistics—connecting vessel, terminal, yard, and truck into a single, real-time system.",
  openGraph: {
    title: "Relai — Redefining Freight",
    description:
      "A modern, cloud-native freight-logistics coordination platform built for speed, visibility, and coordination.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
