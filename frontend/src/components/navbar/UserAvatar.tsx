import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({
  avatarUrl = "",
  username = "",
}: {
  avatarUrl?: string;
  username?: string;
}) {
  return (
    <nav className="md:mx-4">
      <Avatar>
        <AvatarImage src={avatarUrl} alt={username} />
        <span>{username}</span>
        <AvatarFallback className="font-bold">
          {username.slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </nav>
  );
}
