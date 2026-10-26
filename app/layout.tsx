import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";

import { LanguageProvider } from "@/components/providers/LanguageProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SkipLink from "@/components/layout/SkipLink";
import DocumentTitle from "@/components/layout/DocumentTitle";
import AgeGate from "@/components/entry/AgeGate";
import QvevriPreloader from "@/components/entry/QvevriPreloader";
import { entryScript } from "@/components/entry/entry";
import { DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

const display = Cormorant_Garamond({
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-manrope",
  display: "swap",
});

// Simplified Chinese, behind the Latin faces in the stacks (globals.css), so
// only Chinese characters reach them. Google serves these in many small
// unicode-range slices; nothing is preloaded, and a slice downloads only when
// a page shows a character from it.
const serifSc = Noto_Serif_SC({
  weight: ["300", "400", "500"],
  variable: "--font-serif-sc",
  display: "swap",
  preload: false,
});

const sansSc = Noto_Sans_SC({
  weight: ["400", "500", "600"],
  variable: "--font-sans-sc",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Georgian Qvevri Wines since 1965`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    locale: "en_US",
    alternateLocale: ["ka_GE", "ru_RU", "zh_CN"],
    url: "/",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: SITE_NAME }],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: DEFAULT_DESCRIPTION,
    images: [DEFAULT_OG_IMAGE],
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0c0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${sans.variable} ${serifSc.variable} ${sansSc.variable}`}
    >
      <body>
        <script dangerouslySetInnerHTML={{ __html: entryScript }} />
        <LanguageProvider>
          <SkipLink />
          <DocumentTitle />
          <QvevriPreloader />
          <AgeGate />
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
