import { Entity, User } from "@replyke/react-js";

export type TicketStatus = "open" | "in-progress" | "resolved";
export type TicketPriority = "low" | "medium" | "high" | "critical" | null;
export type TicketCategory =
  | "bug"
  | "feature-request"
  | "question"
  | "documentation"
  | "other";
export type UserRole = "admin" | "moderator" | "visitor";

export interface TicketMetadata {
  status: TicketStatus;
  category: TicketCategory;
  priority: TicketPriority;
  resolvedAt?: string | null;
  resolvedBy?: string | null;
  acceptedAnswerId?: string | null; // Comment ID of the accepted answer
}

export interface TicketEntity extends Entity {
  metadata: TicketMetadata;
}

export interface TicketFormData {
  title: string;
  content: string;
  category: TicketCategory;
  keywords: string[];
  priority?: TicketPriority;
}

export interface TicketFilters {
  status?: TicketStatus | null;
  category?: TicketCategory | null;
  priority?: TicketPriority | null;
  myTicketsOnly?: boolean;
  search?: string;
  sortBy?: "hot" | "new" | "top" | "controversial";
}
