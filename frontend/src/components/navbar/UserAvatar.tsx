import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({
  avatarUrl = "",
  username = "",
}: {
  avatarUrl?: string;
  username?: string;
}) {
  return (
    <div className="md:mx-4 flex  gap-2 items-center">
      <span className="text-xl md:text-2xl md:font-bold capitalize">
        {username}
      </span>
      <Avatar>
        <AvatarImage src={avatarUrl} alt={username} />
        <AvatarFallback className="font-bold">
          {username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
