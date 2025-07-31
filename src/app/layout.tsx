import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ConditionalHeader } from "@/components/conditional-header";
import { CartProvider } from "@/components/cart-context";
import { CurrencyProvider } from "@/components/currency-context";
import { ConditionalFooter } from "@/components/conditional-footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AB Dentaire",
  description: "Dental application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <CartProvider>
          <CurrencyProvider>
            <div className="min-h-screen flex flex-col">
              <ConditionalHeader />
              <main className="pb-40 lg:pb-0 flex-1">
                {children}
              </main>
              <ConditionalFooter />
            </div>
          </CurrencyProvider>
        </CartProvider>
      </body>
    </html>
  );
}
