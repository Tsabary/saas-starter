"use client";

import Layout from "@/components/Layout";
import { CreateTicketForm } from "@/components/CreateTicketPage/CreateTicketForm";

export default function CreateTicketPage() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Create Support Ticket
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Describe your issue or request in detail
          </p>
        </div>

        <CreateTicketForm />
      </div>
    </Layout>
  );
}
