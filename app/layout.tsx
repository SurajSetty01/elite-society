import type { Metadata } from "next";
import "lenis/dist/lenis.css";

import { SmoothScroll } from "@/components/smooth-scroll";
import SiteFooter from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import { monoFont, sansFont } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lite Society",
  description: "A private, curated networking society.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sansFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background text-foreground font-sans">
        <SmoothScroll />
        <div className="relative flex min-h-full flex-col overflow-x-hidden">
          <SiteHeader />
          <div className="flex-1">{children}</div>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
