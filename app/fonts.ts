import { Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";

export const sansFont = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const monoFont = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const brandSerif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});
