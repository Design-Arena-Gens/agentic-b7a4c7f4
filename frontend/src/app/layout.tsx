import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SweetBite – Online Cake Ordering",
  description: "Order custom cakes, manage orders, and delight customers with SweetBite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-pink-50 text-slate-800`}>
        <CartProvider>
          <div className="flex min-h-screen flex-col">
            <header className="sticky top-0 z-50 bg-white/90 shadow-sm backdrop-blur">
              <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                <Link href="/" className="text-2xl font-semibold text-pink-600">
                  SweetBite
                </Link>
                <nav className="flex gap-6 text-sm font-medium">
                  <Link href="/cakes" className="transition hover:text-pink-500">
                    Cakes
                  </Link>
                  <Link href="/cart" className="transition hover:text-pink-500">
                    Cart
                  </Link>
                  <Link href="/admin" className="transition hover:text-pink-500">
                    Admin
                  </Link>
                  <Link href="/auth" className="transition hover:text-pink-500">
                    Account
                  </Link>
                </nav>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="bg-slate-900 py-8 text-center text-sm text-slate-300">
              © {new Date().getFullYear()} SweetBite Cakes. Crafted with love.
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
