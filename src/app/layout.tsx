import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import SessionProvider from "@/components/SessionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "MenteClara — Psicología Online y Presencial",
  description:
    "Reserva tu cita con la Dra. Azucena Ramos. Terapia individual, ansiedad, depresión y más.",
  openGraph: {
    title: "MenteClara",
    description: "Tu bienestar mental, con claridad.",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-brand-dark">
        <SessionProvider>
          {children}
          <Toaster richColors position="top-right" />
        </SessionProvider>
      </body>
    </html>
  );
}
