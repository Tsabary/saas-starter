import type { AuthUser, User } from "@replyke/react-js";
import type { TicketPriority, TicketStatus, UserRole } from "@/types/ticket";
import { ADMIN_ROLES } from "./constants";
import slugify from "slugify";

/**
 * Get ticket slug from title
 */
export function getTicketSlug({ title }: { title: string | null }): string {
  const slug = slugify(title || "ticket", {
    lower: true,
    strict: true, // removes characters like ':', '&', etc.
  });
  return slug;
}

/**
 * Get ticket path for URLs
 * @param ticket An object with at least `title` and `shortId`
 * @returns a path like '/tickets/your-title-ABC123'
 */
export function getTicketPath({
  title,
  shortId,
}: {
  title: string | null;
  shortId: string;
}): string {
  const slug = getTicketSlug({ title });
  return `/tickets/${slug}-${shortId}`;
}

/**
 * Check if user has admin or editor role
 */
export function isAdminOrEditor(user: AuthUser | null | undefined): boolean {
  if (!user || !user.role) return false;
  return ADMIN_ROLES.includes(user.role as UserRole);
}

/**
 * Check if user is the author of a ticket
 */
export function isTicketAuthor(
  userId: string | undefined,
  authorId: string | undefined
): boolean {
  if (!userId || !authorId) return false;
  return userId === authorId;
}

/**
 * Get status badge color
 */
export function getStatusColor(status: TicketStatus): {
  bg: string;
  text: string;
  border: string;
} {
  switch (status) {
    case "open":
      return {
        bg: "bg-blue-50 dark:bg-blue-950",
        text: "text-blue-700 dark:text-blue-300",
        border: "border-blue-200 dark:border-blue-800",
      };
    case "in-progress":
      return {
        bg: "bg-yellow-50 dark:bg-yellow-950",
        text: "text-yellow-700 dark:text-yellow-300",
        border: "border-yellow-200 dark:border-yellow-800",
      };
    case "resolved":
      return {
        bg: "bg-green-50 dark:bg-green-950",
        text: "text-green-700 dark:text-green-300",
        border: "border-green-200 dark:border-green-800",
      };
    default:
      return {
        bg: "bg-gray-50 dark:bg-gray-950",
        text: "text-gray-700 dark:text-gray-300",
        border: "border-gray-200 dark:border-gray-800",
      };
  }
}

/**
 * Get priority badge color
 */
export function getPriorityColor(priority: TicketPriority): {
  bg: string;
  text: string;
  border: string;
} {
  if (!priority) {
    return {
      bg: "bg-gray-50 dark:bg-gray-950",
      text: "text-gray-700 dark:text-gray-300",
      border: "border-gray-200 dark:border-gray-800",
    };
  }

  switch (priority) {
    case "low":
      return {
        bg: "bg-gray-50 dark:bg-gray-950",
        text: "text-gray-700 dark:text-gray-300",
        border: "border-gray-200 dark:border-gray-800",
      };
    case "medium":
      return {
        bg: "bg-yellow-50 dark:bg-yellow-950",
        text: "text-yellow-700 dark:text-yellow-300",
        border: "border-yellow-200 dark:border-yellow-800",
      };
    case "high":
      return {
        bg: "bg-orange-50 dark:bg-orange-950",
        text: "text-orange-700 dark:text-orange-300",
        border: "border-orange-200 dark:border-orange-800",
      };
    case "critical":
      return {
        bg: "bg-red-50 dark:bg-red-950",
        text: "text-red-700 dark:text-red-300",
        border: "border-red-200 dark:border-red-800",
      };
  }
}

/**
 * Get category icon (using lucide-react icons)
 */
export function getCategoryIcon(category: string): string {
  switch (category) {
    case "bug":
      return "Bug";
    case "feature-request":
      return "Lightbulb";
    case "question":
      return "HelpCircle";
    case "documentation":
      return "FileText";
    default:
      return "MessageSquare";
  }
}

/**
 * Format vote count (e.g., 1000 -> 1k)
 */
export function formatVoteCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

/**
 * Validate ticket form data
 */
export function validateTicketForm(data: {
  title: string;
  content: string;
  category: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.title || data.title.trim().length === 0) {
    errors.title = "Title is required";
  } else if (data.title.length > 200) {
    errors.title = "Title must be less than 200 characters";
  }

  if (!data.content || data.content.trim().length === 0) {
    errors.content = "Description is required";
  } else if (data.content.length > 10000) {
    errors.content = "Description must be less than 10,000 characters";
  }

  if (!data.category) {
    errors.category = "Category is required";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
