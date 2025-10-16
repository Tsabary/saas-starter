import { Archive, CheckCircle, FastForward, Hammer } from "lucide-react";
import { Column } from "../types/column";

export const columns: Column[] = [
  {
    id: "backlog",
    title: "Backlog",
    styles: "bg-slate-100 dark:bg-slate-800/50 border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300",
    icon: Archive,
    withInput: true,
  },
  {
    id: "next-up",
    title: "Next Up",
    styles: "bg-amber-100 dark:bg-amber-900/50 border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-300",
    icon: FastForward,
  },
  {
    id: "in-progress",
    title: "In Progress",
    styles: "bg-blue-100 dark:bg-blue-900/50 border-blue-300 dark:border-blue-600 text-blue-700 dark:text-blue-300",
    icon: Hammer,
  },
  {
    id: "done",
    title: "Done",
    styles: "bg-emerald-100 dark:bg-emerald-900/50 border-emerald-300 dark:border-emerald-600 text-emerald-700 dark:text-emerald-300",
    icon: CheckCircle,
  },
];
