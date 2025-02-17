"use client";
import { Navbar } from "@/components/navbar/NavBar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative min-h-screen bg-purple-50">
      <Navbar />
      <main className="relative flex items-center justify-center pt-32">
        {children}
      </main>
    </div>
  );
}
