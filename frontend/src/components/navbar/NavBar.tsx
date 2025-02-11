"use client";

import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";
import { useGlobalStore } from "@/store/global-store";
import { Loader2 } from "lucide-react";

export const Navbar = () => {
  const { initialized } = useGlobalStore();
  return (
    <header className="bg-purple py-3 px-4 border-0 flex items-center justify-between gap-6">
      <Logo />
      {initialized ? (
        <>
          <DesktopMenu />
          <MobileMenu />
        </>
      ) : (
        <Loader2 className="animate-spin text-white" />
      )}
    </header>
  );
};
