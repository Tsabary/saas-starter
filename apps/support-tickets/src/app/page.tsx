"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useEntityList, useUser } from "@replyke/react-js";
import Layout from "../components/Layout";
import { TicketList } from "@/components/HomePage/TicketList";
import { TicketFilters } from "@/components/HomePage/TicketFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TICKET_SOURCE_ID } from "@/lib/constants";
import type {
  TicketEntity,
  TicketFilters as TicketFiltersType,
} from "@/types/ticket";

export default function Home() {
  const { user } = useUser();
  const { entities, fetchEntities, hasMore, loadMore, loading } = useEntityList(
    {
      listId: "support-tickets-main",
    }
  );

  const [filters, setFilters] = useState<TicketFiltersType>({
    sortBy: "hot",
    status: null,
    category: null,
    priority: null,
    myTicketsOnly: false,
    search: "",
  });

  // Fetch tickets whenever filters change
  useEffect(() => {
    const fetchFilters: any = {
      sortBy: filters.sortBy || "hot",
    };

    // Add metadata filters
    const metadataFilters: any = {};
    if (filters.status) {
      metadataFilters.status = filters.status;
    }
    if (filters.category) {
      metadataFilters.category = filters.category;
    }
    if (filters.priority) {
      metadataFilters.priority = filters.priority;
    }

    if (Object.keys(metadataFilters).length > 0) {
      fetchFilters.metadataFilters = {
        includes: metadataFilters,
      };
    }

    // Add userId filter for "My Tickets"
    if (filters.myTicketsOnly && user) {
      fetchFilters.userId = user.id;
    }

    // Add search filters
    if (filters.search && filters.search.trim()) {
      fetchFilters.titleFilters = {
        includes: [filters.search.trim()],
      };
    }

    fetchEntities(fetchFilters, {
      sourceId: TICKET_SOURCE_ID,
      limit: 20,
    });
  }, [filters, user]);

  return (
    <Layout>
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Support Tickets
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Browse and track all support requests
            </p>
          </div>
          <Link href="/create-ticket">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Ticket
            </Button>
          </Link>
        </div>

        {/* Main Content with Filters */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <TicketFilters filters={filters} onFiltersChange={setFilters} />
          </div>

          {/* Ticket List */}
          <div className="lg:col-span-3">
            <TicketList />
          </div>
        </div>
      </div>
    </Layout>
  );
}
