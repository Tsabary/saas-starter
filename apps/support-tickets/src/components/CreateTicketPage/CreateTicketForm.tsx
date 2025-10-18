"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCreateEntity, useEntityList, useUser } from "@replyke/react-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { validateTicketForm, isAdminOrEditor } from "@/lib/ticket-helpers";
import {
  TICKET_CATEGORY_OPTIONS,
  TICKET_PRIORITY_OPTIONS,
  TICKET_SOURCE_ID,
  TICKET_STATUS,
} from "@/lib/constants";
import type {
  TicketCategory,
  TicketPriority,
  TicketFormData,
} from "@/types/ticket";
import { Loader2 } from "lucide-react";

// Dynamically import markdown editor to avoid SSR issues
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

export function CreateTicketForm() {
  const router = useRouter();
  const { user } = useUser();
  const { createEntity } = useEntityList({
    listId: "support-tickets-main",
  });
  const showPriority = isAdminOrEditor(user);

  const [formData, setFormData] = useState<TicketFormData>({
    title: "",
    content: "",
    category: "bug",
    keywords: [],
    priority: showPriority ? "medium" : undefined,
  });

  const [keywordInput, setKeywordInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleAddKeyword = () => {
    if (
      keywordInput.trim() &&
      !formData.keywords.includes(keywordInput.trim())
    ) {
      setFormData({
        ...formData,
        keywords: [...formData.keywords, keywordInput.trim()],
      });
      setKeywordInput("");
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setFormData({
      ...formData,
      keywords: formData.keywords.filter((k) => k !== keyword),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    const validation = validateTicketForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      toast.error("Please fix the errors in the form");
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const entity = await createEntity({
        title: formData.title,
        content: formData.content,
        keywords: formData.keywords,
        metadata: {
          status: TICKET_STATUS.OPEN,
          category: formData.category,
          priority: showPriority ? formData.priority || null : null,
        },
      });

      if (entity) {
        toast.success("Ticket created successfully!");
        router.push(`/tickets/${entity.shortId}`);
      }
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("Failed to create ticket. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Title */}
      <div className="space-y-2">
        <Label htmlFor="title">
          Title <span className="text-red-500">*</span>
        </Label>
        <Input
          id="title"
          placeholder="Brief summary of your issue"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
      </div>

      {/* Category */}
      <div className="space-y-2">
        <Label htmlFor="category">
          Category <span className="text-red-500">*</span>
        </Label>
        <Select
          value={formData.category}
          onValueChange={(value) =>
            setFormData({ ...formData, category: value as TicketCategory })
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TICKET_CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.category && (
          <p className="text-sm text-red-500">{errors.category}</p>
        )}
      </div>

      {/* Priority (Admin/Editor only) */}
      {showPriority && (
        <div className="space-y-2">
          <Label htmlFor="priority">Priority</Label>
          <Select
            value={formData.priority || "medium"}
            onValueChange={(value) =>
              setFormData({ ...formData, priority: value as TicketPriority })
            }
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {TICKET_PRIORITY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="content">
          Description <span className="text-red-500">*</span>
        </Label>
        <div data-color-mode="light" className="dark:hidden">
          <MDEditor
            value={formData.content}
            onChange={(value) =>
              setFormData({ ...formData, content: value || "" })
            }
            preview="edit"
            height={300}
          />
        </div>
        <div data-color-mode="dark" className="hidden dark:block">
          <MDEditor
            value={formData.content}
            onChange={(value) =>
              setFormData({ ...formData, content: value || "" })
            }
            preview="edit"
            height={300}
          />
        </div>
        {errors.content && (
          <p className="text-sm text-red-500">{errors.content}</p>
        )}
      </div>

      {/* Keywords */}
      <div className="space-y-2">
        <Label htmlFor="keywords">Tags (optional)</Label>
        <div className="flex gap-2">
          <Input
            id="keywords"
            placeholder="Add a keyword"
            value={keywordInput}
            onChange={(e) => setKeywordInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddKeyword();
              }
            }}
          />
          <Button type="button" onClick={handleAddKeyword} variant="outline">
            Add
          </Button>
        </div>
        {formData.keywords.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.keywords.map((keyword) => (
              <span
                key={keyword}
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
              >
                {keyword}
                <button
                  type="button"
                  onClick={() => handleRemoveKeyword(keyword)}
                  className="hover:text-blue-900 dark:hover:text-blue-100"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          Create Ticket
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
