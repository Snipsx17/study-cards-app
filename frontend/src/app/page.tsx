"use client";

import { useGlobalStore } from "@/store/global-store";
import MainLayout from "./main/layout";
import { CreateGroup } from "@/components/group/CreateGroup";
import { GroupGrid } from "@/components/group/GroupGrid";
import { useEffect } from "react";
import { apiService } from "@/service/api.service";
import { Button } from "@/components/ui/button";
import { NavigationMenu } from "@radix-ui/react-navigation-menu";
import {
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Plus } from "lucide-react";

const NotLoggedOptions = () => {
  return (
    <div className="">
      <h3 className="mb-4">Start using the app</h3>
      <div className="flex justify-center gap-3">
        <NavigationMenu>
          <NavigationMenuList className="flex gap-4">
            <NavigationMenuItem>
              <Link href="/login">
                <Button
                  variant="default"
                  className="bg-purple text-white font-bold hover:bg-purple/80"
                >
                  Login
                </Button>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/registration">
                <Button className=" bg-purple text-white font-bold hover:bg-purple/80">
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
      </div>
    </div>
  );
};

export default function Home() {
  const { isLoggedIn, setGroups, groups } = useGlobalStore();

  useEffect(() => {
    const getAllGroups = async () => {
      const { data } = await apiService.getAllGroups();
      setGroups(data);
    };
    if (isLoggedIn) getAllGroups();
  }, [setGroups, isLoggedIn]);

  return (
    <MainLayout>
      <h1 className="text-4xl font-bold text-purple-700">
        {isLoggedIn ? <GroupGrid groups={groups} /> : <NotLoggedOptions />}
      </h1>
      <CreateGroup className="h-10 w-10 bg-purple rounded-full text-white [&_svg]:size-8 md:[&_svg]:size-10 shadow-md p-6 fixed bottom-10 right-6 hover:bg-purple/80 ">
        <Plus size={"lg"} />
      </CreateGroup>
    </MainLayout>
  );
}
