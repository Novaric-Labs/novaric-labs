import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700"],
});

const siteUrl = "https://novariclabs.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Novaric Labs — AI systems that work in production",
    template: "%s · Novaric Labs",
  },
  description:
    "Novaric Labs is a Charlotte, NC AI consulting firm. We build agentic systems, integrate AI into existing stacks, and advise operations leaders — built for production, not demos.",
  keywords: [
    "AI consulting",
    "agentic systems",
    "AI integration",
    "Charlotte NC",
    "property management automation",
    "Novaric Labs",
  ],
  authors: [{ name: "Novaric Labs" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Novaric Labs — AI systems that work in production",
    description:
      "We build the systems that make AI work for your business. Agentic infrastructure, AI integration, and strategic advisory from Charlotte, NC.",
    siteName: "Novaric Labs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novaric Labs",
    description: "We build the systems that make AI work for your business.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.variable} suppressHydrationWarning>
      <head>
        {/* Set the theme before paint to avoid a flash of the wrong mode. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
