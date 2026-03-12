import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coding2U — Customer Acquisition Pages Engineered by Developers",
  description:
    "We engineer high-performance customer acquisition pages — hand-coded by software developers for businesses that want more clients, more conversions, and real results.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='22' fill='white'/><rect x='2' y='2' width='96' height='96' rx='20' fill='none' stroke='%23e5e7eb' stroke-width='2'/><text x='50' y='66' font-size='44' font-weight='900' font-family='Arial Black,Arial,sans-serif' text-anchor='middle'><tspan fill='%23111111'>c</tspan><tspan fill='%23f97316'>2u</tspan></text></svg>",
  },
  openGraph: {
    title: "Coding2U — Customer Acquisition Pages Engineered by Developers",
    description: "Your competitors already have an engineered page converting visitors into clients. Do you?",
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
