export interface MenuItem {
  id: string;
  title: string;
  type: "group" | "collapse" | "item";
  url?: string;
  link?: string;
  icon: React.ElementType;
  caption?: string;
  breadcrumbs?: boolean;
  children?: MenuItem[];
}
