import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ADSENSE_CLIENT } from "@/lib/ads";
import { consentInitScript } from "@/lib/consent";
import { themeInitScript } from "@/lib/theme-init";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "AniUI — Beautiful React Native Components",
    template: "%s | AniUI",
  },
  description: "shadcn/ui for React Native. 148 accessible components built with Uniwind or NativeWind, rn-primitives, and TypeScript. Copy. Paste. Ship.",
  keywords: ["react native", "components", "nativewind", "tailwind", "mobile", "ios", "android", "shadcn", "ui library", "expo", "uniwind", "rn-primitives", "accessible"],
  authors: [{ name: "Anish", url: "https://aniui.dev" }],
  creator: "Anish",
  metadataBase: new URL("https://aniui.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aniui.dev",
    siteName: "AniUI",
    title: "AniUI — Beautiful React Native Components",
    description: "shadcn/ui for React Native. 148 accessible components. Copy. Paste. Ship.",
    images: [{ url: "https://aniui.dev/og.png", width: 1200, height: 630, alt: "AniUI — Beautiful React Native Components" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AniUI — Beautiful React Native Components",
    description: "shadcn/ui for React Native. 148 accessible components. Copy. Paste. Ship.",
    creator: "@anishlp7",
    images: ["https://aniui.dev/og.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon-light.ico" media="(prefers-color-scheme: light)" />
        <link rel="icon" href="/favicon-dark.ico" media="(prefers-color-scheme: dark)" />
        {/* Runs before paint so the page's first frame already matches the
            visitor's stored theme or system preference — no light-then-dark flash. */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* Ahead of the ad script below, which is the whole point of putting it
            here: it is what stops a cookie being set in Europe in the moment
            before Google's consent dialog has loaded. */}
        <script dangerouslySetInnerHTML={{ __html: consentInitScript }} />
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
        {/* Verification for the whole aniui.dev domain, which is how AdSense
            reaches academy.aniui.dev. No ad unit on this site consumes it. */}
        <Script
          id="adsbygoogle"
          async
          crossOrigin="anonymous"
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
        />
      </body>
    </html>
  );
}
