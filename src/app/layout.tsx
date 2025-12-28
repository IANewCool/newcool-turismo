import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Turismo Chile - SERNATUR | NewCooltura Informada",
  description: "Oficinas SERNATUR, destinos turisticos, calculadora de presupuesto y derechos del turista en Chile",
  keywords: ["turismo Chile", "SERNATUR", "destinos turisticos", "viajes", "derechos turista"],
  openGraph: {
    title: "Turismo Chile - NewCooltura Informada",
    description: "Destinos, SERNATUR y derechos del turista",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
