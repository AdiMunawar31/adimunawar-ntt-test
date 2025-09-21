// pages/orders/index.tsx
import { useState } from "react";
import { popularStockData } from "../../../data/popular-stock";
import MainCard from "../../../ui-component/cards/MainCard";
import PopularStockTableView from "./PopularStockTableView";

export default function PopularStocksPage() {
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(5);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (newSize: number) => {
    setSize(newSize);
  };

  return (
    <MainCard title="Popular Stocks">
      <PopularStockTableView
        data={{
          items: popularStockData.slice(page * size, page * size + size),
          totalItem: popularStockData.length,
        }}
        loading={false}
        params={{ page, size }}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </MainCard>
  );
}
