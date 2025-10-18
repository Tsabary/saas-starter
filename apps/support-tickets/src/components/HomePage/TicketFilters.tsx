"use client";

import { useState } from "react";
import { useUser } from "@replyke/react-js";
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, X, Filter } from "lucide-react";
import { isAdminOrEditor } from "@/lib/ticket-helpers";
import {
  TICKET_STATUS_OPTIONS,
  TICKET_CATEGORY_OPTIONS,
  TICKET_PRIORITY_OPTIONS,
} from "@/lib/constants";
import type { TicketFilters as TicketFiltersType } from "@/types/ticket";

interface TicketFiltersProps {
  filters: TicketFiltersType;
  onFiltersChange: (filters: TicketFiltersType) => void;
}

export function TicketFilters({ filters, onFiltersChange }: TicketFiltersProps) {
  const { user } = useUser();
  const showPriority = isAdminOrEditor(user);

  const [searchInput, setSearchInput] = useState(filters.search || "");

  const handleFilterChange = (key: keyof TicketFiltersType, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleFilterChange("search", searchInput);
  };

  const handleClearFilters = () => {
    setSearchInput("");
    onFiltersChange({
      sortBy: "hot",
      status: null,
      category: null,
      priority: null,
      myTicketsOnly: false,
      search: "",
    });
  };

  const hasActiveFilters =
    filters.status ||
    filters.category ||
    filters.priority ||
    filters.myTicketsOnly ||
    filters.search;

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-1.5 text-base">
            <Filter className="w-4 h-4" />
            Filters
          </CardTitle>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="xs"
              onClick={handleClearFilters}
            >
              <X className="w-3 h-3 mr-1" />
              Clear
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4 pb-4">
        {/* Search */}
        <div className="space-y-1.5">
          <Label htmlFor="search" className="text-xs">Search</Label>
          <form onSubmit={handleSearchSubmit} className="flex gap-1.5">
            <Input
              id="search"
              placeholder="Search tickets..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-8 text-sm"
            />
            <Button type="submit" size="icon-sm" variant="outline">
              <Search className="w-3.5 h-3.5" />
            </Button>
          </form>
        </div>

        {/* Sort By */}
        <div className="space-y-1.5">
          <Label className="text-xs">Sort By</Label>
          <Tabs
            value={filters.sortBy || "hot"}
            onValueChange={(value) => handleFilterChange("sortBy", value)}
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hot" className="text-xs">Hot</TabsTrigger>
              <TabsTrigger value="new" className="text-xs">New</TabsTrigger>
              <TabsTrigger value="top" className="text-xs">Top</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Status Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="status" className="text-xs">Status</Label>
          <Select
            value={filters.status || "all"}
            onValueChange={(value) =>
              handleFilterChange("status", value === "all" ? null : value)
            }
          >
            <SelectTrigger id="status" className="h-8 text-sm">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {TICKET_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Filter */}
        <div className="space-y-1.5">
          <Label htmlFor="category" className="text-xs">Category</Label>
          <Select
            value={filters.category || "all"}
            onValueChange={(value) =>
              handleFilterChange("category", value === "all" ? null : value)
            }
          >
            <SelectTrigger id="category" className="h-8 text-sm">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {TICKET_CATEGORY_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Priority Filter (Admin/Editor only) */}
        {showPriority && (
          <div className="space-y-1.5">
            <Label htmlFor="priority" className="text-xs">Priority</Label>
            <Select
              value={filters.priority || "all"}
              onValueChange={(value) =>
                handleFilterChange("priority", value === "all" ? null : value)
              }
            >
              <SelectTrigger id="priority" className="h-8 text-sm">
                <SelectValue placeholder="All priorities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                {TICKET_PRIORITY_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* My Tickets Toggle */}
        {user && (
          <div className="pt-1">
            <Button
              variant={filters.myTicketsOnly ? "default" : "outline"}
              size="sm"
              className="w-full"
              onClick={() =>
                handleFilterChange("myTicketsOnly", !filters.myTicketsOnly)
              }
            >
              {filters.myTicketsOnly ? "My Tickets" : "Show My Tickets"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
