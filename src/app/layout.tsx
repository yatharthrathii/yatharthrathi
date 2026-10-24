import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Playfair_Display, Sora } from "next/font/google";
import { Providers } from "@/components/ui/Providers";
import { site } from "@/content/site";
import "lenis/dist/lenis.css";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700", "800", "900"], variable: "--font-playfair" });
const sora = Sora({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--font-sora" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-jetbrains" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · Full-Stack Engineer`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: ["Yatharth Rathi", "full-stack engineer", "NestJS", "Next.js", "TypeScript", "PostgreSQL", "React Native", "portfolio"],
  authors: [{ name: site.name, url: site.url }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: `${site.name} · Full-Stack Engineer`,
    description: site.description,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} · Full-Stack Engineer`,
    description: site.description,
    creator: "@yatharthrathiii",
  },
};

export const viewport: Viewport = {
  themeColor: "#F1F2F4",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${sora.variable} ${jetbrains.variable}`}>
      <body className="min-h-dvh overflow-x-clip">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
