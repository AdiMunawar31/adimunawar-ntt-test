import {
  IconBrandStocktwits,
  IconChartArcs,
  IconCoin,
  IconDashboard,
  IconInvoice,
  IconShoppingCart,
} from "@tabler/icons-react";

const icons = {
  IconDashboard,
  IconShoppingCart,
  IconCoin,
  IconChartArcs,
  IconInvoice,
  IconBrandStocktwits,
};

// ==============================|| DASHBOARD MENU ITEMS ||============================== //

const dashboard = {
  id: "dashboard",
  title: "Dashboard",
  type: "group",
  children: [
    {
      id: "default",
      title: "Dashboard",
      type: "item",
      url: "/dashboard/main",
      icon: icons.IconDashboard,
      breadcrumbs: false,
    },
    {
      id: "order-list",
      title: "Order List",
      type: "item",
      url: "/orders",
      icon: icons.IconShoppingCart,
      breadcrumbs: true,
    },
    {
      id: "earning-list",
      title: "Earning List",
      type: "item",
      url: "/earnings",
      icon: icons.IconCoin,
      breadcrumbs: true,
    },
    {
      id: "growth-list",
      title: "Growth List",
      type: "item",
      url: "/growths",
      icon: icons.IconChartArcs,
      breadcrumbs: true,
    },
    {
      id: "poopular-stock-list",
      title: "Popular Stock List",
      type: "item",
      url: "/popular-stocks",
      icon: icons.IconInvoice,
      breadcrumbs: true,
    },
  ],
};

export default dashboard;
