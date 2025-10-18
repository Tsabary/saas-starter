"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useEntity, useUser } from "@replyke/react-js";
import { StatusBadge } from "../shared/StatusBadge";
import { CategoryBadge } from "../shared/CategoryBadge";
import { PriorityBadge } from "../shared/PriorityBadge";
import { VoteButtons } from "./VoteButtons";
import { ResolveButton } from "./ResolveButton";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { formatTimeAgo } from "@/lib/time-formatters";
import {
  isAdminOrEditor,
  isTicketAuthor,
  getTicketPath,
} from "@/lib/ticket-helpers";
import {
  MessageSquare,
  Calendar,
  User,
  Edit,
  Trash2,
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import dynamic from "next/dynamic";

// Dynamically import markdown preview to avoid SSR issues
const Markdown = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default.Markdown!),
  { ssr: false }
);

export function TicketDetail() {
  const router = useRouter();
  const { entity, deleteEntity } = useEntity();
  const { user } = useUser();
  const [isDeleting, setIsDeleting] = useState(false);

  if (!entity) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 dark:text-gray-400">Loading ticket...</p>
      </div>
    );
  }

  const showPriority = isAdminOrEditor(user);
  const metadata = entity.metadata as any;
  const canEdit =
    user && (isTicketAuthor(user.id, entity.user?.id) || isAdminOrEditor(user));

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await deleteEntity?.();
      toast.success("Ticket deleted successfully");
      router.push("/");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      toast.error("Failed to delete ticket");
      setIsDeleting(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header Row: Edit/Delete buttons on top-right */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl font-bold text-foreground mb-3">
            {entity.title}
          </h1>
        </div>
        {canEdit && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                router.push(
                  `${getTicketPath({ title: entity.title, shortId: entity.shortId })}/edit`
                )
              }
            >
              <Edit className="w-3.5 h-3.5 mr-1.5" />
              Edit
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm" disabled={isDeleting}>
                  {isDeleting ? (
                    <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
                  ) : (
                    <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                  )}
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this ticket?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the ticket and all its comments.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        )}
      </div>

      {/* Metadata Row: All in one compact line */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <StatusBadge status={metadata.status} />
        <CategoryBadge category={metadata.category} />
        {showPriority && metadata.priority && (
          <PriorityBadge priority={metadata.priority} />
        )}
        <span className="text-muted-foreground">•</span>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <User className="w-3.5 h-3.5" />
          <span>
            {entity.user?.username || entity.user?.name || "Anonymous"}
          </span>
        </div>
        <span className="text-muted-foreground">•</span>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <Calendar className="w-3.5 h-3.5" />
          <span>{formatTimeAgo(entity.createdAt)}</span>
        </div>
        <span className="text-muted-foreground">•</span>
        <div className="flex items-center gap-1.5 text-muted-foreground">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>{entity.repliesCount || 0} comments</span>
        </div>
      </div>

      {/* Content Section with clear background box */}
      <div className="flex gap-4 mt-6">
        {/* Voting */}
        <div className="flex-shrink-0">
          <VoteButtons size="sm" />
        </div>

        {/* Content Card */}
        <div className="flex-1 min-w-0">
          <div className="bg-muted rounded-lg p-4 border border-border">
            {entity.content && (
              <div className="prose dark:prose-invert max-w-none bg-card rounded-md p-4 border border-border/50">
                <div data-color-mode="light" className="dark:hidden">
                  <Markdown source={entity.content} />
                </div>
                <div data-color-mode="dark" className="hidden dark:block">
                  <Markdown source={entity.content} />
                </div>
              </div>
            )}

            {/* Keywords */}
            {entity.keywords && entity.keywords.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <h3 className="text-xs font-semibold text-muted-foreground mb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {entity.keywords.map((keyword) => (
                    <span
                      key={keyword}
                      className="inline-flex items-center px-2 py-0.5 rounded text-xs bg-info-muted text-info font-medium"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Resolve Button at bottom-right */}
          <div className="flex justify-end mt-4">
            <ResolveButton />
          </div>
        </div>
      </div>
    </div>
  );
}
