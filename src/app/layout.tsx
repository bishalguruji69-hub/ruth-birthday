import type { Metadata, Viewport } from "next";
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};
import { Cormorant_Garamond, Inter, Dancing_Script, Noto_Serif_Devanagari } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const notoDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari",
  subsets: ["devanagari"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "To Ruth, Written in the Stars",
  description: "A little letter the universe wrote for you. Happy Birthday.",
  icons: {
    icon: "/assets/favicon-heart.svg",
  },
  openGraph: {
    title: "To Ruth, Written in the Stars",
    description: "A little letter the universe wrote for you. Happy Birthday.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorant.variable} ${inter.variable} ${dancing.variable} ${notoDevanagari.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
