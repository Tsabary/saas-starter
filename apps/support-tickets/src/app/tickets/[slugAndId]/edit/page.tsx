"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useFetchEntityByShortId, useUser } from "@replyke/react-js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { EditTicketForm } from "@/components/EditTicketPage/EditTicketForm";
import { isTicketAuthor, isAdminOrEditor } from "@/lib/ticket-helpers";
import type { TicketEntity } from "@/types/ticket";

export default function EditTicketPage() {
  const params = useParams();
  const router = useRouter();
  const slugAndId = params.slugAndId as string;
  const { user } = useUser();
  const fetchEntityByShortId = useFetchEntityByShortId();

  const [ticket, setTicket] = useState<TicketEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract shortId from slugAndId parameter
  const hyphen = slugAndId?.lastIndexOf("-") ?? -1;
  const shortId = hyphen >= 0 ? slugAndId.slice(hyphen + 1) : null;

  useEffect(() => {
    const loadTicket = async () => {
      if (!shortId) {
        setError("Invalid ticket ID");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const entity = await fetchEntityByShortId({ shortId });
        setTicket(entity as TicketEntity);
      } catch (err) {
        console.error("Error loading ticket:", err);
        setError("Failed to load ticket");
        toast.error("Failed to load ticket");
      } finally {
        setLoading(false);
      }
    };

    if (shortId) {
      loadTicket();
    }
  }, [shortId]);

  // Check permissions
  useEffect(() => {
    if (ticket && user) {
      const canEdit =
        isTicketAuthor(user.id, ticket.user?.id) || isAdminOrEditor(user);
      if (!canEdit) {
        toast.error("You don't have permission to edit this ticket");
        router.push(`/tickets/${slugAndId}`);
      }
    }
  }, [ticket, user, slugAndId, router]);

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 flex justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      </Layout>
    );
  }

  if (error || !ticket) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Ticket Not Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            The ticket you're looking for doesn't exist or has been deleted.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Edit Ticket
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Update your support ticket details
          </p>
        </div>

        <EditTicketForm ticket={ticket} />
      </div>
    </Layout>
  );
}
