import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/context/providers";
import { Toaster } from "@/components/ui/sonner";
import { Footer } from "@/components/bottom/footer";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3 Wheeler Bike Club | Informal Financing collections",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistMono.className} antialiased`}
      >
        <Providers>
          {children}
          <Footer />
          <Toaster expand={true} richColors />
        </Providers>
      </body>
    </html>
  );
}
