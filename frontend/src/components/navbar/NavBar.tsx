"use client";

import { DesktopMenu } from "./DesktopMenu";
import { MobileMenu } from "./MobileMenu";
import { Logo } from "./Logo";

export const Navbar = () => {
  return (
    <header className="bg-purple py-3 px-4 border-0 flex items-center justify-between gap-6">
      <Logo />
      <DesktopMenu />
      <MobileMenu />
    </header>
  );
};
