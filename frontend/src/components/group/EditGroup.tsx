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
import { useGlobalStore } from "@/store/global-store";
import { checkResponseErrors } from "@/lib/checkResponseErrors";
import { showMessage } from "@/lib/showMessage";

interface UpdateGroupI {
  children: ReactNode;
  className?: string;
  variant?: "destructive" | "outline" | "secondary" | "ghost" | "link";
  groupName: string;
  groupId: number;
}

const CreateGroupSchema = z.object({
  groupId: z.number(),
  groupName: z
    .string()
    .min(2, "Group name must have at least 2 characters")
    .max(100, "Group name must not exceed 100 characters"),
});

export type CreateFormDataType = z.infer<typeof CreateGroupSchema>;

export function EditGroup({
  children,
  className,
  variant,
  groupName,
  groupId,
}: UpdateGroupI) {
  const [fetching, setFetching] = useState<boolean>(false);
  const [dialogIsOpen, setDialogIsOpen] = useState<boolean>(false);
  const { setGroups } = useGlobalStore();

  const form = useForm<CreateFormDataType>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: {
      groupId,
      groupName,
    },
  });

  async function onSubmit({ groupId, groupName }: CreateFormDataType) {
    try {
      setFetching(true);
      const { data } = await apiService.updateGroup(groupId, groupName);
      setGroups(data);
      showMessage({
        title: "Group updated successfully",
        variant: "default",
        duration: 3000,
      });
      setDialogIsOpen(false);
      setFetching(false);
      form.reset();
    } catch (error) {
      const errorMessage = checkResponseErrors(error);
      if (errorMessage === "session expired") {
        showMessage({
          title: "Session expired 🔐",
          description: "Your session has expired, please log in again.",
          duration: 3000,
        });
        return;
      }

      showMessage({
        title: errorMessage,
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setFetching(false);
    }
  }

  return (
    <Dialog open={dialogIsOpen} onOpenChange={setDialogIsOpen}>
      <DialogTrigger asChild>
        <Button
          className={className}
          title="Update group"
          variant={variant}
          size={"lg"}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] w-[90%]">
        <DialogHeader>
          <DialogTitle className="text-center">Update group name</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="groupName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Group name</FormLabel>
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
                  className="w-full bg-purple hover:bg-purple/80 font-bold"
                  disabled={fetching}
                >
                  {fetching && <Loader2 className="animate-spin" />}
                  Update
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
