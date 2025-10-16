import { useState } from "react";
import { useAuth, useUser } from "@replyke/react-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import UserAvatar from "./UserAvatar";
import { AuthDialog } from "../AuthDialog";

function AvatarDropdown() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  if (!user)
    return (
      <>
        <Button onClick={() => setOpen(true)} variant="link">
          Login
        </Button>
        <AuthDialog open={open} setOpen={setOpen} />
      </>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full cursor-pointer"
        >
          <UserAvatar user={user} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <p className="text-xs text-gray-400 p-2.5">{user.email}</p>

        <DropdownMenuItem className="cursor-pointer" asChild>
          <a href="https://dashboard.replyke.com">Go to Dashboard</a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => {
            signOut?.();
          }}
          className="cursor-pointer"
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default AvatarDropdown;
