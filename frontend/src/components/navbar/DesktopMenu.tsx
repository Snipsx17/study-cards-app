import Link from "next/link";
import { Button } from "../ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "../ui/navigation-menu";

export const DesktopMenu = () => {
  return (
    <nav className="hidden md:block">
      <NavigationMenu>
        <NavigationMenuList className="flex gap-4">
          <NavigationMenuItem>
            <Button
              variant="default"
              className="bg-white text-purple font-bold hover:bg-white"
            >
              Login
            </Button>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/auth/registration">
              <Button className=" bg-white text-purple font-bold hover:bg-white">
                Register
              </Button>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Button className=" bg-red text-white font-bold hover:bg-red">
              Try app
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
};
