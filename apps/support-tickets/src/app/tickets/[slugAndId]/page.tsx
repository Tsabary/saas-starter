"use client";

import { useEffect, useState } from "react";
import { notFound, useParams } from "next/navigation";
import { EntityProvider, useFetchEntityByShortId } from "@replyke/react-js";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import Layout from "@/components/Layout";
import { TicketDetail } from "@/components/TicketPage/TicketDetail";
import { DiscussionSection } from "@/components/TicketPage/Discussion/DiscussionSection";
import { BackButton } from "@/components/shared/BackButton";
import type { TicketEntity } from "@/types/ticket";

export default function TicketDetailPage() {
  const params = useParams();
  const slugAndId = params.slugAndId as string;
  const fetchEntityByShortId = useFetchEntityByShortId();

  const [ticket, setTicket] = useState<TicketEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hyphen = slugAndId.lastIndexOf("-");
  if (hyphen < 0) return notFound();

  const slugPart = slugAndId.slice(0, hyphen);
  const shortId = slugAndId.slice(hyphen + 1);

  const loadTicket = async () => {
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

  useEffect(() => {
    if (shortId) {
      loadTicket();
    }
  }, [shortId]);

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
      <EntityProvider entity={ticket}>
        <div className="mx-auto max-w-6xl">
          <BackButton href="/" />
          <TicketDetail />

          {/* Discussion Section */}
          <div className="mt-8 pt-6 border-t border-border">
            <h2 className="text-xl font-bold text-foreground mb-4">
              Discussion
            </h2>
            <DiscussionSection
              entityId={ticket.id}
              ticketAuthorId={ticket.user?.id}
              acceptedAnswerId={ticket.metadata.acceptedAnswerId}
              callbacks={{
                loginRequiredCallback: () => {
                  toast.error(
                    "Please sign in to participate in the discussion"
                  );
                },
                usernameRequiredCallback: () => {
                  toast.info("Please set a username to continue");
                },
                currentUserClickCallback: () => {
                  // Could navigate to user profile/settings
                  toast.info("Profile feature coming soon");
                },
                otherUserClickCallback: (userId: string) => {
                  // Could navigate to user profile
                  toast.info("User profiles coming soon");
                },
                onAnswerAccepted: () => {
                  // Refresh ticket to show updated status
                  loadTicket();
                },
              }}
            />
          </div>
        </div>
      </EntityProvider>
    </Layout>
  );
}
