// pages/orders/index.tsx
import { useState } from "react";
import { dummyOrders } from "../../../data/order";
import MainCard from "../../../ui-component/cards/MainCard";
import OrderTableView from "./OrderTableView";

export default function OrdersPage() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newSize: number) => {
    setSize(newSize);
  };

  return (
    <MainCard title="Orders">
      <OrderTableView
        data={{
          items: dummyOrders.slice(page * size, page * size + size),
          totalItem: dummyOrders.length,
        }}
        loading={false}
        params={{ page, size }}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </MainCard>
  );
}
