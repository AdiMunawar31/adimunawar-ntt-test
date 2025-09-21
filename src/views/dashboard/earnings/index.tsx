// pages/orders/index.tsx
import { useState } from "react";
import MainCard from "../../../ui-component/cards/MainCard";
import EarningTableView from "./EarningsTableView";
import { dummyEarnings } from "../../../data/earning";

export default function EarningsPage() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newSize: number) => {
    setSize(newSize);
  };

  return (
    <MainCard title="Earnings">
      <EarningTableView
        data={{
          items: dummyEarnings.slice(page * size, page * size + size),
          totalItem: dummyEarnings.length,
        }}
        loading={false}
        params={{ page, size }}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </MainCard>
  );
}
