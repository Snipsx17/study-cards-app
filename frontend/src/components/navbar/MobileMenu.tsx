/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Menu } from "lucide-react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Link from "next/link";
import { useGlobalStore } from "@/store/global-store";
import { UserAvatar } from "./UserAvatar";
import { useRouter } from "next/navigation";
import { apiService } from "@/service/api.service";
import { toast } from "@/hooks/use-toast";

const MenuButtons = () => (
  <>
    <Link href="/login" className="text-lg">
      Login
    </Link>
    <Link href="/registration" className="text-lg">
      Register
    </Link>
    <Link href="/contact" className="text-lg font">
      Try App
    </Link>
  </>
);

const UserLoggedOptions = () => {
  const { logout } = useGlobalStore();
  const router = useRouter();

  const onLogout = async () => {
    try {
      apiService.logoutUser();
      localStorage.removeItem("session");
      logout();
      toast({
        title: "Logout Successful 👋",
        variant: "default",
        duration: 3000,
      });
      router.push("/");
    } catch (error) {}
  };

  return (
    <>
      <Button className="text-lg" onClick={onLogout} variant={"link"}>
        Logout
      </Button>
    </>
  );
};

export const MobileMenu = () => {
  const { isLoggedIn, user } = useGlobalStore();
  return (
    <nav className={`${!isLoggedIn ? "md:hidden" : ""}`}>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="link"
            size="lg"
            className="[&_svg]:size-8 text-white"
          >
            {!isLoggedIn ? (
              <Menu className="h-4 w-4" />
            ) : (
              <UserAvatar username={user?.name} avatarUrl={user?.avatar} />
            )}
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle className="md:text-center">Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-4 items-center mt-4">
            {isLoggedIn ? <UserLoggedOptions /> : <MenuButtons />}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
