// features/orders/_models/columns.tsx
import type { Order } from "../../../../interfaces/order";
import dayjs from "dayjs";
import Chip from "@mui/material/Chip";
import type { TableColumn } from "../../../../interfaces/table";

export const createOrderColumns = (): TableColumn[] => [
  {
    header: "Order ID",
    accessor: "id",
    sortable: true,
    render: (row: Order) => row.id,
  },
  {
    header: "Customer",
    accessor: "customer",
    sortable: true,
    render: (row: Order) => row.customer,
  },
  {
    header: "Date",
    accessor: "date",
    sortable: true,
    render: (row: Order) => dayjs(row.date).format("DD MMM YYYY"),
  },
  {
    header: "Status",
    accessor: "status",
    sortable: true,
    render: (row: Order) => {
      let color: "success" | "warning" | "error" = "warning";
      switch (row.status) {
        case "Completed":
          color = "success";
          break;
        case "Pending":
          color = "warning";
          break;
        case "Cancelled":
          color = "error";
          break;
      }
      return (
        <Chip
          label={row.status}
          color={color}
          size="small"
          variant="outlined"
        />
      );
    },
  },
  {
    header: "Amount ($)",
    accessor: "amount",
    sortable: true,
    render: (row: Order) => `$${row.amount.toFixed(2)}`,
  },
];
