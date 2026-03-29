import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { CartProvider } from "@/lib/CartContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aura | Women's Clothing & Accessories",
  description: "A premium lifestyle brand offering women's clothing, accessories, and home decor.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-brand-offwhite text-brand-charcoal selection:bg-brand-sage selection:text-white flex flex-col min-h-screen`}>
        <CartProvider>
          <Header />
            <main className="flex-grow">
              {children}
            </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
