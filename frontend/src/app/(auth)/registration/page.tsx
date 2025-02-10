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
import { RegistrationSchema } from "@/domain/schemas/registration.schema";
import { apiService } from "@/service/api.service";
import { useCreateForm } from "@/lib/createForm";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
  const [fetching, setFetching] = useState<boolean>(false);
  const form = useCreateForm(RegistrationSchema, {
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof RegistrationSchema>) {
    try {
      setFetching(true);
      const response = await apiService.registerUser(values);
      toast({
        title: "Registration Successful",
        description: `${response}`,
        variant: "default",
        duration: 3000,
      });
      setFetching(false);

      router.push("/login");
    } catch (error) {
      setFetching(false);
    }
  }

  return (
    <>
      <h1 className="text-2xl font-bold text-center mb-4">Registration</h1>
      <Link href="/" className="flex font-bold hover:underline">
        <ChevronLeft /> Back to Home
      </Link>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-4">
          <div className="mb-6">
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jhon Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="jhondoe@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* confirm password */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="mb-2">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full" disabled={!!fetching}>
            {fetching && <Loader2 className="animate-spin" />}
            Register
          </Button>
        </form>
      </Form>
      <span>
        <p>
          Already have an account &nbsp;
          <Link href="/login" className="text-blue-500">
            Login
          </Link>
        </p>
      </span>
    </>
  );
}
