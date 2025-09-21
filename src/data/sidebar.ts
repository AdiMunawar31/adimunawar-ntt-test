// src/config/sidebarMenu.tsx
import {
  LayoutDashboard,
  BarChart3,
  ShoppingCart,
  GraduationCap,
  Truck,
  Mail,
  MessageSquare,
  Calendar,
  Kanban,
} from "lucide-react";

export interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  path?: string;
  badge?: string;
  children?: SidebarItem[];
}

export const sidebarMenu: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    id: "ecommerce",
    label: "E-Commerce",
    icon: ShoppingCart,
    path: "/ecommerce",
  },
  {
    id: "academy",
    label: "Academy",
    icon: GraduationCap,
    path: "/academy",
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: Truck,
    path: "/logistics",
  },
  {
    id: "apps",
    label: "Apps & Pages",
    icon: Mail,
    children: [
      { id: "email", label: "Email", icon: Mail, path: "/email", badge: "Pro" },
      {
        id: "chat",
        label: "Chat",
        icon: MessageSquare,
        path: "/chat",
        badge: "Pro",
      },
      {
        id: "calendar",
        label: "Calendar",
        icon: Calendar,
        path: "/calendar",
        badge: "Pro",
      },
      {
        id: "kanban",
        label: "Kanban",
        icon: Kanban,
        path: "/kanban",
        badge: "Pro",
      },
    ],
  },
];
