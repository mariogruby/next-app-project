import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
// import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";

const urbanist = Urbanist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "None E-commerce",
  description: "Accessories Phone Shop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en"suppressHydrationWarning>
      <body
        className={urbanist.className}>
          <Navbar />
          {children}
          <Toaster />
          <Footer />
      </body>
    </html>
  );
}
