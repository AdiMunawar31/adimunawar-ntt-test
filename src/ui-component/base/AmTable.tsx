import React, { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  Pagination,
  TableRow,
  Skeleton,
  Button,
  useTheme,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import AmTypography from "./AmTypography";

interface AmTableProps<T extends { id: string | number }> {
  readonly data: T[];
  readonly columns: {
    header: string | React.ReactNode;
    accessor: keyof T | ((row: T) => React.ReactNode);
    render?: (row: T) => React.ReactNode;
    sortable?: boolean;
  }[];
  readonly loading?: boolean;
  readonly page: number;
  readonly rowsPerPage: number;
  readonly totalItems: number;
  readonly onPageChange: (event: unknown, newPage: number) => void;
  readonly handleRowsPerPageChange: (value: number) => void;
  readonly noPagination?: boolean;
  readonly showNumberColumn?: boolean;
  readonly minWidth?: string | number;
  readonly maxHeight?: string | number;
  readonly onSort?: (column: keyof T) => void;
}

function AmTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  page,
  rowsPerPage,
  totalItems,
  onPageChange,
  handleRowsPerPageChange,
  noPagination = false,
  showNumberColumn = false,
  minWidth = "900px",
  maxHeight,
  onSort,
}: AmTableProps<T>) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc" | null;
  }>({
    key: null,
    direction: null,
  });

  const handleSort = (column: keyof T) => {
    onSort?.(column);
    setSortConfig((prevConfig) => {
      if (prevConfig.key === column) {
        // Toggle direction
        const nextDirection = prevConfig.direction === "asc" ? "desc" : null;
        return { key: nextDirection ? column : null, direction: nextDirection };
      }
      return { key: column, direction: "asc" };
    });
  };

  const totalPage = Math.ceil(totalItems / rowsPerPage);
  const theme = useTheme();

  const getEntriesOptionBackgroundColor = (entriesCount: number) => {
    if (rowsPerPage != entriesCount) {
      return theme.palette.primary.contrastText;
    }

    return theme.palette.mode === "dark" ? "#5557cd" : "#E7E8EC";
  };

  const getEntriesOptionColor = (entriesCount: number) => {
    if (entriesCount != rowsPerPage) {
      return theme.palette.mode === "dark" ? "white" : "#989BB3";
    }

    return theme.palette.mode === "dark" ? "white" : "#24283E";
  };

  const tableFooter = () => {
    return (
      <TableFooter>
        <TableRow>
          <TableCell
            colSpan={columns.length}
            sx={{ border: "none", paddingX: 0 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <AmTypography
                  color={theme.palette.mode === "dark" ? "white" : "#24283E"}
                >
                  Entries
                </AmTypography>
                <Button
                  variant={rowsPerPage === 10 ? "contained" : "text"}
                  onClick={() => handleRowsPerPageChange(10)}
                  style={{
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    minWidth: "36px",
                    marginLeft: "2rem",
                    boxShadow: "none",
                    backgroundColor: getEntriesOptionBackgroundColor(10),
                    color: getEntriesOptionColor(10),
                  }}
                >
                  10
                </Button>
                <Button
                  variant={rowsPerPage === 25 ? "contained" : "text"}
                  onClick={() => handleRowsPerPageChange(25)}
                  style={{
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    minWidth: "36px",
                    margin: "0 5px",
                    boxShadow: "none",
                    backgroundColor: getEntriesOptionBackgroundColor(25),
                    color: getEntriesOptionColor(25),
                  }}
                >
                  25
                </Button>
                <Button
                  variant={rowsPerPage === 50 ? "contained" : "text"}
                  onClick={() => handleRowsPerPageChange(50)}
                  style={{
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    minWidth: "36px",
                    margin: "0 5px",
                    boxShadow: "none",
                    backgroundColor: getEntriesOptionBackgroundColor(50),
                    color: getEntriesOptionColor(50),
                  }}
                >
                  50
                </Button>
              </div>
              <div>
                <Pagination
                  color="primary"
                  count={totalPage}
                  onChange={onPageChange}
                  page={page + 1}
                  showFirstButton
                  showLastButton
                  siblingCount={1} // Jumlah halaman di kiri & kanan halaman aktif
                  boundaryCount={1} // Jumlah halaman di awal & akhir
                />
              </div>
            </div>
          </TableCell>
        </TableRow>
      </TableFooter>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        style={{
          overflowX: "auto",
          width: "100%",
          maxHeight,
          marginTop: "1rem",
          marginBottom: "1rem",
        }}
      >
        <Table sx={{ minWidth }}>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: "#F6F9FC",
                overflow: "hidden", // Penting agar border-radius bawah bekerja!
                "& > th:first-of-type": {
                  borderTopLeftRadius:
                    theme.palette.mode === "dark" ? "13px" : "0px",
                  borderBottomLeftRadius:
                    theme.palette.mode === "dark" ? "13px" : "0px",
                },
                "& > th:last-of-type": {
                  borderTopRightRadius:
                    theme.palette.mode === "dark" ? "13px" : "0px",
                  borderBottomRightRadius:
                    theme.palette.mode === "dark" ? "13px" : "0px",
                },
              }}
            >
              {columns.map((column) => (
                <TableCell key={column.header?.toString()}>
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      cursor: column.sortable ? "pointer" : "default",
                    }}
                    onClick={() =>
                      column.sortable && handleSort(column.accessor as keyof T)
                    }
                  >
                    <AmTypography
                      color="#989BB3"
                      small
                      semiBold
                      sx={{
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {column.header}
                    </AmTypography>
                    {/* Diamond-shaped sorting button */}
                    {column.sortable && (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          cursor: "pointer",
                        }}
                      >
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderLeft: "6px solid transparent",
                            borderRight: "6px solid transparent",
                            borderBottom: `10px solid ${
                              sortConfig.key === column.accessor &&
                              sortConfig.direction === "asc"
                                ? "#24283E"
                                : "#989BB3"
                            }`,
                          }}
                        />
                        <div
                          style={{
                            width: 0,
                            height: 0,
                            borderLeft: "6px solid transparent",
                            borderRight: "6px solid transparent",
                            borderTop: `10px solid ${
                              sortConfig.key === column.accessor &&
                              sortConfig.direction === "desc"
                                ? "#24283E"
                                : "#989BB3"
                            }`,
                          }}
                        />
                      </div>
                    )}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? Array.from(new Array(rowsPerPage)).map(() => (
                  <TableRow key={uuidv4()}>
                    {showNumberColumn && (
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                    )}
                    {columns.map(() => (
                      <TableCell key={uuidv4()}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              : data.map((row: any, index) => (
                  <TableRow key={row.id || index + "id"}>
                    {/* Menampilkan nomor urut */}
                    {columns.map((column) => (
                      <TableCell key={column.header?.toString()}>
                        {(() => {
                          if (column.render) {
                            return column.render(row);
                          }

                          if (typeof column.accessor === "function") {
                            return column.accessor(row);
                          }

                          return row[column.accessor] as React.ReactNode;
                        })()}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
          </TableBody>

          {!noPagination && // Sembunyikan footer jika noPagination adalah true
            tableFooter()}
        </Table>
      </Box>
    </ThemeProvider>
  );
}

export default AmTable;
