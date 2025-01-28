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

export const MobileMenu = () => {
  return (
    <nav className="block md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="link"
            size="lg"
            className="md:hidden [&_svg]:size-8 text-white"
          >
            <Menu className="h-4 w-4" />
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-4 items-center mt-4">
            <Link href="/" className="text-lg">
              Login
            </Link>
            <Link href="/about" className="text-lg">
              Register
            </Link>
            <Link href="/contact" className="text-lg font">
              Try App
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};
