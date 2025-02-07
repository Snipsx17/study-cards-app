"use client";

import { Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { StateInitializer } from "@/components/state/StateInitializer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased bg-purple/5`}>
        <StateInitializer>{children}</StateInitializer>
        <Toaster />
      </body>
    </html>
  );
}
