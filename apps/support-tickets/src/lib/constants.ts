import { UserRole } from "../types/ticket";

export const TICKET_SOURCE_ID = "support-tickets";

export const TICKET_STATUS = {
  OPEN: "open",
  IN_PROGRESS: "in-progress",
  RESOLVED: "resolved",
} as const;

export const TICKET_STATUS_OPTIONS = [
  { value: "open", label: "Open" },
  { value: "in-progress", label: "In Progress" },
  { value: "resolved", label: "Resolved" },
];

export const TICKET_PRIORITY = {
  LOW: "low",
  MEDIUM: "medium",
  HIGH: "high",
  CRITICAL: "critical",
} as const;

export const TICKET_PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
  { value: "critical", label: "Critical" },
];

export const TICKET_CATEGORY = {
  BUG: "bug",
  FEATURE_REQUEST: "feature-request",
  QUESTION: "question",
  DOCUMENTATION: "documentation",
  OTHER: "other",
} as const;

export const TICKET_CATEGORY_OPTIONS = [
  { value: "bug", label: "Bug Report" },
  { value: "feature-request", label: "Feature Request" },
  { value: "question", label: "Question" },
  { value: "documentation", label: "Documentation" },
  { value: "other", label: "Other" },
];

export const ADMIN_ROLES: UserRole[] = ["admin", "moderator"];
