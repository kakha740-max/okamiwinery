import type { Metadata } from "next";
import "./globals.css";

import { LanguageProvider } from "@/components/providers/LanguageProvider";

export const metadata: Metadata = {
  title: {
    default: "Okami Winery",
    template: "%s | Okami Winery",
  },
  description:
    "Okami Winery – Premium Georgian wines crafted in the historic Okami Microzone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}