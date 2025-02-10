/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useGlobalStore } from "@/store/global-store";
import { useEffect } from "react";
import { ReactNode } from "react";
import { toast } from "@/hooks/use-toast";

export const StateInitializer = ({ children }: { children: ReactNode }) => {
  const { login, logout } = useGlobalStore();

  useEffect(() => {
    const fetchUser = () => {
      try {
        const session = localStorage.getItem("session");
        if (session) {
          const { user } = JSON.parse(session);
          login(user);
          return;
        }

        logout();
      } catch (error) {}
    };

    fetchUser();
  }, [login, logout]);

  return <>{children}</>;
};
