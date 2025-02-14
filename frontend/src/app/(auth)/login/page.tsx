/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ChevronLeft, Loader2 } from "lucide-react";
import { LoginSchema } from "@/domain/schemas/registration.schema";
import { apiService } from "@/service/api.service";
import { useCreateForm } from "@/lib/createForm";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGlobalStore } from "@/store/global-store";

export default function LoginPage() {
  const [fetching, setFetching] = useState<boolean>(false);
  const form = useCreateForm(LoginSchema, {
    username: "",
    password: "",
  });

  const router = useRouter();
  const { login } = useGlobalStore();

  async function onSubmit(values: z.infer<typeof LoginSchema>) {
    try {
      setFetching(true);
      const response = await apiService.loginUser(values);
      const { message, user } = response?.data;
      toast({
        title: "Login Successful",
        description: `${message}`,
        variant: "default",
        duration: 3000,
      });

      const session = {
        isLogged: true,
        mode: "remote",
        user,
      };
      localStorage.setItem("session", JSON.stringify(session));

      login(user);
      router.push("/");
    } catch (error) {
      setFetching(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
      <Link href="/" className="flex font-bold hover:underline">
        <ChevronLeft /> Back to Home
      </Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-4">
          <div className="mb-6">
            {/* username */}
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="jhondoe" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    <Link href="/forgot-password" className="text-blue-500">
                      Forgot password?
                    </Link>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={!!fetching}>
            {fetching && <Loader2 className="animate-spin" />}
            Login
          </Button>
        </form>
      </Form>
      <span>
        <p>
          Don&apos;t have an account? &nbsp;
          <Link href="/registration" className="text-blue-500">
            Create an account
          </Link>
        </p>
      </span>
    </>
  );
}
