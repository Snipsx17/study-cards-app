"use client";
import { Navbar } from "@/components/navbar/NavBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-purple-50">
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
