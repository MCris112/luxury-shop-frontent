import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth/AuthProvider";
import MainLayout from "./components/layout/mainLayout";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURUM | Fine Jewelry Editorial",
  description: "Exquisite jewelry curated for the modern aesthetic.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col selection:bg-accent/30 font-sans">
        <AuthProvider>
          <div className="noise-overlay" aria-hidden="true" />
          <div className="grid-lines hidden md:flex" aria-hidden="true">
            <div className="grid-line" />
            <div className="grid-line" />
            <div className="grid-line" />
            <div className="grid-line" />
          </div>
          <main className="relative z-0 flex-grow">

            <MainLayout>
              {children}
            </MainLayout>

          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
