import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RouteTheme from "@/components/RouteTheme";
import SmoothScroll from "@/components/SmoothScroll";
import { meta } from "@/content/site";

export const metadata = meta;

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll />
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <Header />
        <RouteTheme>
          <main id="main">{children}</main>
          <Footer />
        </RouteTheme>
      </body>
    </html>
  );
}
