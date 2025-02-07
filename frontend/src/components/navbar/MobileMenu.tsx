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

export const MobileMenu = () => {
  const { isLoggedIn, user } = useGlobalStore();
  return (
    <nav className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="link"
            size="lg"
            className="md:hidden [&_svg]:size-8 text-white"
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
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-4 items-center mt-4">
            {!isLoggedIn ? <MenuButtons /> : <></>}
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
