import { useGlobalStore } from "@/store/global-store";
import { ReactNode, useEffect } from "react";

export const StateInitializer = ({ children }: { children: ReactNode }) => {
  const { login } = useGlobalStore();

  useEffect(() => {
    async function fetchUser() {
      try {
        const session = localStorage.getItem("session");
        if (session) {
          const { user } = JSON.parse(session);
          login(user);
        }
      } catch (error) {}
    }
    fetchUser();
  }, []);

  return <>{children}</>;
};
