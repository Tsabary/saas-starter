import { LucideIcon } from "lucide-react";

// Define Topic Interface
export interface Column {
  id: string;
  title: string;
  styles: string;
  icon: LucideIcon;
  withInput?: boolean;
}
