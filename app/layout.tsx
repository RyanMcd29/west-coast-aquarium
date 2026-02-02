import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SeoJsonLd from "@/components/SeoJsonLd";
import { localBusinessJsonLd } from "@/lib/seo";
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const displayFont = Sora({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const monoFont = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://westcoastaquariumservices.com.au"),
  title: {
    default: "West Coast Aquarium Services | Perth Aquarium Technician",
    template: "%s | West Coast Aquarium Services",
  },
  description:
    "West Coast Aquarium Services provides bespoke aquarium installations, maintenance, and equipment support across Perth metro and surrounds.",
  keywords: [
    "aquarium maintenance Perth",
    "aquarium technician Perth",
    "reef tank servicing",
    "aquarium installations WA",
    "aquarium equipment setup",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "West Coast Aquarium Services | Perth Aquarium Technician",
    description:
      "Bespoke aquarium installations, maintenance, and equipment support across Perth metro and surrounds.",
    url: "https://westcoastaquariumservices.com.au",
    siteName: "West Coast Aquarium Services",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "West Coast Aquarium Services | Perth Aquarium Technician",
    description:
      "Bespoke aquarium installations, maintenance, and equipment support across Perth metro and surrounds.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU">
      <body
        className={`${bodyFont.variable} ${displayFont.variable} ${monoFont.variable} antialiased`}
      >
        <div className="min-h-screen bg-background text-foreground">
          <SeoJsonLd data={localBusinessJsonLd} id="local-business-jsonld" />
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
