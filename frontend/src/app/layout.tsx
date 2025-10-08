import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthProvider";
import { AnnouncementBar } from "@/components/layout/announcement-bar";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FoxDrip – La esencia real",
    template: "%s | FoxDrip",
  },
  description:
    "Indumentaria de edición limitada inspirada en la cultura urbana y creatividad independiente.",
  icons: [
    { rel: "icon", url: "/icon.webp", type: "image/webp" },
    { rel: "shortcut icon", url: "/icon.webp", type: "image/webp" },
    { rel: "apple-touch-icon", url: "/icon.webp", type: "image/webp" },
  ],
  metadataBase: new URL("https://www.foxdrip.example"),
  openGraph: {
    title: "FoxDrip – Ropa urbana",
    description:
      "Indumentaria de edición limitada inspirada en la cultura urbana y creatividad independiente.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FoxDrip – Ropa urbana",
    description: "Ediciones limitadas. Expresá tu identidad.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AnnouncementBar
            messages={[
              "ENVÍOS A TODO EL PAÍS",
              "3 Y 6 CUOTAS SIN INTERÉS",
              "DEVOLUCIONES SIMPLIFICADAS",
              "CUIDEN A NICO, GENTE",
            ]}
          />
          {children}
          <WhatsAppButton />
        </AuthProvider>
      </body>
    </html>
  );
}
