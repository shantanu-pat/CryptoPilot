"use client";

import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useAppSelector } from "@/store/hooks";
import { useGetMarketsQuery } from "@/services/marketApi";
import { TradingChart } from "@/features/market/components/charts/TradingChart";
import { useMarketChart } from "@/features/market/hooks/useMarketChart";
import {
  ChartSkeleton,
} from "@/components/skeletons";

export function PerformanceChart() {
  const holdings = useAppSelector(
    (state) => state.portfolio.holdings
  );

  const { data: markets } =
    useGetMarketsQuery();
if (!markets) {
  return <ChartSkeleton />;
}

if (holdings.length === 0) {
  return (
    <Paper
      sx={{
        p: 4,
        borderRadius: 4,
        textAlign: "center",
      }}
    >
      <Typography variant="h6">
        No portfolio data available
      </Typography>

      <Typography
        mt={1}
        color="text.secondary"
      >
        Buy some assets to view
        portfolio analytics.
      </Typography>
    </Paper>
  );
}

  // Largest holding
  const largestHolding = holdings.reduce(
    (prev, current) =>
      current.quantity >
      prev.quantity
        ? current
        : prev
  );

  const {
    chartData,
    isLoading,
  } = useMarketChart(
    largestHolding.coinId,
    30
  );

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
      }}
    >
      <Stack
        spacing={3}
      >
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Portfolio Performance
        </Typography>

        {!isLoading && (
          <TradingChart
            data={chartData}
          />
        )}
      </Stack>
    </Paper>
  );
}