import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import Backdrop from "@/components/Backdrop";
import NavBar from "@/components/NavBar";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Signal",
  description:
    "A quiet, local-first habit tracker. Log your day, watch your consistency take shape, and keep your streak alive. No account — your data stays in your browser.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", inter.variable, fraunces.variable)}
    >
      <body className="min-h-full">
        <Backdrop />
        <NavBar />
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
