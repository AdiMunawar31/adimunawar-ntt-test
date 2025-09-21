import { lazy } from "react";
import MainLayout from "../layouts/MainLayout";
import Loadable from "../ui-component/Loadable";

// dashboard routing
const DashboardDefault = Loadable(
  lazy(() => import("../views/dashboard/Default"))
);
const OrdersPage = Loadable(lazy(() => import("../views/dashboard/orders")));
const EarningsPage = Loadable(
  lazy(() => import("../views/dashboard/earnings"))
);
const GrowthPage = Loadable(lazy(() => import("../views/dashboard/growth")));
const PopularStocksPage = Loadable(
  lazy(() => import("../views/dashboard/popularStocks"))
);

// utilities routing
const UtilsTypography = Loadable(
  lazy(() => import("../views/utilities/Typography"))
);
const UtilsColor = Loadable(lazy(() => import("../views/utilities/Color")));
const UtilsShadow = Loadable(lazy(() => import("../views/utilities/Shadow")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <DashboardDefault />,
    },
    {
      path: "dashboard",
      children: [
        {
          path: "main",
          element: <DashboardDefault />,
        },
      ],
    },
    {
      path: "orders",
      children: [
        {
          path: "",
          element: <OrdersPage />,
        },
      ],
    },
    {
      path: "earnings",
      children: [
        {
          path: "",
          element: <EarningsPage />,
        },
      ],
    },
    {
      path: "growths",
      children: [
        {
          path: "",
          element: <GrowthPage />,
        },
      ],
    },
    {
      path: "popular-stocks",
      children: [
        {
          path: "",
          element: <PopularStocksPage />,
        },
      ],
    },
    {
      path: "typography",
      element: <UtilsTypography />,
    },
    {
      path: "color",
      element: <UtilsColor />,
    },
    {
      path: "shadow",
      element: <UtilsShadow />,
    },
  ],
};

export default MainRoutes;
