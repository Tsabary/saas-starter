import { Archive, CheckCircle, FastForward, Hammer } from "lucide-react";
import { Column } from "../types/column";

export const columns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    styles: "bg-gray-50 border border-gray-200 text-gray-600",
    icon: Archive,
    withInput: true,
  },
  {
    id: "next-up",
    title: "Next Up",
    styles: "bg-amber-50 border border-amber-200 text-amber-600",
    icon: FastForward,
  },
  {
    id: "in-progress",
    title: "In Progress",
    styles: "bg-blue-50 border border-blue-200 text-blue-600",
    icon: Hammer,
  },
  {
    id: "done",
    title: "Done",
    styles: "bg-green-50 border border-green-200 text-green-600",
    icon: CheckCircle,
  },
];
