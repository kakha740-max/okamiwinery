import type { Metadata } from "next";
import "./globals.css";

import { LanguageProvider } from "@/components/providers/LanguageProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Etno Okami Winery",
    template: "%s | Etno Okami Winery",
  },
  description:
    "Etno Okami Winery offers premium Georgian wines and unforgettable estate experiences from the historic Etno Okami Microzone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}