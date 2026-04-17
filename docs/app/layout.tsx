import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

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
  description: "shadcn/ui for React Native. 89 accessible components built with NativeWind, rn-primitives, and TypeScript. Copy. Paste. Ship.",
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
    url: "./",
    siteName: "AniUI",
    title: "AniUI — Beautiful React Native Components",
    description: "shadcn/ui for React Native. 89 accessible components. Copy. Paste. Ship.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AniUI — Beautiful React Native Components",
    description: "shadcn/ui for React Native. 89 accessible components. Copy. Paste. Ship.",
    creator: "@anishlp7",
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
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable} antialiased font-sans`}>
        <ThemeProvider>
          <Navbar />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
