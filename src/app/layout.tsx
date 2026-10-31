import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MotionReady } from "@/components/motion-ready";
import { site } from "@/data/profile";
import { themeColors, themeInitScript } from "@/lib/theme-script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const ogImage = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: `${site.name}, software engineer`,
};

export const metadata: Metadata = {
  // The site lives under /portfolio on GitHub Pages; relative URLs below resolve against it.
  metadataBase: new URL(site.url),
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  keywords: site.keywords,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: themeColors.light },
    { media: "(prefers-color-scheme: dark)", color: themeColors.dark },
  ],
};

// Without JavaScript the scroll reveals would stay hidden, and the menu, theme
// and copy buttons would do nothing, so they are hidden too.
const noScriptCss =
  "[data-reveal]{opacity:1!important;transform:none!important}.header-tools,.copy-btn{display:none!important}";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script>{themeInitScript}</script>
        <noscript>
          <style>{noScriptCss}</style>
        </noscript>
      </head>
      <body>
        {children}
        <MotionReady />
      </body>
    </html>
  );
}
