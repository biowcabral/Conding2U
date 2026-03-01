import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coding2U — Landing Pages That Actually Sell",
  description:
    "We build high-conversion landing pages for businesses that want more clients, more sales, and real results. Neuroscience-based copy and design that converts.",
  openGraph: {
    title: "Coding2U — Landing Pages That Actually Sell",
    description: "Your competitors already have a page that sells. Yours doesn't yet?",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
