import { GroupI } from "@/store/global-store";
import { GroupCard } from "./GroupCard";
import { CreateGroup } from "./CreateGroup";

const CreateGroupOption = () => {
  return (
    <div className="w-full text-center">
      <h3 className="mb-3">Start creating a new group</h3>
      <CreateGroup className="bg-purple text-white shadow-md p-6 font-bold hover:bg-purple/80">
        Create new group
      </CreateGroup>
    </div>
  );
};

export const GroupGrid = ({ groups }: { groups: GroupI[] }) => {
  return (
    <div>
      {groups.length > 0 ? (
        <div className="grid grid-cols-3 gap-3">
          {groups.map((group) => (
            <GroupCard key={group.id} name={group.name} />
          ))}
        </div>
      ) : (
        <CreateGroupOption />
      )}
    </div>
  );
};
