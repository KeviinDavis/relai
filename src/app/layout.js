import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

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
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
