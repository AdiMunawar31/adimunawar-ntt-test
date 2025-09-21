import type { PopularStock } from "../../../../interfaces/popular-stock";
import type { TableColumn } from "../../../../interfaces/table";

export const createStocksColumns = (): TableColumn[] => [
  {
    header: "Stock ID",
    accessor: "id",
    sortable: true,
    render: (row: PopularStock) => row.id,
  },
  {
    header: "Name",
    accessor: "name",
    sortable: true,
    render: (row: PopularStock) => row.name,
  },
  {
    header: "Price",
    accessor: "price",
    sortable: true,
    render: (row: PopularStock) => `$${row.price.toFixed(2)}`,
  },
  {
    header: "Status",
    accessor: "status",
    sortable: true,
    render: (row: PopularStock) => row.status,
  },
  {
    header: "Percent (%)",
    accessor: "percent",
    sortable: true,
    render: (row: PopularStock) => `${row.percent}%`,
  },
];
