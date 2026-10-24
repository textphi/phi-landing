import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  axes: ["opsz", "SOFT", "WONK"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://textphi.com"),
  title: "Phi: Your personal investing agent, in your texts",
  description:
    "Phi is your personal investing agent. It knows your portfolio, learns how you invest, and texts you first when something matters.",
  openGraph: {
    title: "The future of investing is in your contacts.",
    description:
      "Phi is your personal investing agent. It knows your portfolio, learns how you invest, and texts you first when something matters.",
    url: "https://textphi.com",
    siteName: "Phi",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "The future of investing is in your contacts.",
    description:
      "Phi is your personal investing agent. It knows your portfolio, learns how you invest, and texts you first when something matters.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
