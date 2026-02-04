import type { Metadata } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SeoJsonLd from "@/components/SeoJsonLd";
import { businessInfo, localBusinessJsonLd } from "@/lib/seo";
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
    default: "Perth Aquarium Maintenance | West Coast Aquarium Services",
    template: "%s | West Coast Aquarium Services",
  },
  description:
    "Perth aquarium maintenance, cleaning, relocations, and installations for homes and businesses. West Coast Aquarium provides clear reports and reliable visits.",
  keywords: [
    "aquarium maintenance Perth",
    "aquarium cleaning Perth",
    "aquarium technician Perth",
    "Perth aquarium services",
    "aquarium relocation Perth",
    "reef aquarium maintenance Perth",
    "aquarium installation Perth",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", type: "image/x-icon" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "Perth Aquarium Maintenance | West Coast Aquarium",
    description:
      "Perth aquarium maintenance, cleaning, relocations, and installations for homes and businesses. West Coast Aquarium provides clear reports and reliable visits.",
    url: "https://westcoastaquariumservices.com.au",
    siteName: "West Coast Aquarium Services",
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: businessInfo.image,
        alt: "Reef aquarium coral closeup",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Perth Aquarium Maintenance | West Coast Aquarium",
    description:
      "Perth aquarium maintenance, cleaning, relocations, and installations for homes and businesses. West Coast Aquarium provides clear reports and reliable visits.",
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
