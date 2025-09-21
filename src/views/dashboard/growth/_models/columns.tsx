import type { GrowthRow } from "../../../../interfaces/growth";
import type { TableColumn } from "../../../../interfaces/table";

// currency formatter (USD like in dashboard)
const fmt = (v: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(v);

export const createGrowthColumns = (): TableColumn[] => [
  {
    header: "Month",
    accessor: "month",
    sortable: true,
    render: (row: GrowthRow) => `${row.month} ${row.year}`,
  },
  {
    header: "Investment",
    accessor: "investment",
    sortable: true,
    render: (row: GrowthRow) => fmt(row.investment),
  },
  {
    header: "Loss",
    accessor: "loss",
    sortable: true,
    render: (row: GrowthRow) => fmt(row.loss),
  },
  {
    header: "Profit",
    accessor: "profit",
    sortable: true,
    render: (row: GrowthRow) => fmt(row.profit),
  },
  {
    header: "Maintenance",
    accessor: "maintenance",
    sortable: true,
    render: (row: GrowthRow) => fmt(row.maintenance),
  },
  {
    header: "Total",
    accessor: "total",
    sortable: true,
    render: (row: GrowthRow) => {
      const total = row.investment + row.loss + row.profit + row.maintenance;
      return fmt(total);
    },
  },
  {
    header: "Profit %",
    accessor: "profitPct",
    sortable: true,
    render: (row: GrowthRow) => {
      const total = row.investment + row.loss + row.profit + row.maintenance;
      const pct = total > 0 ? (row.profit / total) * 100 : 0;
      return `${pct.toFixed(1)}%`;
    },
  },
];
