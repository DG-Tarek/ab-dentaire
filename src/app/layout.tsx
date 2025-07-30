import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { BottomNavigation } from "@/components/bottom-navigation";
import { ContactUsFooter } from "@/components/contact-us-footer";
import { CartProvider } from "@/components/cart-context";

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
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="pb-36 lg:pb-0 flex-1">
              {children}
            </main>
            <ContactUsFooter />
            <BottomNavigation />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
