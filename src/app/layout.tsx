import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BottomNav } from "@/components/BottomNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DUGAMA APP - Fresh Market Shopping",
  description: "Fresh market products and recipe bundles from local markets in The Gambia",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="mobile-container pb-20">
          {children}
          <BottomNav />
        </div>
      </body>
    </html>
  );
}
