// src/pages/growth/index.tsx
import {
  Box,
  MenuItem,
  Select,
  type SelectChangeEvent,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useMemo, useState } from "react";
import MainCard from "../../../ui-component/cards/MainCard";
import GrowthTableView from "./GrowthTableView";
import { growthData } from "../../../data/growth";

// Summary type
interface Summary {
  investment: number;
  loss: number;
  profit: number;
  maintenance: number;
  total: number;
  profitPct: number;
}

// simple formatter
const fmt = (v: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(v);

export default function GrowthPage() {
  const years = Array.from(new Set(growthData.map((r) => r.year))).sort();
  const [year, setYear] = useState<number>(
    years[0] || new Date().getFullYear()
  );
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(12);

  const handleYearChange = (e: SelectChangeEvent) => {
    setYear(Number(e.target.value));
    setPage(0);
  };

  // filter by selected year
  const itemsForYear = useMemo(
    () => growthData.filter((r) => r.year === year),
    [year]
  );

  const totalSummary: Summary = useMemo(() => {
    const totals = itemsForYear.reduce(
      (acc, cur) => {
        acc.investment += cur.investment;
        acc.loss += cur.loss;
        acc.profit += cur.profit;
        acc.maintenance += cur.maintenance;
        return acc;
      },
      { investment: 0, loss: 0, profit: 0, maintenance: 0 }
    );
    const total =
      totals.investment + totals.loss + totals.profit + totals.maintenance;
    const profitPct = total > 0 ? (totals.profit / total) * 100 : 0;
    return { ...totals, total, profitPct };
  }, [itemsForYear]);

  const paginated = {
    items: itemsForYear.slice(page * size, page * size + size),
    totalItem: itemsForYear.length,
  };

  return (
    <MainCard
      title="Monthly Growth"
      secondary={
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography variant="subtitle2">Year</Typography>
          <Select size="small" value={String(year)} onChange={handleYearChange}>
            {years.map((y) => (
              <MenuItem value={y} key={y}>
                {y}
              </MenuItem>
            ))}
          </Select>
        </Box>
      }
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 2,
        }}
      >
        <Box marginX={2}>
          <Typography variant="h4" color="text.secondary">
            Total Growth
          </Typography>
          <Typography variant="h2" sx={{ mt: 0.5 }}>
            {fmt(totalSummary.total)}
          </Typography>
        </Box>

        {/* optional small summary on the right if you want quick stats */}
        <Box sx={{ textAlign: "right" }} marginRight={2}>
          <Typography variant="h6" color="text.secondary" display="block">
            Profit share
          </Typography>
          <Typography variant="h4">
            {totalSummary.profitPct.toFixed(1)}%
          </Typography>
        </Box>
      </Box>

      {/* Summary */}
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: "background.paper" }}>
            <Typography variant="h4" color="secondary">
              Total Investment
            </Typography>
            <Typography variant="h2">{fmt(totalSummary.investment)}</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: "background.paper" }}>
            <Typography variant="h4" color="secondary">
              Total Loss
            </Typography>
            <Typography variant="h2">{fmt(totalSummary.loss)}</Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: "background.paper" }}>
            <Typography variant="h4" color="secondary">
              Total Profit
            </Typography>
            <Typography variant="h2">{fmt(totalSummary.profit)}</Typography>
            <Typography variant="body2" color="text.secondary">
              {totalSummary.profitPct.toFixed(1)}% of total
            </Typography>
          </Box>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <Box sx={{ p: 2, borderRadius: 1, bgcolor: "background.paper" }}>
            <Typography variant="h4" color="secondary">
              Maintenance
            </Typography>
            <Typography variant="h2">
              {fmt(totalSummary.maintenance)}
            </Typography>
          </Box>
        </Grid>
      </Grid>

      {/* Table */}
      <GrowthTableView
        data={paginated}
        loading={false}
        params={{ page, size }}
        onPageChange={(_e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(newSize) => {
          setSize(newSize);
          setPage(0);
        }}
      />
    </MainCard>
  );
}
