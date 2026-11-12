import { Manrope } from "next/font/google";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import AppShell from "@/components/layout/AppShell";
import JsonLd from "@/components/common/JsonLd";
import { siteMetadata } from "@/lib/metadata";
import { organizationStructuredData, websiteStructuredData } from "@/lib/structured-data";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata = siteMetadata;

const documentLanguageScript = `
  (() => {
    const pathname = window.location.pathname || '/';
    const locale = pathname === '/fr' || pathname.startsWith('/fr/') ? 'fr' : 'en';
    const root = document.documentElement;

    root.lang = locale;
    root.setAttribute('translate', 'no');
    root.classList.add('notranslate');
  })();
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      translate="no"
      className="notranslate"
      data-theme="light"
      suppressHydrationWarning
    >
      <head>
        <meta name="google" content="notranslate" />
        <script dangerouslySetInnerHTML={{ __html: documentLanguageScript }} />
      </head>
      <body
        className={manrope.variable}
        style={{
          "--font-body": "var(--font-manrope), 'Inter', 'Segoe UI', system-ui, sans-serif",
          "--font-display": "var(--font-manrope), 'Inter', 'Segoe UI', system-ui, sans-serif",
        }}
      >
        <JsonLd data={[organizationStructuredData, websiteStructuredData]} />
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
