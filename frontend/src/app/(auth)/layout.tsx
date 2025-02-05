import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Study Cards App",
  description: "Register or login into study cards app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-6 rounded-lg shadow-md">{children}</div>
    </div>
  );
}
