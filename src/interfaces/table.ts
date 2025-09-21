import type { ReactNode } from "react";
import type { Order } from "./order";

export interface TableColumn {
  header: any;
  accessor: any;
  sortable: boolean;
  render: (row: any) => ReactNode;
}

export interface DataRow {
  page: number;
  size: number;
  totalItem: number;
  totalPage: number;
  items: Order[];
}
export const initialValueListOrder: DataRow = {
  page: 0,
  size: 0,
  totalItem: 0,
  totalPage: 0,
  items: [
    {
      id: "",
      customer: "",
      date: "",
      status: "Pending",
      amount: 0,
    },
  ],
};
