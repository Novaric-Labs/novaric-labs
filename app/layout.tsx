import type { Metadata } from "next";
import { Chakra_Petch, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const chakra = Chakra_Petch({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-chakra",
  weight: ["500", "600", "700"],
});

const plex = IBM_Plex_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plex",
  weight: ["400", "500", "600"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500"],
});

const siteUrl = "https://novariclabs.ai";

const DESCRIPTION =
  "Novaric Labs is a forward-deployed engineering group in Charlotte, NC. We embed with your team to enable AI, automate operations, and incubate new software products — built in your stack, run in production.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Novaric Labs — Forward-deployed engineering for AI that ships",
    template: "%s · Novaric Labs",
  },
  description: DESCRIPTION,
  keywords: [
    "forward-deployed engineering",
    "AI enablement",
    "AI automation",
    "agentic systems",
    "Charlotte NC",
    "property management automation",
    "Novaric Labs",
  ],
  authors: [{ name: "Novaric Labs" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Novaric Labs — Forward-deployed engineering for AI that ships",
    description: DESCRIPTION,
    siteName: "Novaric Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novaric Labs — Forward-deployed engineering for AI that ships",
    description: DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${chakra.variable} ${plex.variable} ${mono.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:border focus:border-amber focus:bg-void focus:px-4 focus:py-2 focus:text-sm focus:text-fg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
