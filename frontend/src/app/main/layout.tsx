import type { Metadata } from "next";

import { Navbar } from "@/components/navbar/NavBar";

export const metadata: Metadata = {
  title: "Study Cards App",
  description: "Application for create flash cards.",
};

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
