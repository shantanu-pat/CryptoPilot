"use client";

import {
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import { useGetMarketsQuery } from "@/services/marketApi";
import { useAppSelector } from "@/store/hooks";

function SummaryCard({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        height: "100%",
      }}
    >
      <Stack spacing={1}>
        <Typography
          color="text.secondary"
          variant="body2"
        >
          {title}
        </Typography>

        <Typography
          variant="h5"
          fontWeight={700}
        >
          {value}
        </Typography>
      </Stack>
    </Paper>
  );
}

export function PortfolioSummary() {
  const holdings = useAppSelector(
    (state) => state.portfolio.holdings
  );

  const { data } =
    useGetMarketsQuery();

  if (!data) return null;

  let invested = 0;
  let current = 0;

  holdings.forEach((holding) => {
    const market = data.find(
      (coin) =>
        coin.id === holding.coinId
    );

    if (!market) return;

    const currentPrice =
      market.current_price ?? 0;

    invested +=
      holding.averagePrice *
      holding.quantity;

    current +=
      currentPrice *
      holding.quantity;
  });

  const profit =
    current - invested;

  const profitPercent =
    invested > 0
      ? (profit / invested) * 100
      : 0;

  return (
    <Grid
      container
      spacing={3}
    >
      <Grid
        size={{ xs: 12, md: 3 }}
      >
        <SummaryCard
          title="Invested"
          value={`$${invested.toLocaleString(
            undefined,
            {
              maximumFractionDigits: 2,
            }
          )}`}
        />
      </Grid>

      <Grid
        size={{ xs: 12, md: 3 }}
      >
        <SummaryCard
          title="Current Value"
          value={`$${current.toLocaleString(
            undefined,
            {
              maximumFractionDigits: 2,
            }
          )}`}
        />
      </Grid>

      <Grid
        size={{ xs: 12, md: 3 }}
      >
        <SummaryCard
          title="Profit / Loss"
          value={`$${profit.toLocaleString(
            undefined,
            {
              maximumFractionDigits: 2,
            }
          )}`}
        />
      </Grid>

      <Grid
        size={{ xs: 12, md: 3 }}
      >
        <SummaryCard
          title="Return"
          value={`${profitPercent.toFixed(
            2
          )}%`}
        />
      </Grid>
    </Grid>
  );
}