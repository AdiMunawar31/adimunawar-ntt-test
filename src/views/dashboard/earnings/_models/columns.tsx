import dayjs from "dayjs";
import type { TableColumn } from "../../../../interfaces/table";
import type { Earning } from "../../../../interfaces/earning";

export const createEarningColumns = (): TableColumn[] => [
  {
    header: "Earning ID",
    accessor: "id",
    sortable: true,
    render: (row: Earning) => row.id,
  },
  {
    header: "Date",
    accessor: "date",
    sortable: true,
    render: (row: Earning) => dayjs(row.date).format("DD MMM YYYY"),
  },
  {
    header: "Source",
    accessor: "source",
    sortable: true,
    render: (row: Earning) => row.source,
  },
  {
    header: "Amount ($)",
    accessor: "amount",
    sortable: true,
    render: (row: Earning) => `$${row.amount.toFixed(2)}`,
  },
];
