"use client";

import { useGlobalStore } from "@/store/global-store";
import MainLayout from "./main/layout";
import { CreateGroup } from "@/components/group/CreateGroup";

export default function Home() {
  const { isLoggedIn } = useGlobalStore();

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-purple-700">
        {isLoggedIn ? "Bienvenido a Study Cards App" : "Not logged in"}
      </h1>
      <CreateGroup />
    </MainLayout>
  );
}
