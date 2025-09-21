import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import type { GrowthRow } from "../../../interfaces/growth";
import type { TableColumn } from "../../../interfaces/table";
import AmTable from "../../../ui-component/base/AmTable";
import NoDataComponent from "../../../ui-component/NoData";
import { createGrowthColumns } from "./_models/columns";

interface TableViewProps {
  data: {
    items: GrowthRow[];
    totalItem: number;
  };
  loading: boolean;
  params: {
    page: number;
    size: number;
    [key: string]: any;
  };
  onPageChange: (event: unknown, newPage: number) => void;
  onRowsPerPageChange: (newSize: number) => void;
  onSort?: (column: keyof GrowthRow) => void;
}

export default function TableView({
  data,
  loading,
  params,
  onPageChange,
  onRowsPerPageChange,
  onSort,
}: TableViewProps) {
  const [columns, setColumns] = useState<TableColumn[]>([]);

  useEffect(() => {
    setColumns(createGrowthColumns());
  }, [params.page, params.size]);

  return (
    <Box sx={{ overflowX: "auto" }}>
      {Array.isArray(data?.items) && data.items.length > 0 ? (
        <AmTable
          minWidth={1000}
          data={data.items}
          columns={columns}
          loading={loading}
          page={params.page}
          rowsPerPage={params.size}
          totalItems={data.totalItem || 0}
          onPageChange={onPageChange}
          handleRowsPerPageChange={onRowsPerPageChange}
          onSort={onSort}
          showNumberColumn={false}
        />
      ) : (
        <Box textAlign="center" m={2}>
          <NoDataComponent />
        </Box>
      )}
    </Box>
  );
}
