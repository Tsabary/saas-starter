import { Entity, useEntity } from "@replyke/react-js";
import { MessageSquare } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DialogTrigger } from "@/components/ui/dialog";
import UpvoteButton from "../shared/UpvoteButton";

function SingleTicket({
  setSelectedTicket,
}: {
  setSelectedTicket: (ticket: Entity) => void;
}) {
  const { entity: ticket } = useEntity();

  if (!ticket) return null;

  return (
    <Card className="shadow-none hover:shadow-md transition-shadow p-0 max-w-full flex flex-col items-stretch border-gray-300 rounded-md gap-3">
      <CardHeader className="p-2 pb-0 max-w-full">
        <DialogTrigger
          onClick={() => setSelectedTicket(ticket)}
          className="cursor-pointer block max-w-full"
        >
          <CardTitle className="text-left text-xs font-medium text-sky-950 hover:underline">
            {ticket.title}
          </CardTitle>
          {/* <CardDescription className="block text-left text-sky-950 text-sm whitespace-normal">
            {ticket.content}
          </CardDescription> */}
        </DialogTrigger>
      </CardHeader>

      <CardContent className="p-2 pt-0 flex justify-between items-center">
        <div className="flex items-center gap-1 text-muted-foreground">
          <MessageSquare className="h-4 w-4" />
          <span className="text-xs">{ticket.repliesCount}</span>
        </div>
        <UpvoteButton />
      </CardContent>
    </Card>
  );
}

export default SingleTicket;
