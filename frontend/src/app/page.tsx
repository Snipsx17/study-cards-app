"use client";

import { useGlobalStore } from "@/store/global-store";
import MainLayout from "./main/layout";

export default function Home() {
  const { isLoggedIn } = useGlobalStore();

  return (
    <MainLayout>
      <div className="flex items-center justify-center h-screen">
        <h1 className="text-4xl font-bold text-purple-700">
          {isLoggedIn ? "Bienvenido a Study Cards App" : "Not logged in"}
        </h1>
      </div>
    </MainLayout>
  );
}
