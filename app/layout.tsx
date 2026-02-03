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
  title: "Aquarium Maintenance Perth and Fish Tank Service",
  description:
    "Perth aquarium maintenance for homes and businesses, with aquarium cleaning, fish tank service, and clear reporting across Perth metro. Book a quote today.",
  keywords: [
    "aquarium maintenance Perth",
    "aquarium cleaning Perth",
    "fish tank cleaning Perth",
    "fish tank maintenance Perth",
    "aquarium service Perth",
    "fish tank service Perth",
    "aquarium cleaner Perth",
    "fish tank cleaner Perth",
    "aquarium maintenance company Perth",
    "commercial aquarium maintenance Perth",
    "reef aquarium maintenance Perth",
    "aquarium technician Perth",
    "Perth aquarium services",
    "aquarium relocation Perth",
    "aquarium installation Perth",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Aquarium Maintenance Perth and Fish Tank Service",
    description:
      "Perth aquarium maintenance for homes and businesses, with aquarium cleaning, fish tank service, and clear reporting across Perth metro. Book a quote today.",
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
    title: "Aquarium Maintenance Perth and Fish Tank Service",
    description:
      "Perth aquarium maintenance for homes and businesses, with aquarium cleaning, fish tank service, and clear reporting across Perth metro. Book a quote today.",
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
