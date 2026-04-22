import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./auth/AuthProvider";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "./(shop)/CartProvider";
import { CartSidebar } from "@/components/shop/CartSidebar";

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
  title: "AURUM | Editorial de Joyería Fina",
  description: "Joyería exquisita seleccionada para la estética moderna.",
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
          <CartProvider>
            <CartSidebar />
            <Toaster 
              position="top-right"
              toastOptions={{
                className: 'font-sans text-xs uppercase tracking-widest',
                duration: 4000,
                style: {
                  background: '#F9F8F6',
                  color: '#1A1A1A',
                  border: '1px solid rgba(0,0,0,0.05)',
                  borderRadius: '0',
                },
              }}
            />
            <div className="noise-overlay" aria-hidden="true" />
            <div className="grid-lines hidden md:flex" aria-hidden="true">
              <div className="grid-line" />
              <div className="grid-line" />
              <div className="grid-line" />
              <div className="grid-line" />
            </div>
            <main className="relative z-0 flex-grow">

              {children}

            </main>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
