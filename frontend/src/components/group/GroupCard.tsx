import { apiService } from "@/service/api.service";
import { Button } from "../ui/button";
import { Card, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { useGlobalStore } from "@/store/global-store";
import { DeleteButton } from "../DeleteButton";
import { useRouter } from "next/navigation";
import { EditGroup } from "./EditGroup";

export const GroupCard = ({ name, id }: { name: string; id: number }) => {
  const { setGroups } = useGlobalStore();
  const router = useRouter();

  const onDelete = async () => {
    try {
      const { data } = await apiService.deleteGroup(id);
      setGroups(data);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Not refresh token provided"
      ) {
        router.push("/login");
      }
    }
  };

  return (
    <Card className="md:w-[250px] lg:w-[350px] flex flex-col hover:bg-purple/5">
      <CardHeader className="flex-1">
        <CardTitle className="capitalize text-center line-clamp-2">
          {name}
        </CardTitle>
      </CardHeader>
      <CardFooter className="flex flex-col gap-3">
        <div className="w-full">
          <Button className="bg-purple w-full hover:bg-purple/80" size={"lg"}>
            Open
          </Button>
        </div>
        <div className="flex gap-3 w-full">
          <EditGroup
            groupId={id}
            groupName={name}
            className="bg-purple flex-1 hover:bg-purple/80"
          >
            Edit
          </EditGroup>

          <DeleteButton
            onDelete={onDelete}
            title="Are you absolutely sure?"
            description="This action cannot be undone. This will permanently delete the group and cards in there."
            className="flex-1"
          >
            Delete
          </DeleteButton>
        </div>
      </CardFooter>
    </Card>
  );
};
