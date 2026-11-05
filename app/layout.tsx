import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-grotesk",
  weight: ["400", "500", "700"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

const siteUrl = "https://novariclabs.ai";

const TITLE = "Novaric Labs — AI enablement for operations teams";
const DESCRIPTION =
  "Novaric Labs helps operations teams actually use AI. A senior engineer embeds with your team in Charlotte, NC or on site, builds AI into the tools you already run, and leaves your people able to keep it going.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: TITLE,
    template: "%s · Novaric Labs",
  },
  description: DESCRIPTION,
  keywords: [
    "AI enablement",
    "AI adoption",
    "operations automation",
    "embedded engineering",
    "Charlotte NC",
    "property management automation",
    "Novaric Labs",
  ],
  authors: [{ name: "Novaric Labs" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: TITLE,
    description: DESCRIPTION,
    siteName: "Novaric Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${grotesk.variable} ${mono.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-ink focus:bg-paper focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
