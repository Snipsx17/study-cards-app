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
import { Loader2, Plus } from "lucide-react";
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
import { useState } from "react";
import { apiService } from "@/service/api.service";

const CreateGroupSchema = z.object({
  groupName: z
    .string()
    .min(2, "Group name must have at least 2 characters")
    .max(100, "Group name must not exceed 100 characters"),
});

export type CreateFormDataType = z.infer<typeof CreateGroupSchema>;

export function CreateGroup() {
  const [fetching, setFetching] = useState<boolean>(false);
  const form = useForm<CreateFormDataType>({
    resolver: zodResolver(CreateGroupSchema),
    defaultValues: {
      groupName: "",
    },
  });

  async function onSubmit({ groupName }: CreateFormDataType) {
    try {
      setFetching(true);
      await apiService.createGroup(groupName);
      setFetching(false);
      form.reset();
    } catch (error) {
    } finally {
      setFetching(false);
    }
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          size={"icon"}
          className="bg-purple rounded-full text-white [&_svg]:size-8 md:[&_svg]:size-10 shadow-md p-6 fixed bottom-10 right-6 hover:bg-purple/80"
          title="Create a new group"
        >
          <Plus size={"lg"} />
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
