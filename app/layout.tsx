import type { Metadata } from "next";
import { Manrope, Newsreader } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyActionBar } from "@/components/layout/StickyActionBar";
import { Providers } from "@/components/layout/Providers";
import { contactInfo } from "@/data/contact";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  style: ["normal", "italic"],
});

const site = siteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: contactInfo.institutionName,
    template: `%s | ${contactInfo.shortName}`,
  },
  description:
    "Ergani 1 No'lu Aile Sağlığı Merkezi — aile hekimliği, koruyucu sağlık ve danışmanlık hizmetleri. Çalışma saatleri, hekimler, duyurular ve iletişim.",
  keywords: [
    "Ergani",
    "Aile Sağlığı Merkezi",
    "ASM",
    "Diyarbakır",
    "aile hekimi",
    "aşı",
  ],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: site,
    siteName: contactInfo.institutionName,
    title: contactInfo.institutionName,
    description:
      "Aile hekimliği hizmetleri, koruyucu sağlık uygulamaları ve danışmanlık hizmetleriyle Ergani'de hizmetinizdeyiz.",
  },
  twitter: {
    card: "summary_large_image",
    title: contactInfo.institutionName,
    description:
      "Ergani'de güvenilir aile hekimliği hizmetleri. Hekimler, çalışma saatleri ve duyurular.",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.svg",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: contactInfo.institutionName,
  url: site,
  telephone: contactInfo.phoneHref.replace("tel:", ""),
  email: contactInfo.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: contactInfo.address.street,
    addressLocality: contactInfo.address.district,
    addressRegion: contactInfo.address.city,
    addressCountry: "TR",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  medicalSpecialty: "PrimaryCare",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${manrope.variable} ${newsreader.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Providers>
          <a href="#main-content" className="skip-link">
            İçeriğe atla
          </a>
          <Header />
          <main id="main-content" className="flex-1 pb-sticky-safe">
            {children}
          </main>
          <Footer />
          <StickyActionBar />
        </Providers>
      </body>
    </html>
  );
}
