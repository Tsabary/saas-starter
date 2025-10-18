import type { MetadataRoute } from "next";
import { ReplykeClient } from "@replyke/js";
import { getTicketPath } from "@/lib/ticket-helpers";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Replace with your URL
  const base = "https://support.replyke.com";

  const client = await ReplykeClient.init({
    projectId: process.env.NEXT_PUBLIC_REPLYKE_PROJECT_ID!,
  });
  const tickets: { title: string; shortId: string; updatedAt: string }[] =
    await client.entities.fetchManyEntities({ limit: 1000, sourceId: "support-tickets" });

  return tickets.map(({ title, shortId, updatedAt }) => ({
    url: `${base}${getTicketPath({ title, shortId })}`,
    lastModified: new Date(updatedAt),
    changeFrequency: "daily" as const,
  }));
}
