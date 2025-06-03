import type { Metadata } from "next";
import { GeistSans, GeistMono } from "geist/font";
import "./globals.css";

export const metadata: Metadata = {
  title: "CO2 Emissions Data Explorer",
  description: "Visualize global CO2 emissions data by country and continent",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className='min-h-screen bg-background text-foreground antialiased'>
        {children}
      </body>
    </html>
  );
}
