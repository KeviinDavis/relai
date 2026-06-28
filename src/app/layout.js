import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

// ─── METADATA ───────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL("https://www.gokorr.com"),
  title: {
    default: "Korr — Redefining Insurance",
    template: "%s — Korr",
  },
  description:
    "Korr is the first truly versatile insurance platform—streamlining claims, simplifying policy administration, and accelerating new product development.",
  openGraph: {
    title: "Korr — Redefining Insurance",
    description:
      "A modern, cloud-native core insurance platform built for speed, flexibility, and intelligence.",
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
