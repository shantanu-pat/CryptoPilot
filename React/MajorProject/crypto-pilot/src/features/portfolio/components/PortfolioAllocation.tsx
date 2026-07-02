"use client";

import {
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useGetMarketsQuery } from "@/services/marketApi";
import { useAppSelector } from "@/store/hooks";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

export function PortfolioAllocation() {
  const holdings = useAppSelector(
    (state) => state.portfolio.holdings
  );

  const { data } = useGetMarketsQuery();

  if (!data) return null;

  const chartData = holdings
    .map((holding) => {
      const market = data.find(
        (coin) => coin.id === holding.coinId
      );

      if (!market) return null;

      return {
        name: holding.symbol.toUpperCase(),
        value:
          holding.quantity *
          market.current_price,
      };
    })
    .filter(Boolean);

  if (chartData.length === 0) {
    return (
      <Paper
        sx={{
          p: 4,
          borderRadius: 4,
        }}
      >
        <Typography>
          Buy some assets to see allocation.
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        height: 420,
      }}
    >
      <Stack spacing={2}>
        <Typography
          variant="h6"
          fontWeight={700}
        >
          Portfolio Allocation
        </Typography>

        <ResponsiveContainer
          width="100%"
          height={320}
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={110}
              label
            >
              {chartData.map(
                (_, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Stack>
    </Paper>
  );
}