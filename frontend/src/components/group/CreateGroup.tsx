/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { ReactNode, useState } from "react";
import { apiService } from "@/service/api.service";
import { toast } from "@/hooks/use-toast";
import { useGlobalStore } from "@/store/global-store";

const CreateGroupSchema = z.object({
  groupName: z
    .string()
    .min(2, "Group name must have at least 2 characters")
    .max(100, "Group name must not exceed 100 characters"),
});

export type CreateFormDataType = z.infer<typeof CreateGroupSchema>;

export function CreateGroup({
  children,
  className,
  variant,
}: {
  children: ReactNode;
  className?: string;
  variant?: "destructive" | "outline" | "secondary" | "ghost" | "link";
}) {
  const [fetching, setFetching] = useState<boolean>(false);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const { setGroups } = useGlobalStore();

  const form = useForm<CreateFormDataType>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: {
      groupName: "",
    },
  });

  async function onSubmit({ groupName }: CreateFormDataType) {
    try {
      setFetching(true);
      const { data } = await apiService.createGroup(groupName);
      setGroups(data);
      toast({
        title: "Group created successfully",
        variant: "default",
        duration: 3000,
      });
      setDialogIsOpen(false);
      setFetching(false);
      form.reset();
    } catch (error) {
    } finally {
      setFetching(false);
    }
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button
          id="create-group"
          className={className}
          title="Create a new group"
          variant={variant}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">Crete new group</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="groupName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Create group</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter group name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="submit"
                  className="w-full bg-purple hover:bg-purple/80"
                  disabled={fetching}
                >
                  {fetching && <Loader2 className="animate-spin" />}
                  Submit
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
